import sys
from pathlib import Path

# Make /backend importable (server.py does `from lib.db import ...`)
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "backend"))

from server import app  # noqa: E402  — Vercel Python runtime looks for this `app`

# Vercel runs this ASGI app for every request rewritten to /api/index.py.
# All routes already carry the /api prefix (see backend/server.py), so no
# path rewriting is needed inside the app itself.
