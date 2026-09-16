# Asset manifest

## Status update, 16 Sep 2026 (after the first Higgsfield session)

Direction change: the hero is real-looking cinematic footage, not the abstract pattern field. Pattern tiles move to the loader, page transitions and the Approach section. All generation runs through Higgsfield (Soul Cinematic and Soul Location for stills, Seedance 2.5 for video, GPT Image 2.5 and Recraft for flat graphics). Credits: the workspace dropped from 415 to about 53; 10 second 1080p high bitrate Seedance clips cost roughly 100+ each. Nothing else is queued until a top up.

Generated so far (in `assets/images` and `assets/video`):

| File | What | Verdict |
|---|---|---|
| `images/r2-B-circuit.png` + `video/hero-circuit-v1.mp4` | Matte black PCB, gold traces, warm light sweep, 10s 1080p | **Home hero. Approved direction.** |
| `images/r2-D-atrium.png` | Atrium, low sun through timber screen | **About hero.** Video not yet generated (credits). |
| `images/r2-E-highlands.png` + `video/sectors-highlands-v1.mp4` | Kenyan highlands at first light, 10s 1080p | **Sectors hero.** |
| `images/r2-C-fins.png` | Anodized fins, rim lit | Backdrop for statement and contact sections. |
| `images/hero-01-nairobi-circuit.png` + `video/hero-01-nairobi-v1.mp4` | Nairobi grid from above (round one) | Backup only. Clip opens washed out. |
| `images/hero-02-fibre.png` + `video/hero-02-fibre-v1.mp4` | Fibre optic macro (round one) | Services page candidate or drop. |
| `images/hero-03-server.png` | Server corridor | Rejected, dim and grungy. |
| `images/r2-A-nairobi-skyline.png` | Skyline at blue hour | Rejected, too dark and generic. |

Next in priority when credits allow: atrium clip (About), logo runs L1 to L4, pattern tile sets S1 to S5, then the section visuals.

Prompt that worked best for stills (Soul Cinematic, 16:9, 2k): describe one physical subject, one warm light source, everything else falling to black, name a camera look (anamorphic, ARRI, medium format), add "subtle film grain, no text, no watermark". Video prompts: describe only one slow camera move and one light change, "no cuts, no text, seamless".


Every asset the site needs, what generates it, the prompt, and specs. Output lands in `brief/assets/<folder>/`. All prompts assume the palette in `02-brand-direction.md` is approved; if the palette changes, find and replace the hex codes here.

Status key: `todo` / `generating` / `review` / `approved`.

## 1. Logo (Higgsfield, GPT Image 2.5, transparent PNG then vectorize)

| ID | Asset | Prompt | Spec | Status |
|---|---|---|---|---|
| L1 | Mark, bone | Prompt A in `02` | 2048px, transparent PNG, then SVG | todo |
| L2 | Mark, ochre accent | Prompt B | same | todo |
| L3 | Wordmark lockup | Prompt C | 4096x2048 | todo |
| L4 | Four fragments | Prompt D | 4096x1024 | todo |

Derived by hand after vectorizing: favicon (32, 180, 512), OG image (1200x630, mark on ink with aura).

## 2. Icons (no generation, use a real library)

Use **Phosphor Icons** (duotone weight, MIT). AI generated icon sets are never consistent across 25 glyphs. Map:

| Use | Icon |
|---|---|
| Strategic Innovation & Technology Integration | `Lightning` |
| Project Planning & Management | `Kanban` |
| Organizational Strategic Planning | `Compass` |
| Policy Development & Institutional Frameworks | `Scales` |
| Digital Transformation Advisory | `CircuitBoard` |
| Monitoring, Evaluation & Learning | `ChartLineUp` |
| Capacity Building & Training | `GraduationCap` |
| Research & Knowledge Management | `BookOpenText` |
| ESG & Sustainability Advisory | `Leaf` |
| Government & Public Sector | `Bank` |
| NGOs & International Development | `Globe` |
| Private Sector & SMEs | `Storefront` |
| Education & Research | `Student` |
| Healthcare | `FirstAid` |
| Agriculture & Environment | `Plant` |
| Pillar 1 Diagnose | `MagnifyingGlass` |
| Pillar 2 Co-Design | `PencilRuler` |
| Pillar 3 Implement | `Target` |
| Pillar 4 Sustain | `Sprout` |
| Values: Innovation, Integrity, Excellence, Collaboration, Impact, Inclusion | `Sparkle`, `ShieldCheck`, `Medal`, `HandsClapping`, `ArrowsOutCardinal`, `UsersThree` |
| UI | `ArrowUpRight`, `ArrowUp`, `Plus`, `Minus`, `WhatsappLogo`, `EnvelopeSimple`, `Phone`, `MapPin`, `List`, `X` |

Export as SVG, stroke `bone`, duotone fill `ochre` at 20 percent. Also export a PNG set at 96px for the design canvas if it needs raster.

## 3. Shapes and pattern tiles (Higgsfield, GPT Image 2.5, transparent PNG)

These drive the "assembling / disassembling" motif. Everything is built from the four C fragments plus a tessellating triangle grid.

| ID | Asset | Prompt | Spec | Status |
|---|---|---|---|---|
| S1 | Fragment tile set | `Flat vector set of 12 geometric tiles on a transparent background, arranged in a 4x3 grid with equal gaps: quarter arcs, half arcs, right triangles, thin rectangles and a small circle, all derived from the same stroke thickness so they can tessellate together, warm bone #F1ECE2, no outlines, no gradients, no text, crisp` | 4096px sq, transparent | todo |
| S2 | Same set, ochre | Same prompt, color `#E0A030` | same | todo |
| S3 | Assembled pattern sheet | `A large flat tessellated pattern made of quarter arcs and triangles locking together into a continuous geometric field, like a woven textile diagram, warm bone #F1ECE2 shapes with hairline gaps on a transparent background, slight variation in which cells are filled so the pattern breathes, no text, no gradient` | 4096x2048, transparent | todo |
| S4 | Pattern sheet, dispersed | `The same tessellated arc and triangle pattern but exploded outward, tiles drifting apart with rotation, as if mid disassembly, warm bone #F1ECE2 on transparent, no text` | 4096x2048, transparent | todo |
| S5 | Curling pattern ribbon (replaces the silk ribbon) | `A single sheet of a geometric tessellated pattern (arcs and triangles) curling and folding through space like a strip of paper, rendered as clean flat vector with subtle self shadow only, warm bone #F1ECE2 and ochre #E0A030 cells on a fully transparent background, isolated object, no scene, no text` | 4096x2048, transparent | todo |
| S6 | Four pillar glyph objects (4 images) | `A single abstract object built from bone #F1ECE2 geometric fragments floating in a tight cluster, [Pillar description], flat vector with subtle depth, transparent background, isolated, no text.` Pillar descriptions: 1 `fragments arranged like a magnifying lens ring`, 2 `fragments interlocking like two hands of arcs meeting`, 3 `fragments stacked into a precise stepped tower`, 4 `fragments branching upward like a sprouting plant` | 2048px sq each | todo |
| S7 | Nine service visuals (9 images) | Abstract compositions for the services rail and accordion. Template: `Abstract editorial illustration made only of flat geometric fragments (arcs, triangles, thin bars) in warm bone #F1ECE2 and a single accent ochre #E0A030, on a solid [band tint hex] background, composition suggests [concept], generous negative space, no text, no people, no gradient, no 3D, print quality`. Concepts: 1 a spark leaping across a gap, 2 a timeline of bars climbing, 3 a compass rose, 4 a stacked ledger of lines, 5 a circuit of arcs connecting nodes, 6 a rising line chart drawn from tiles, 7 tiers of arcs like an amphitheatre, 8 an open book of bars, 9 a leaf made of triangles | 2400x1600 each, solid bg (the band tint) | todo |
| S8 | Six sector visuals (6 images) | Same template, backgrounds are the sector footer colors. Concepts: 1 a colonnade of bars, 2 a globe of arcs, 3 a market stall grid, 4 a lecture hall of tiles, 5 a cross of arcs, 6 rows of sprouting triangles | 2400x1600 each | todo |
| S9 | Five "Why CTEC" card visuals | Same template on graphite `#181917`. Concepts: 1 a gear of arcs, 2 a map of Africa outlined by tiles, 3 five overlapping circles, 4 a single tile fitting a gap, 5 a path of tiles leading forward | 2000x1400 each | todo |
| S10 | Six value visuals for the fanned deck | Same template on graphite. Concepts match the value icons above | 1600x2000 each (portrait) | todo |

## 4. Textures (code, not generated)

- Grain: SVG feTurbulence noise, 3 percent opacity, all dark sections.
- Aura: CSS radial gradients, three blobs, animated with transform only. No video needed for this.

## 5. Video loops (Higgsfield, Seedance 2.5, MP4 H.264 + WebM)

Video is used where CSS cannot do the job: the loader, the hero pattern field, the contact card, and the approach section backdrop. Keep them short, seamless, and dark so they compress well. No people, no cameras moving through offices.

| ID | Asset | Prompt | Spec | Status |
|---|---|---|---|---|
| V1 | Hero pattern field loop | `Top down view of a vast dark surface, ink black #0C0D0B, covered in thousands of small flat geometric tiles in warm bone #F1ECE2 (quarter arcs and triangles). The tiles slowly drift, rotate and lock together into a tessellated grid, hold, then gently drift apart again. A soft ochre #E0A030 light source moves across from the left, catching tile edges. Seamless loop, slow, minimal, no text, no people, no camera shake, flat lighting, cinematic 4K` | 10s, 1920x1080, seamless, 24fps | todo |
| V2 | Loader mark assembly | `Ink black background. Four bone #F1ECE2 arc segments fly in from four directions and lock together into a letter C with hairline gaps, a brief ochre #E0A030 glow pulses along the seams as they connect, then the C holds still. Flat vector look with subtle depth, centered, no text, 2 seconds, no camera movement` | 3s, 1080x1080, alpha not needed (bg matches page ink) | todo |
| V3 | Contact card loop | `Close up of a dark woven surface of bone #F1ECE2 geometric tiles on ink #0C0D0B. One tile is missing. A single ochre #E0A030 tile slides in and fits the gap perfectly, the surrounding tiles settle, a soft light pulse spreads outward, then the ochre tile slowly fades to bone. Seamless loop, calm, macro lens, no text` | 8s, 1080x1350 (portrait) | todo |
| V4 | Approach backdrop | `Dark ink void with a soft oxblood #7A2E2E spotlight from the top. Below it, a horizontal river of bone #F1ECE2 geometric tiles flows slowly from right to left, tiles occasionally clustering into four distinct groups then dispersing, very slow, atmospheric, no text, no people, seamless loop` | 12s, 1920x1080 | todo |
| V5 | Sector ambient (optional, 6 short clips) | Only if Liban wants photographic texture. Macro, no people, no faces: `Extreme macro of [subject], shallow depth of field, warm low light, slow drift, cinematic, 4 seconds` with subjects: cracked red earth with a green shoot, woven sisal fibre, stacked paper ledger edges, chalk dust on dark slate, folded cotton gauze, rain on a corrugated roof. These read as African context without being tourist imagery. | 4s each, 1080x1350 | todo |

Delivery: each MP4 plus a poster frame JPG (first frame) for the loading state and reduced motion.

## 6. Reference frames for the design canvas

Copy these from the scratchpad extraction into `brief/refs/`:
- f002 (hero + nav), f005 (docked nav), f021 (accordion open), f034 (drag carousel), f035 (contact card), f065 (fanned deck), f090 (approach cards), f019 (light section)

## Generation order

1. L1 to L4 (logo). Review with Liban. Vectorize.
2. S1 to S5 (pattern system). These define the visual language for everything after.
3. V2 (loader) and V1 (hero field).
4. S6 to S10 (section visuals).
5. V3, V4.
6. V5 only if wanted.

Estimated Higgsfield runs: about 40 image generations (with variations) and 4 to 10 video generations.
