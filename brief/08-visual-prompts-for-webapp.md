# Section visuals: prompt pack for the Higgsfield web app

The CLI workspace is out of credits (0.31 left). If your plan gives unlimited or relaxed-mode generations in the Higgsfield web app, generate these there, download, and drop each file into `site/public/img/real/` with the exact filename below. The site is already wired to `/img/real/<name>.jpg`, so the moment a file is replaced it shows up. Keep them landscape, at least 1600px wide, JPEG.

Until then the site uses crops of the footage we already have (circuit board, fibre, Nairobi, highlands, atrium, fins), which look photographic and cohesive, so nothing reads as a placeholder.

## Look rules for every image

Real photograph, not illustration. One physical subject, one warm light source, everything else falling into shadow. Warm amber and bone highlights on near black or on warm stone and timber. No faces. No stock-photo smiles. No screens showing charts. No text or logos in frame. "Shot on a cinema camera, anamorphic, shallow depth of field, subtle film grain, no text, no watermark" at the end of every prompt.

Best models in the app: **Soul Location** for places and environments, **Soul Cinematic** for macro and objects, **GPT Image 2.5** if you need exact control.

## Services (9)

| File | Subject | Prompt |
|---|---|---|
| `svc-strategic-innovation.jpg` | Hands of an engineer placing a small circuit module into a larger board | Close photograph of two dark-skinned Kenyan hands in shirt sleeves, cropped at the wrists, no face in frame, fitting a small circuit module into a larger dark board on a workbench, warm desk lamp light from the left, black background falling away, shallow depth of field, anamorphic, film grain, no faces, no text, no watermark |
| `svc-project-management.jpg` | A printed project schedule on a drafting table with a steel ruler | Overhead photograph of a printed Gantt schedule on a dark timber drafting table, a steel ruler and a pencil across it, warm low lamp light raking across the paper, deep shadows, shallow focus, film grain, no text legible, no watermark |
| `svc-strategic-planning.jpg` | A brass compass on a topographic map | Macro photograph of a brass compass resting on a topographic map, warm light catching the brass, the map falling into shadow, black edges, shallow depth of field, anamorphic, film grain, no text legible, no watermark |
| `svc-policy-frameworks.jpg` | Bound policy volumes on a dark shelf | Photograph of a row of thick bound volumes with cloth spines on a dark oak shelf, one warm light from the side, gold edge foil catching the light, deep shadow, shallow focus, film grain, no text legible, no watermark |
| `svc-digital-transformation.jpg` | Server rack status lights, clean and premium | Photograph inside a modern data centre, a single clean rack with rows of small amber and white status lights, dark corridor receding, no clutter, cinematic, shallow depth of field, film grain, no text, no watermark |
| `svc-mel.jpg` | Field notebook with a pen and a tablet showing a blank dashboard | Overhead photograph of a field notebook with handwritten tally marks, a pen, and a dark tablet screen turned off, on a wooden table in warm evening light, shallow focus, film grain, no legible text, no watermark |
| `svc-capacity-building.jpg` | A training room from behind, chairs and a whiteboard, warm light | Photograph of an empty training room from the back, rows of chairs facing a large whiteboard, warm late sun through slatted blinds throwing stripes across the floor, no people, cinematic, film grain, no text, no watermark |
| `svc-research.jpg` | Archive drawers and index cards | Photograph of open archive drawers with index cards, one card pulled halfway out, warm lamp light, dark surroundings, shallow depth of field, film grain, no legible text, no watermark |
| `svc-esg.jpg` | A young tree seedling in dark soil under warm light | Macro photograph of a seedling in dark soil, warm side light on the leaves, black background, water droplets on the leaf, shallow depth of field, film grain, no text, no watermark |

## Sectors (6)

| File | Subject | Prompt |
|---|---|---|
| `sec-government.jpg` | Stone colonnade of a civic building in Nairobi at dusk | Photograph of a stone colonnade of a civic building at dusk, warm light on the columns, long shadows, empty, cinematic, anamorphic, film grain, no text, no watermark |
| `sec-ngos.jpg` | Aid supplies stacked in a warehouse, warm light | Photograph of neatly stacked relief supply sacks and crates in a warehouse, one shaft of warm light from a high window, no people, cinematic, film grain, no legible text, no watermark |
| `sec-private-sector.jpg` | A small workshop or shop interior at golden hour, no people | Photograph of a small workshop interior, tools on a pegboard and a workbench, warm golden hour light through the doorway, no people, cinematic, film grain, no text, no watermark |
| `sec-education.jpg` | Library reading tables with green lamps | Photograph of long reading tables in a library with brass lamps, warm pools of light, dark wood, no people, cinematic, shallow focus, film grain, no text, no watermark |
| `sec-healthcare.jpg` | A clean clinic corridor with warm light | Photograph of a clean clinic corridor, pale walls, a single warm light at the far end, empty, calm, cinematic, film grain, no text, no watermark |
| `sec-agriculture.jpg` | Terraced tea or maize fields at first light, Kenyan highlands | Aerial photograph of terraced farmland in the Kenyan highlands at first light, mist in the valley, warm sunrise on the ridges, red earth road, medium format, film grain, no people, no text, no watermark |

## Pillars (4), these sit on parchment cards so they can be slightly lighter

| File | Subject | Prompt |
|---|---|---|
| `pillar-diagnose.jpg` | A magnifying loupe over a printed map | Macro photograph of a jeweller's loupe resting on a printed map, warm light, shallow focus, film grain, no legible text, no watermark |
| `pillar-codesign.jpg` | Two hands sketching on tracing paper over a blueprint | Overhead photograph of two dark-skinned Kenyan hands sketching with a pencil on tracing paper over a blueprint, warm lamp light, shallow focus, film grain, no faces, no legible text, no watermark |
| `pillar-implement.jpg` | A spirit level on a concrete beam | Photograph of a spirit level resting on a fresh concrete beam on a construction site, warm evening light, shallow focus, film grain, no people, no text, no watermark |
| `pillar-sustain.jpg` | A handover of keys, hands only | Photograph of one dark-skinned Kenyan hand passing a set of keys to another dark-skinned hand, cropped at the wrists, no face in frame,, warm side light, dark background, shallow focus, film grain, no faces, no text, no watermark |

## Video pack (two steps each: make the still, then animate it)

Workflow in the Higgsfield app for every clip: generate the still first with **Soul Location** (16:9, 2K), pick the best, then open **Seedance 2.5** in image-to-video mode, use that still as the **start frame**, paste the motion prompt, set **10 seconds, 1080p, 16:9, audio off**. Download as MP4 into `site/public/video/` with the filename shown. Also save the still as the poster into `site/public/img/` as `<name>-poster.jpg`.

Rules for all motion prompts: one slow camera move, one light change, nothing else. "No cuts, no text, no people, seamless loop, calm and cinematic, subtle film grain" at the end of every one.

### 1. `atrium.mp4` (About page hero)
Still: already exists, use `brief/assets/images/r2-D-atrium.png` as the start frame.
Seedance: Interior atrium at dusk, low sun behind a slatted timber screen. The camera dollies very slowly to the right along the polished concrete floor. The amber light stripes slide across the floor and the stone wall as the sun sinks a fraction. Faint dust drifts in the light. No cuts, no text, no people, seamless loop, calm and cinematic, subtle film grain.

### 2. `workshop.mp4` (Sectors, Private Sector row)
Still (Soul Location): Interior of a small workshop in Nairobi at golden hour, tools hung on a dark pegboard wall, a worn timber workbench, warm sun through the open doorway throwing a shaft of light across the floor, dust in the air, no people, cinematic, anamorphic, shallow depth of field, subtle film grain, no text, no watermark.
Seedance: Slow push forward into the workshop toward the workbench. Dust drifts through the shaft of golden light. The light warms and lengthens slightly as the sun drops. No cuts, no text, no people, seamless loop, calm and cinematic, subtle film grain.

### 3. `library.mp4` (Sectors, Education row)
Still (Soul Location): Long reading tables in an old university library, brass lamps with green glass shades making pools of warm light on dark wood, tall shelves falling into shadow, no people, cinematic, anamorphic, shallow depth of field, subtle film grain, no text, no watermark.
Seedance: Slow dolly along the reading tables, passing one brass lamp after another, each pool of light sliding through the frame. The shelves in the background drift with parallax. No cuts, no text, no people, seamless loop, calm and cinematic, subtle film grain.

### 4. `clinic.mp4` (Sectors, Healthcare row)
Still (Soul Location): A clean modern clinic corridor, pale bone walls, a single warm light at the far end, polished floor with a soft reflection, empty, calm, cinematic, anamorphic, shallow depth of field, subtle film grain, no text, no watermark.
Seedance: Very slow push forward down the corridor toward the warm light at the far end. The reflection on the floor stretches gently as the camera moves. No cuts, no text, no people, seamless loop, calm and cinematic, subtle film grain.

### 5. `colonnade.mp4` (Sectors, Government row)
Still (Soul Location): Stone colonnade of a civic building at dusk, tall columns lit warm from one side, long shadows across the flagstones, deep indigo sky beyond, empty, cinematic, anamorphic, subtle film grain, no text, no watermark.
Seedance: Slow lateral dolly along the colonnade, columns passing in the foreground with parallax against the sky. The warm light on the stone dims a touch as dusk deepens. No cuts, no text, no people, seamless loop, calm and cinematic, subtle film grain.

### 6. `warehouse.mp4` (Sectors, NGOs row)
Still (Soul Location): Interior of a relief supply warehouse, neatly stacked sacks and crates, one shaft of warm light from a high window cutting through dust, everything else in shadow, no people, no legible text, cinematic, anamorphic, subtle film grain, no watermark.
Seedance: Slow push toward the shaft of light. Dust motes turn slowly inside the beam. The beam sweeps a few degrees across the stacks as the sun moves. No cuts, no text, no people, seamless loop, calm and cinematic, subtle film grain.

### 7. `city-dusk.mp4` (Contact page panel, replaces the Nairobi grid loop)
Still (Soul Location): Nairobi street at blue hour seen from a rooftop, warm windows and streetlights coming on, traffic light trails on the avenue, deep indigo sky, cinematic, anamorphic, long exposure look, subtle film grain, no text, no watermark.
Seedance: Static rooftop shot. Windows and streetlights switch on one by one across the frame, traffic trails flow along the avenue, the sky deepens from indigo to near black. No cuts, no text, seamless loop, calm and cinematic, subtle film grain.

### 8. `hero-circuit-v2.mp4` (optional, sharper home hero)
Still (Soul Cinematic): Extreme macro of a matte black printed circuit board, fine gold traces and tiny components catching a single warm amber light sweep from the left, the rest falling to pure black, razor thin depth of field, tilt shift, product photography precision, subtle film grain, no text, no logos, no watermark.
Seedance: A single warm amber light sweeps very slowly from the left edge to the right, revealing gold traces and components as it passes and letting them fall back into black behind it. The camera drifts forward a few millimetres with razor thin depth of field so traces slide in and out of focus. No cuts, no text, no flicker, seamless loop, calm and cinematic, subtle film grain.

Once any of these exist, tell me which landed and I'll wire them in (the Sectors rows are ready to take a clip each).
