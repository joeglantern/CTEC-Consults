"""Converts the CTEC Consults wordmark to SVG outlines so the lockups need no font installed.

    python scripts/wordmark.py

Writes scripts/wordmark.json, consumed by brand-pack.mjs.
"""
import json, os, re, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, ".fraunces.ttf")
CSS = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400&display=swap"
UA = {"User-Agent": "Mozilla/5.0"}
TEXT = "CTEC Consults"

if not os.path.exists(CACHE):
    css = urllib.request.urlopen(urllib.request.Request(CSS, headers=UA), timeout=30).read().decode()
    url = re.search(r"src: url\((https://[^)]+\.ttf)\)", css).group(1)
    data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
    open(CACHE, "wb").write(data)
    print("downloaded Fraunces,", len(data), "bytes")

from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.varLib.instancer import instantiateVariableFont

font = TTFont(CACHE)
if "fvar" in font:  # pin the variable axes to the display cut we use on the site
    axes = {a.axisTag: a.defaultValue for a in font["fvar"].axes}
    for tag, val in (("wght", 400), ("opsz", 120), ("SOFT", 0), ("WONK", 0)):
        if tag in axes:
            axes[tag] = val
    font = instantiateVariableFont(font, axes, inplace=True, updateFontNames=False)

upm = font["head"].unitsPerEm
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
kern = {}
if "kern" in font:
    for st in font["kern"].kernTables:
        kern.update(st.kernTable)

paths, x = [], 0.0
prev = None
for ch in TEXT:
    name = cmap.get(ord(ch))
    if name is None:
        raise SystemExit(f"glyph missing for {ch!r}")
    if prev:
        x += kern.get((prev, name), 0)
    pen = SVGPathPen(glyphs)
    glyphs[name].draw(pen)
    d = pen.getCommands()
    if d:
        paths.append(f'<path transform="translate({x:.1f} 0)" d="{d}"/>')
    x += glyphs[name].width
    prev = name

out = {
    "text": TEXT,
    "unitsPerEm": upm,
    "advance": round(x, 1),
    # y is flipped because font space runs upward
    "paths": f'<g transform="scale(1 -1)">{"".join(paths)}</g>',
    "capHeight": font["OS/2"].sCapHeight if hasattr(font["OS/2"], "sCapHeight") else round(upm * 0.7),
}
json.dump(out, open(os.path.join(HERE, "wordmark.json"), "w"), indent=1)
print(f"wordmark: advance {out['advance']} / upm {upm}, {len(paths)} glyph paths")
