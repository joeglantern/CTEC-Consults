import json, subprocess, urllib.request, os, sys
from concurrent.futures import ThreadPoolExecutor

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img", "sections")
os.makedirs(OUT, exist_ok=True)

BASE = ("Abstract editorial illustration made only of flat geometric fragments, quarter circle arcs, right angle "
        "triangles and thin bars, in warm off white #F1ECE2 with a single amber ochre #E0A030 accent, on a solid {bg} "
        "background, the composition suggests {concept}, generous negative space, clean vector poster quality, "
        "printed matte finish, no text, no people, no gradients, no 3D, no photograph")

items = [
  ("svc-strategic-innovation", "#7A2E2E", "a spark leaping across a gap between two arcs"),
  ("svc-project-management", "#4A3628", "a timeline of bars climbing step by step"),
  ("svc-strategic-planning", "#3A6B4A", "a compass rose built from arcs and triangles"),
  ("svc-policy-frameworks", "#2F4A44", "a stacked ledger of horizontal lines and one keystone arc"),
  ("svc-digital-transformation", "#5C4A2A", "a circuit of arcs connecting small nodes"),
  ("svc-mel", "#3B3F5C", "a rising line chart drawn from tiles"),
  ("svc-capacity-building", "#5A3A4A", "tiers of arcs like an amphitheatre"),
  ("svc-research", "#2E4A36", "an open book made of bars and one lens arc"),
  ("svc-esg", "#6B4A1E", "a leaf made of triangles with one arc as the stem"),
  ("sec-government", "#7A2E2E", "a colonnade of vertical bars under one wide arc"),
  ("sec-ngos", "#3A6B4A", "a globe built from crossing arcs"),
  ("sec-private-sector", "#5C4A2A", "a market grid of small squares with one rising triangle"),
  ("sec-education", "#3B3F5C", "a lecture hall of tiered tiles facing one arc"),
  ("sec-healthcare", "#2F4A44", "a cross formed by four arcs meeting at the centre"),
  ("sec-agriculture", "#4A3628", "rows of sprouting triangles across terraced bars"),
  ("pillar-diagnose", "#E4DDCF", "a magnifying lens ring made of arcs over a small grid, fragments in ink #0C0D0B instead of off white"),
  ("pillar-codesign", "#E4DDCF", "two arcs meeting like hands, one ochre, the rest ink #0C0D0B instead of off white"),
  ("pillar-implement", "#E4DDCF", "a precise stepped tower of bars, ink #0C0D0B instead of off white, ochre top step"),
  ("pillar-sustain", "#E4DDCF", "a sprouting plant branching upward from one arc, ink #0C0D0B instead of off white"),
]

def run(item):
    name, bg, concept = item
    dest = os.path.join(OUT, name + ".png")
    if os.path.exists(dest):
        return name, "exists"
    prompt = BASE.format(bg=bg, concept=concept)
    try:
        out = subprocess.run(["higgsfield", "generate", "create", "z_image", "--prompt", prompt, "--aspect_ratio", "4:3", "--wait", "--json"],
                             capture_output=True, text=True, timeout=600, shell=True)
        txt = out.stdout
        start = txt.find("[")
        data = json.loads(txt[start:]) if start >= 0 else None
        url = data[0]["result_url"] if data else None
        if not url:
            return name, "no url: " + (txt[:200] + out.stderr[:200])
        urllib.request.urlretrieve(url, dest)
        return name, "ok"
    except Exception as e:
        return name, "error: " + str(e)

if __name__ == "__main__":
    with ThreadPoolExecutor(max_workers=3) as ex:
        for name, status in ex.map(run, items):
            print(name, status, flush=True)
