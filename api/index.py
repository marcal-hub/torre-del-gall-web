import sys
from pathlib import Path

# Vercel copies the whole project into /var/task; make /backend importable
# (server.py does `from lib.db import ...`).
_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_ROOT / "backend"))

from server import app  # noqa: E402  — Vercel Python runtime looks for this `app`

# All routes already carry the /api prefix (see backend/server.py), so no
# path rewriting is needed inside the app itself.
