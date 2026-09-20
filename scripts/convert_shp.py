from __future__ import annotations

import json
import math
import struct
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT.parent / "矢量文件" / "cca02c7f-ab94-4c06-b5d0-bb1cbb14e09d"
SHP = SOURCE_DIR / "评价单元.shp"
DBF = SOURCE_DIR / "评价单元.dbf"
OUT = ROOT / "assets" / "parcels.geojson"


def read_dbf(path: Path):
    raw = path.read_bytes()
    count = struct.unpack_from("<I", raw, 4)[0]
    header_len = struct.unpack_from("<H", raw, 8)[0]
    record_len = struct.unpack_from("<H", raw, 10)[0]
    fields = []
    pos = 32
    while raw[pos] != 0x0D:
        name = raw[pos : pos + 11].split(b"\0", 1)[0].decode("gb18030", errors="ignore")
        length = raw[pos + 16]
        fields.append((name, length))
        pos += 32
    records = []
    for i in range(count):
        start = header_len + i * record_len
        row = raw[start : start + record_len]
        values = {}
        cursor = 1
        for name, length in fields:
            value = row[cursor : cursor + length].decode("gb18030", errors="ignore").strip()
            values[name] = value
            cursor += length
        records.append(values)
    return records


def read_shp(path: Path):
    raw = path.read_bytes()
    shapes = []
    pos = 100
    while pos + 8 <= len(raw):
        _, content_words = struct.unpack_from(">2i", raw, pos)
        content_start = pos + 8
        content_end = content_start + content_words * 2
        shape_type = struct.unpack_from("<i", raw, content_start)[0]
        if shape_type == 5:  # Polygon
            xmin, ymin, xmax, ymax = struct.unpack_from("<4d", raw, content_start + 4)
            n_parts, n_points = struct.unpack_from("<2i", raw, content_start + 36)
            parts_pos = content_start + 44
            points_pos = parts_pos + n_parts * 4
            parts = list(struct.unpack_from(f"<{n_parts}i", raw, parts_pos))
            points = [struct.unpack_from("<2d", raw, points_pos + i * 16) for i in range(n_points)]
            rings = []
            for part_i, part_start in enumerate(parts):
                part_end = parts[part_i + 1] if part_i + 1 < len(parts) else n_points
                rings.append(points[part_start:part_end])
            shapes.append({"bbox": (xmin, ymin, xmax, ymax), "rings": rings})
        pos = content_end
    return shapes


def close_ring(ring):
    if ring and ring[0] != ring[-1]:
        return ring + [ring[0]]
    return ring


def main():
    shapes = read_shp(SHP)
    records = read_dbf(DBF)
    if len(shapes) != len(records):
        raise SystemExit(f"shape/dbf count mismatch: {len(shapes)} vs {len(records)}")

    all_points = [point for shape in shapes for ring in shape["rings"] for point in ring]
    min_x = min(p[0] for p in all_points)
    max_x = max(p[0] for p in all_points)
    min_y = min(p[1] for p in all_points)
    max_y = max(p[1] for p in all_points)

    # The supplied data is a Hainan assessment grid. For the demonstration prototype,
    # preserve parcel topology while fitting it into the Shaoxing Binhai project area.
    # The transform is intentionally explicit so it can be replaced by an authoritative
    # CGCS2000/WGS84 conversion once the project GIS data is supplied.
    target_center_lon = 120.555
    target_center_lat = 30.215
    target_width = 0.085
    target_height = 0.052
    source_width = max_x - min_x or 1
    source_height = max_y - min_y or 1
    scale = min(target_width / source_width, target_height / source_height)
    width = source_width * scale
    height = source_height * scale
    target_min_x = target_center_lon - width / 2
    target_min_y = target_center_lat - height / 2

    def transform(point):
        x, y = point
        lon = target_min_x + (x - min_x) * scale
        lat = target_min_y + (y - min_y) * scale
        return [round(lon, 7), round(lat, 7)]

    features = []
    for index, (shape, attrs) in enumerate(zip(shapes, records), start=1):
        rings = [[transform(point) for point in close_ring(ring)] for ring in shape["rings"]]
        area = max(0.7, round(abs((shape["bbox"][2] - shape["bbox"][0]) * (shape["bbox"][3] - shape["bbox"][1]) * scale * scale * 111 * 111), 2))
        feature = {
            "type": "Feature",
            "properties": {
                "parcelId": f"BH-{index:04d}",
                "sourceId": attrs.get("OBJECTID") or attrs.get("FID") or str(index),
                "sourceName": attrs.get("名称") or attrs.get("地块名称") or attrs.get("评价单元") or "评价单元",
                "areaMu": area,
            },
            "geometry": {"type": "Polygon", "coordinates": rings},
        }
        features.append(feature)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"type": "FeatureCollection", "features": features}, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(json.dumps({"features": len(features), "sourceBounds": [min_x, min_y, max_x, max_y], "targetBounds": [target_min_x, target_min_y, target_min_x + width, target_min_y + height], "output": str(OUT)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
