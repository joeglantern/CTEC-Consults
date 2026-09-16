# CTEC brand direction

Status: **proposed, awaiting Liban's sign off.** Nothing is generated until this is approved.

## The idea in one line

Africa's sun and soil, run through a precise system. Warm ink and bone with one hot accent, geometric pattern fragments that assemble into structure. Editorial, not corporate. Confident, not loud.

## Color palette

Built to feel intentional and physical (paper, clay, moss, embers), not screen-blue "tech". Every color has a job.

| Token | Hex | Job |
|---|---|---|
| `ink` | `#0C0D0B` | Page background for dark sections. Warm near-black, never pure #000. |
| `graphite` | `#181917` | Cards, nav pill, panels on ink. |
| `ash` | `#2A2B27` | Borders and dividers on ink. 1px lines. |
| `bone` | `#F1ECE2` | Light section background and primary text on ink. Warm, slightly yellow. |
| `parchment` | `#E4DDCF` | Cards on bone. |
| `mist` | `#9A9B92` | Secondary text on ink, eyebrows, mono labels. |
| `ochre` | `#E0A030` | The accent. CTAs, arrow chips, active nav, cursor, loader glow, pattern highlight. Use at 5 to 10 percent of any screen, never more. |
| `moss` | `#3A6B4A` | Secondary. Sector tags, success states, agriculture/health/education moments, one of the aura colors. |
| `oxblood` | `#7A2E2E` | Tertiary. Spotlight glows, one of the aura colors, hover tints. Never as text. |

Aura gradient (replaces the rainbow blob): `ochre` at 35 percent opacity, `oxblood` at 30 percent, `moss` at 25 percent, blurred 120px+, drifting over `ink`.

Nine service band tints for the accordion, all derived from the palette so nothing feels random. Text on all of them is `bone`:
1. `#7A2E2E` oxblood
2. `#4A3628` umber
3. `#3A6B4A` moss
4. `#2F4A44` deep teal
5. `#5C4A2A` bronze
6. `#3B3F5C` slate blue
7. `#5A3A4A` plum
8. `#2E4A36` forest
9. `#6B4A1E` dark ochre

Sector footer colors (6): oxblood, moss, bronze, slate blue, deep teal, umber.

If Liban wants it cooler: swap `moss` for `#1E6E6E` (teal) and `oxblood` for `#3B3F8C` (indigo). Everything else stays.

Contrast check: bone on ink 16.8:1, mist on ink 6.1:1, ink on bone 15.9:1, ochre on ink 8.9:1, bone on moss 6.2:1, bone on oxblood 8.3:1. All pass AA for body text.

## Typography

| Role | Font | Why | Weights |
|---|---|---|---|
| Display | **Fraunces** (Google Fonts, variable) | High contrast serif with real italics and "wonk" and "soft" axes. It has personality without being Playfair or Instrument Serif, which every AI made site uses now. Reads editorial and warm. | 300, 400 italic, 600 for numerals |
| Body / UI | **Hanken Grotesk** (Google Fonts, variable) | Clean grotesk with a slightly humanist warmth, not Inter, not Roboto. Good at small sizes. | 400, 500, 600 |
| Labels / data | **Geist Mono** (Vercel, free) | Eyebrows, step numbers (01 / 04), cursor labels, footer legal. The mono gives the gen z tech edge. | 400, 500 |

Fraunces settings: `font-variation-settings: "SOFT" 30, "WONK" 1` for display headlines; `"opsz" 144` at hero size. Italic emphasis word inside a roman headline is the signature move.

Type scale (desktop / mobile):
- Hero: 112 / 48px, line-height 0.95, letter-spacing -0.02em
- H1: 80 / 40px
- H2: 56 / 32px
- H3 (accordion titles): 40 / 28px italic
- Statement paragraph: 40 / 24px sans
- Body: 18 / 16px, line-height 1.55, max width 60ch
- Small: 14px
- Eyebrow / mono: 12px, uppercase, letter-spacing 0.14em, bracketed like `( OUR APPROACH )`

Alternate pairing if Fraunces feels too soft: **Newsreader** (display) + **Geist** (body) + Geist Mono.

## Spacing and shape

- Base unit 8px. Section padding 120px desktop, 64px mobile.
- Container max 1440px, side gutter 40px desktop, 20px mobile.
- Radius: pills 999px, cards 24px, image cards 20px, small chips 8px.
- Borders 1px `ash` on ink, 1px `parchment` on bone. Gradient borders (ochre to oxblood) only on the nav pill and the contact card.
- Grain: 3 percent noise overlay on all dark sections so gradients never band.

## Logo

**Round one results (16 Sep 2026), files in `assets/logo/` as SVG:**
- `logo-01-arcs.svg`: C from four quarter arc segments with hairline gaps. **Recommended.** Clean at 24px, the four segments are literally the four pillars, and the segments double as the pattern tiles.
- `logo-04-cuts.svg`: high contrast serif C with three diagonal cuts. Strong alternate, more editorial, pairs with Fraunces. Weaker at favicon size.
- `logo-02` (ochre segment) and `logo-03` (blocks) rejected.
- Lockup: mark + "CTEC" in Fraunces + "CONSULTS" in Geist Mono tracked out, set live in the look test page rather than generated, so the type is exact.
- Pattern tile set `assets/shapes/S1-tiles.svg` approved as the fragment library.
- Still to do when credits allow: tessellated sheet S3, exploded sheet S4, ribbon S5.

Name treatment: **CTEC** as the mark, **CTEC Consults** as the wordmark. The "&" in the brief was a PowerShell path operator, not part of the name.

Concept: a **C built from four fragments**. The four pillars of the approach (Diagnose, Co-Design, Implement, Sustain) are four arcs or blocks that lock together into a C with a small gap. The gap is the "open" side: the client completes the shape. The same four fragments become the site-wide assembling pattern system. This gives the logo a reason to exist and gives the motion a story.

### Logo prompts (GPT Image 2.5 via Higgsfield, transparent background)

Prompt A, mark only:
```
Minimal geometric logo mark, letter C constructed from four separate interlocking arc segments with thin hairline gaps between them, the four segments slightly different in thickness so the C reads as assembled from parts, flat vector style, single color warm bone #F1ECE2 on a fully transparent background, no gradients, no 3D, no shadows, no text, no background, centered, generous padding, crisp edges, brand identity quality, Swiss modernist precision
```

Prompt B, mark with an ochre accent:
```
Same construction: letter C made of four interlocking arc segments with hairline gaps. Three segments in warm bone #F1ECE2, the final segment in ochre #E0A030. Flat vector, transparent background, no other elements, no text, centered
```

Prompt C, wordmark lockup:
```
Logo lockup: on the left a letter C built from four interlocking arc segments with hairline gaps, to its right the word "CTEC" in a refined high contrast serif with tight letter spacing, and beneath it in small tracked out sans capitals "CONSULTS". Single color warm bone #F1ECE2, flat vector, transparent background, no extra shapes, no gradients, no shadows, generous margins
```

Prompt D, the four fragments as separate assets (for the motion system):
```
Four separate flat vector shapes on one transparent canvas, arranged in a row with equal spacing: the four arc segments that together would form a letter C, each segment a clean quarter arc with flat cut ends, warm bone #F1ECE2, no outlines, no text, no background, crisp edges
```

Run each at 2048x2048, 3 to 4 variations, pick, then we vectorize the winner (trace in Illustrator or Vectorizer.ai) so it is an SVG for the site. Negative for all: `no gradient, no glow, no 3D render, no photorealism, no mockup, no shadow, no background color, no watermark`.

## "Does not look AI" rules

1. One accent color, used sparingly. AI sites use three neon gradients.
2. Warm neutrals (bone, ink) not pure white and black.
3. Real typographic decisions: italic emphasis words, hairline rules as layout elements, bracketed mono eyebrows, huge numerals.
4. Asymmetry: headlines left, body offset right, cards tilted a few degrees.
5. Grain and slight imperfection on every gradient.
6. No stock photography of smiling people at laptops. Visuals are pattern, texture, macro, environment, typography.
7. Motion has weight and easing, nothing bounces.
8. Copy sounds like a person (see `07-copy-brief.md`).
