import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import re
import ipaddress
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
import uuid
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
from lib.db import client, db, ensure_indexes


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.index_task = asyncio.create_task(ensure_indexes())
    yield
    client.close()


app = FastAPI(lifespan=lifespan)

api_router = APIRouter(prefix="/api")


class InquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    event_type: Optional[str] = Field(default=None, max_length=60)
    event_date: Optional[str] = Field(default=None, max_length=60)
    guests: Optional[int] = Field(default=None, ge=1, le=100000)
    message: str = Field(min_length=1, max_length=3000)
    language: Optional[str] = Field(default=None, max_length=8)


class Inquiry(InquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# --- Emergent managed email (Resend proxy) ---
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


def _inquiry_html(inquiry: Inquiry) -> str:
    def row(label: str, value: str) -> str:
        return (f'<tr><td style="padding:8px 12px;font-weight:bold;color:#575651;'
                f'vertical-align:top;white-space:nowrap">{label}</td>'
                f'<td style="padding:8px 12px;color:#1A1A18">{value}</td></tr>')

    rows = row("Nom", escape(inquiry.name)) + row(
        "Correu", f'<a href="mailto:{escape(inquiry.email)}" style="color:#444F3C">{escape(inquiry.email)}</a>'
    )
    if inquiry.phone:
        rows += row("Telèfon", escape(inquiry.phone))
    if inquiry.event_type:
        rows += row("Tipus", escape(inquiry.event_type))
    if inquiry.event_date:
        rows += row("Data", escape(inquiry.event_date))
    if inquiry.guests:
        rows += row("Convidats", str(inquiry.guests))
    rows += row("Missatge", escape(inquiry.message).replace("\n", "<br>"))
    rows += row("Idioma", escape(inquiry.language or "-"))

    return ('<table role="presentation" width="100%" style="background:#F9F7F2;padding:24px">'
            '<tr><td style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">'
            '<h2 style="font-family:Georgia,serif;color:#1A1A18;margin:0 0 16px">Nova sol·licitud d\'informació</h2>'
            '<table role="presentation" width="100%" style="background:#FFFFFF;border:1px solid #E4DDD0;'
            f'border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">{rows}</table>'
            '<p style="font-size:12px;color:#888;margin-top:16px">Enviat des del formulari web de '
            f'{escape(EMAIL_FROM_NAME)}.</p>'
            '</td></tr></table>')


async def _notify_inquiry(inquiry: Inquiry) -> None:
    try:
        subject = f"Nova sol·licitud web — {inquiry.name}"
        email_id = await send_email(to=OWNER_EMAIL, subject=subject, html=_inquiry_html(inquiry))
        logging.getLogger(__name__).info(f"Inquiry email sent: {email_id}")
    except Exception as e:
        logging.getLogger(__name__).error(f"Inquiry email failed: {e}")


@api_router.get("/")
async def root():
    return {"message": "La Torre del Gall API"}


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(input: InquiryCreate):
    inquiry = Inquiry(**input.model_dump())
    # await db.inquiries.insert_one(inquiry.model_dump())
    # awaited (not background task): serverless runtimes can freeze after the
    # response, killing fire-and-forget tasks. _notify_inquiry never raises.
    await _notify_inquiry(inquiry)
    return inquiry


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
