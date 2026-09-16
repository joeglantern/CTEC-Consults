# Menu overlay thumbnails

The full-screen menu shows a preview panel on the left that changes as you hover each link. Right now
those are built from colour blocks and the four arcs. These prompts replace them with four art-directed
stills that read as one series: an editorial still life on coloured paper, shot straight down, one hard
light, the way a design studio shoots a magazine index. Each page gets its own paper colour from the
site palette, and its own object.

Panel is tall, so **4:5 portrait**. Run in ChatGPT one at a time. Save into `site/public/img/menu/`
with the filenames below and tell me. I wire them into the overlay.

Rules in every prompt: real photograph, top-down, one hard directional light with a crisp shadow,
matte coloured paper backdrop filling the whole frame, no people, no hands, no text, no logos, no
watermark, 4:5 portrait.

---

### 1. `menu-services.jpg`
Services. Nine services, one partner.

```
A real photograph, not a render, 4:5 portrait. Editorial still life shot straight down on matte deep
oxblood red paper that fills the whole frame. Nine small squares of thick bone coloured card, identical,
laid in a precise three by three grid with even gaps, one of the nine turned a few degrees off true.
One hard directional light from the upper left throwing a crisp short shadow from every card. Subtle
paper texture, fine film grain, rich colour, perfectly clean. No people, no hands, no text, no logos,
no watermark.
```

### 2. `menu-approach.jpg`
Approach. Four pillars.

```
A real photograph, not a render, 4:5 portrait. Editorial still life shot straight down on matte deep
moss green paper that fills the whole frame. Four thick quarter-circle segments cut from bone coloured
card, three cream and one amber gold, arranged so they almost complete a ring with a thin gap between
each, the gold one at the bottom right. One hard directional light from the upper left throwing crisp
short shadows. Subtle paper texture, fine film grain, rich colour, perfectly clean. No people, no
hands, no text, no logos, no watermark.
```

### 3. `menu-sectors.jpg`
Sectors. Six sectors, one practice.

```
A real photograph, not a render, 4:5 portrait. Editorial still life shot straight down on matte deep
indigo blue paper that fills the whole frame. Six small natural objects laid in a neat two by three grid
with even spacing: a smooth grey river stone, a single coffee bean, a folded square of white cotton, a
small brass cog, a clear glass marble, and a short piece of pale wood. One hard directional light from
the upper left throwing crisp short shadows. Subtle paper texture, fine film grain, rich colour,
perfectly clean. No people, no hands, no text, no logos, no watermark.
```

### 4. `menu-about.jpg`
About. Who we are.

```
A real photograph, not a render, 4:5 portrait. Editorial still life shot straight down on matte amber
gold paper that fills the whole frame. A single letter C cut from thick bone coloured card, wide and
geometric, made of four separate ring segments with thin gaps between them, standing very slightly
proud of the paper so one hard directional light from the upper left throws a crisp short shadow.
Subtle paper texture, fine film grain, rich colour, perfectly clean. No other text, no people, no
hands, no logos, no watermark.
```

---

If a result adds writing anywhere, run it again with "absolutely no letters or numbers anywhere in the
image" appended. If the shadow goes soft, add "hard midday sun, sharp shadow edges".

## Status (16 Sep)

All four landed and are wired into the overlay. The panel is now held at the stills' own 4:5 so nothing
crops, the four stills stay mounted and crossfade on hover, and each carries poster typography set live
in the site's fonts: a counter top left, the wordmark top right, the section name large in Fraunces
italic, the caption beneath. The About poster uses ink text on its amber paper, the other three use bone.
JPEGs at 1000 wide in `site/public/img/menu/`, PNG originals in `brief/assets/images/menu/`.

Favicon: `site/public/favicon.svg` is the mark, ink by default and bone when the browser is in dark
mode. PNG fallbacks (`favicon-64.png`, `apple-touch-icon.png` on a bone tile) are rendered by
`site/scripts/favicons.mjs` with sharp.
