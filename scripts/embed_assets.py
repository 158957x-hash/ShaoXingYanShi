from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
assets = ROOT / "assets"
parcels = json.loads((assets / "parcels.geojson").read_text(encoding="utf-8"))
boundary = json.loads((assets / "project-boundary.geojson").read_text(encoding="utf-8"))
payload = {
    "parcels": parcels,
    "boundary": boundary,
}
content = "window.EMBEDDED_DATA = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n"
(assets / "embedded-data.js").write_text(content, encoding="utf-8")
print(f"embedded bytes={len(content.encode('utf-8'))}")
