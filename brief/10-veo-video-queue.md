# Veo video queue for CTEC Consults

Eight second clips, generated one at a time in the Gemini app with Veo. Every clip is a background
loop behind or beside real copy, so it has to be calm. One camera move, one light change, nothing else.
Fast motion, cuts, zooms and people will fight the type and break the page.

## How to run each one

1. New chat in Gemini. Before you paste anything, open the plus (or Tools) in the prompt box and pick **Video**, so the Veo icon is showing in the composer. In a plain chat Gemini talks about the prompt instead of making the clip.
2. Paste only the text inside the code block, nothing from the heading or the notes around it. Every prompt now opens with "Generate a video:" so it cannot be mistaken for a discussion.
3. If the app offers a **start frame**, attach the matching still from `site/public/img/real/`. Named
   each prompt. The clip then matches the photo on that section and the cut between them is invisible.
4. Aspect **16:9**, resolution **1080p**, audio **off** (or ignore it, we mute and strip it anyway).
5. Download the MP4, drop it in `site/public/video/` with the filename in the heading.
6. Tell me which ones landed and I will wire them in. The sector rows are already built to take a clip each.

If a clip comes back too busy, regenerate with the same prompt and add `Very slow, almost still.` at the end.

## The rule every prompt follows

Locked or near locked camera, or one slow move in a single direction. Light shifts a little across the eight
seconds, which is what makes a loop feel alive instead of frozen. No people, no faces, no hands, no text on
signs or screens, no logos. Real photography language, never render language.

---

### 1. `workshop.mp4`: Sectors, Private Sector & SMEs
Attach: `C:\Users\liban\OneDrive\Desktop\Projects\CTEC\site\public\img\real\sec-private-sector.jpg`

```
Generate a video: Live action footage, shot on 35mm film. Interior of a tidy modern workshop at golden hour, tools hung in
order on a clean pegboard wall, a smooth timber workbench in the middle of the frame. The camera pushes
forward very slowly toward the bench, a few centimetres over the whole shot. Fine dust drifts through the
shaft of warm sun coming in from the open doorway on the right. The light lengthens and warms slightly as
the sun drops. Available light only, natural film grain, shallow depth of field. No people, no hands, no
cuts, no text, no logos. No dialogue, no music.
```

### 2. `library.mp4`: Sectors, Education & Research
Attach: `C:\Users\liban\OneDrive\Desktop\Projects\CTEC\site\public\img\real\sec-education.jpg`

```
Generate a video: Live action footage, shot on 35mm film. Long polished reading tables in a fine university library, brass
lamps with green glass shades making pools of warm light on dark wood. The camera dollies slowly to the
right along the tables, passing one lamp after another so each pool of light slides through the frame. The
tall shelves behind drift with parallax. Available light only, natural film grain, shallow depth of field.
No people, no hands, no cuts, no text, no logos. No dialogue, no music.
```

### 3. `clinic.mp4`: Sectors, Healthcare
Attach: `C:\Users\liban\OneDrive\Desktop\Projects\CTEC\site\public\img\real\sec-healthcare.jpg`

```
Generate a video: Live action footage, shot on 35mm film. A spotless modern clinic corridor, pale walls, a single warm light
at the far end, polished floor holding a soft reflection. The camera pushes forward down the corridor very
slowly toward the warm light. The reflection on the floor stretches gently as the camera moves. Empty and
calm. Available light only, natural film grain, shallow depth of field. No people, no hands, no cuts, no
text, no logos. No dialogue, no music.
```

### 4. `colonnade.mp4`: Sectors, Government & Public Sector
Attach: `C:\Users\liban\OneDrive\Desktop\Projects\CTEC\site\public\img\real\sec-government.jpg`

```
Generate a video: Live action footage, shot on 35mm film. The stone colonnade of a well maintained civic building at dusk,
tall clean columns lit warm from one side, long shadows across smooth flagstones, deep indigo sky beyond.
The camera tracks sideways to the left, columns passing close in the foreground with strong parallax
against the sky. The warm light on the stone dims a touch as dusk deepens. Empty. Available light only,
natural film grain. No people, no hands, no cuts, no flags, no text, no logos. No dialogue, no music.
```

### 5. `warehouse.mp4`: Sectors, NGOs & International Development
Attach: `C:\Users\liban\OneDrive\Desktop\Projects\CTEC\site\public\img\real\sec-ngos.jpg`

```
Generate a video: Live action footage, shot on 35mm film. The interior of a clean, well organised supply warehouse, neatly
stacked sacks and crates in tidy rows. The camera pushes forward slowly toward a single shaft of warm
light falling from a high window. Dust motes turn slowly inside the beam. The beam sweeps a few degrees
across the stacks as the sun moves. Everything else in shadow. Available light only, natural film grain,
shallow depth of field. No people, no hands, no cuts, no legible text, no logos. No dialogue, no music.
```

### 6. `farmland.mp4`: Sectors, Agriculture & Environment
Attach: `C:\Users\liban\OneDrive\Desktop\Projects\CTEC\site\public\img\real\sec-agriculture.jpg`

```
Generate a video: Live action aerial footage, shot on medium format film. Neat terraced farmland in the Kenyan highlands at
first light, mist sitting low in the valley, warm sunrise on the ridges, one red earth road curving through
healthy green fields. The drone drifts forward and very slightly down in one continuous move. The mist
shifts and thins as the light warms. Available light only, natural film grain. No people, no cuts, no text,
no logos. No dialogue, no music.
```

### 7. `city-dusk.mp4`: Contact page panel
Attach: `C:\Users\liban\OneDrive\Desktop\Projects\CTEC\site\public\img\real\city-dusk.jpg`

```
Generate a video: Live action footage, shot on 35mm film, long exposure look. A modern Nairobi street at blue hour seen from
a rooftop. The camera is locked off, completely still. Windows and streetlights come on one by one across
the frame, headlight and tail light trails flow along the avenue below, the sky deepens from indigo toward
near black across the shot. Available light only, natural film grain. No people visible, no cuts, no text,
no logos. No dialogue, no music.
```

### 8. `hero-circuit.mp4`: Home hero, scroll scrubbed
Attach: `C:\Users\liban\OneDrive\Desktop\Projects\CTEC\site\public\img\real\svc-strategic-innovation.jpg` only if you want the hands in it, otherwise attach nothing.

```
Generate a video: Live action macro footage. Extreme close up of a matte black printed circuit board, fine gold traces and
tiny components. A single warm amber light sweeps very slowly from the left edge of the frame to the right,
revealing the traces as it passes and letting them fall back into black behind it. The camera drifts
forward a few millimetres with razor thin depth of field, so traces slide in and out of focus. Nothing else
moves. Natural film grain. No people, no hands, no cuts, no text, no logos. No dialogue, no music.
```

### 9. `atrium.mp4`: About page hero (optional, we already have a version)
Attach: `C:\Users\liban\OneDrive\Desktop\Projects\CTEC\brief\assets\images\r2-D-atrium.png`

```
Generate a video: Live action footage, shot on 35mm film. An interior atrium at dusk, low sun behind a slatted timber screen
throwing amber stripes across a polished concrete floor and a stone wall. The camera dollies slowly to the
right. The stripes of light slide across the floor and the wall as the sun sinks a fraction. Faint dust
drifts through the light. Available light only, natural film grain. No people, no hands, no cuts, no text,
no logos. No dialogue, no music.
```

---

## After you download them

Veo stamps a small sparkle in the bottom right corner. Do not crop it out, that loses picture. I run a
`delogo` pass over that corner, which rebuilds the patch from the pixels around it. On soft areas like a
floor or a wall it is invisible. Keep the raw download, it goes to `brief/assets/video-raw/` as the source.


Drop the files in `site/public/video/`, then I run this on each so it scrubs smoothly under the scroll and
carries no audio track:

```
Generate a video: ffmpeg -i in.mp4 -an -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -g 12 -keyint_min 12 -movflags +faststart out.mp4
```

The dense keyframes are the point. Without them a scroll scrubbed video stutters because the browser has to
walk back to the last keyframe on every seek.

Poster frames come from the same file:

```
Generate a video: ffmpeg -i out.mp4 -vf "select=eq(n\,0)" -frames:v 1 -q:v 3 ../img/<name>-poster.jpg
```

## Where each clip lands on the site

| Clip | Page | Behaviour |
|---|---|---|
| `hero-circuit.mp4` | Home hero | scroll scrubbed, plays as you scroll the first screen |
| `colonnade.mp4` | Sectors, Government row | loops, slow parallax |
| `warehouse.mp4` | Sectors, NGOs row | loops, slow parallax |
| `workshop.mp4` | Sectors, Private Sector row | loops, slow parallax |
| `library.mp4` | Sectors, Education row | loops, slow parallax |
| `clinic.mp4` | Sectors, Healthcare row | loops, slow parallax |
| `farmland.mp4` | Sectors, Agriculture row | loops, slow parallax |
| `city-dusk.mp4` | Contact panel | loops behind the contact card |
| `atrium.mp4` | About hero | scroll scrubbed |

---

## CGI set: motion design clips we reuse across the site

These are not photographs. They are high end 3D motion design, and they carry the one idea the whole site
is built on: fragments assembling into structure. They share the site palette so they cut against the
footage without a seam: deep black, warm off-white (bone), amber gold, a trace of moss green.

Every one is generated on a **pure black background**. That is not a style choice, it is how we reuse them.
A black-background clip on a screen blend disappears everywhere it is black and only its light shows, so
one clip can sit over footage, over colour bands, over the loader, over a page wipe. Keep them black.

Same rules as the footage: one slow move, seamless loop feel, no text, no logos, no people, no dialogue,
no music. Attach nothing. 16:9, 1080p.

### C1. `cgi-warp.mp4`: the fly-through between chapters on the home film
Plays for a moment at every chapter change, screen-blended over the bloom. Already wired in, it starts
working the moment the file lands.

```
Generate a video: High end 3D motion design render, physically based lighting, pure black background. The camera flies
forward through a deep field of thousands of tiny floating particles and fine glass shards, warm off-white
and amber gold, some catching light like dust in sun. They stream past the camera and out of frame at the
edges, faster in the middle of the shot, easing off at the end as the field thins to black. Slight
volumetric haze, soft bokeh on the near particles, subtle motion blur. Seamless, no cuts, no text, no
logos, no people. No dialogue, no music.
```

### C2. `cgi-assembly.mp4`: home hero, scroll scrubbed
The brand mark. Four quarter-circle fragments, four pillars. As you scroll they arrive and lock.

```
Generate a video: High end 3D motion design render, physically based lighting, pure black background. Hundreds of small
matte bronze and warm off-white geometric fragments drift in from every edge of the frame in slow motion,
turning gently as they travel. Over the shot they gather at the centre and lock together into a single
clean ring made of four thick quarter-circle arcs with a thin gap between each arc, one arc in amber gold,
the other three in warm off-white. The ring holds still and sharp at the end, the last few fragments
settling into place. Shallow depth of field, soft key light from the upper left, faint amber rim light.
Slow, precise, satisfying. Seamless, no cuts, no text, no logos, no people. No dialogue, no music.
```

### C3. `cgi-terrain.mp4`: Sectors page hero
The highlands as data. Replaces the drone footage so the sectors page opens on a made thing, not a place.

```
Generate a video: High end 3D motion design render, pure black background. A vast rolling terrain built entirely from
glowing amber gold points and thin off-white contour lines, like a topographic survey of highland ridges
and terraced valleys, floating in black space. The camera drifts forward and slightly down over it in one
slow continuous move. Faint pulses of light travel along a few contour lines. Volumetric haze low in the
valleys, soft depth of field at the far edge. Seamless, no cuts, no text, no logos, no people. No
dialogue, no music.
```

### C4. `cgi-network.mp4`: Services hero and the contact card backdrop
Systems connecting. Replaces the fibre clip.

```
Generate a video: High end 3D motion design render, pure black background. A network of small warm off-white nodes floats
in deep black space. Thin amber gold lines draw themselves between nodes one after another, and small
bright pulses of light travel along the finished lines. The structure slowly rotates a few degrees and
the camera pushes in gently. Shallow depth of field so the near nodes bloom softly. Calm, precise,
unhurried. Seamless, no cuts, no text, no logos, no people. No dialogue, no music.
```

### C5. `cgi-blocks.mp4`: Approach page, behind the four pillars
Implementation with precision. Things rising and settling exactly where they belong.

```
Generate a video: High end 3D motion design render, physically based lighting, pure black background. A field of matte
charcoal blocks with warm off-white top faces rises from below one block at a time in a smooth stepped
rhythm and settles into a clean terraced structure, like a city or a plan being built. A single amber gold
block lands last on the highest tier. The camera orbits very slowly around the structure, a few degrees
over the whole shot. Soft studio key light from the left, subtle ambient occlusion in the gaps. Seamless,
no cuts, no text, no logos, no people. No dialogue, no music.
```

### C6. `cgi-ink.mp4`: page transition wipe and the loader curtain
Organic contrast to all the geometry.

```
Generate a video: Macro footage look, pure black background. A single bloom of amber gold and warm off-white ink released
into still black water, unfurling in slow motion into soft tendrils and clouds that spread toward the
edges of the frame. Fine particles glint inside the ink. High speed camera slowed down, very shallow
depth of field, soft light from behind. Seamless, no cuts, no text, no logos, no people. No dialogue,
no music.
```

### C7. `cgi-prism.mp4`: About page hero
Light passing through structure.

```
Generate a video: High end 3D render, physically based lighting, pure black background. A tall slab of frosted glass rotates
very slowly in black space. A single warm light passes through it and throws soft amber and off-white
caustics and refractions across the black, bending and stretching as the slab turns. Subtle internal
dispersion at the edges. Nothing else in frame. Calm and slow. Seamless, no cuts, no text, no logos, no
people. No dialogue, no music.
```

### Where each CGI clip lands

| Clip | Where | How it is used |
|---|---|---|
| `cgi-warp.mp4` | Home film, every chapter change | screen-blended particle pass during the fly-through |
| `cgi-assembly.mp4` | Home hero | scroll scrubbed, the mark assembles as you scroll |
| `cgi-terrain.mp4` | Sectors hero | slow loop with parallax |
| `cgi-network.mp4` | Services hero, contact card | slow loop |
| `cgi-blocks.mp4` | Approach, pinned pillars section | slow loop behind the cards |
| `cgi-ink.mp4` | Page transitions, loader | plays once on each route change |
| `cgi-prism.mp4` | About hero | slow loop with parallax |

Generate C1 and C2 first. C1 makes the home film feel finished and C2 is the brand.

## Status

| Clip | State |
|---|---|
| `workshop.mp4`, `library.mp4`, `clinic.mp4`, `colonnade.mp4`, `farmland.mp4` | landed, cleaned, on their Sectors rows and in the home film |
| `city-dusk.mp4` | landed, Contact page panel |
| `cgi-warp.mp4` | landed, a faint screen-blended particle pass over the home film iris transition (peak opacity 0.26) |
| `cgi-assembly.mp4` | landed, rebuilt as a 20 s forward-then-reverse loop, behind the pinned pillars on Approach |
| `cgi-terrain.mp4` | landed, Sectors hero |
| `cgi-network.mp4` | landed, behind the About values deck (the contact card now uses the morphing particles instead) |
| `cgi-prism.mp4` | landed, About hero |
| `cgi-ink.mp4` | landed, under the loader as the mark rises, and scroll-scrubbed behind the home statement (first half of the clip only) |
| `warehouse.mp4`, `cgi-blocks.mp4` | not generated yet, the NGOs row shows its photo and Approach uses the assembly clip instead of blocks |
| `hero-circuit.mp4`, `atrium.mp4` | not needed, the home hero keeps the Higgsfield circuit footage by choice |

Every clip is served at 1920x1080. The Higgsfield four come straight from their 1080p masters in
`brief/assets/video/`. The Gemini clips are 720p at source: watermark removed with a delogo pass at 720p,
then Lanczos upscale to 1080p with a light unsharp, CRF 18, keyframe every 30 frames (every 12 for the
scrubbed ones: nairobi, cgi-ink, cgi-network), poster from frame 0. The script is in the session scratchpad
as `reencode.sh` and is easy to recreate from this note. Raw downloads live in `brief/assets/video-raw/`.
The whole video folder is about 138 MB; each page only loads the clips it uses and the film chapters load
metadata only until they play.

If Gemini ever offers a 1080p export, regenerate `cgi-network`, `cgi-warp` and `cgi-terrain` first, they
are the ones seen largest.

## 3D (Blender to three.js)

`site/scripts/blender-mark.py` builds the mark and a shard set headless and exports glTF:

```
"C:/Program Files/Blender Foundation/Blender 5.2/blender.exe" --background --python scripts/blender-mark.py
```

Outputs `site/public/models/ctec-mark.glb` (four bevelled ring segments measured from logo.svg, 91 KB) and
`shards.glb` (six low poly chunks, 14 KB, shared through `site/src/three/shards.ts`). `Shards3D.tsx` is a transparent drifting shard layer with cursor parallax, used over the home hero, the home film and the contact card. `site/src/three/Mark3D.tsx` loads them with plain three.js
(React Three Fiber refuses React 19.3, so no wrapper), lazy loaded so three.js is its own chunk. The mark
assembles on scroll, tilts to the cursor, eases apart on hover, and 132 instanced shards orbit it. It sits
on the Approach page under the hero. The same component can be dropped anywhere with `<Mark3D />`.

## Particles (three.js Points)

`site/src/three/ParticleMark.tsx` samples points from a shape and morphs between shapes: the mark from
`logo.svg`, or any text rendered in Fraunces. Used in the footer (mark only) and in the contact card
(mark, then "Let's talk", then an arrow, cycling every 4.2 s and jumping on hover). Assembly follows the
element's own scroll position, the cursor pushes points aside, morphs are staggered per point with a
lift out of the plane. Add `{ kind: "text", text: "..." }` targets anywhere copy allows.

The About values deck is pinned and dealt by scroll: the active card follows scroll progress through
the six values, arrows and clicks still work.
