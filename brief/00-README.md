# CTEC Consults website: project brief index

Company: CTEC Consults Limited (Nairobi, Kenya). Name on site: **CTEC Consults**. Short mark: **CTEC**.
Inspiration: creativeans.com (screen recording, 16 Sep 2026, analysed frame by frame in `01-inspo-breakdown.md`).

## Files

| File | What it is | Who uses it |
|---|---|---|
| `content/company-profile-source.md` | The only approved content. Facts, services, sectors, approach, contact. | Writer, design canvas, dev |
| `01-inspo-breakdown.md` | Timestamped breakdown of the inspiration site: what each section does, what we keep, adapt, or drop. | Everyone |
| `02-brand-direction.md` | Palette, typography, logo generation prompts, "not AI" rules. | design canvas, image tools, dev |
| `03-asset-manifest.md` | Every image, icon, shape and video asset with generation prompts and specs. | Higgsfield runs, dev |
| `04-design-brief.md` | The prompts to paste into the design canvas, page by page, plus what to attach. | design canvas |
| `05-nav-concepts.md` | Replacement for the text dropdown: image-embedded overlay nav options. | design canvas, dev |
| `06-motion-spec.md` | Loader, page transitions, scroll choreography, assembling pattern system, easing tokens. | design canvas (for intent), dev (for build) |
| `07-copy-brief.md` | Brief for the writer session. Tone, structure per page, word counts, banned words. | Writer |
| `copy/` | Writer drops final copy here as md, one file per page. | Writer writes, everyone reads |
| `assets/` | Generated assets land here (`logo/`, `icons/`, `shapes/`, `images/`, `video/`). | Higgsfield output |

## Build status (16 Sep 2026)

The site is built in `../site/` (Vite + React + TypeScript, React Router for clean URLs, GSAP + ScrollTrigger + Lenis for motion).

- Run locally: `cd site && npm install && npm run dev` then open http://localhost:5173
- Production build: `npm run build` (output in `site/dist/`). `vercel.json` and `public/_redirects` handle the SPA fallback so `/services` etc. work on Vercel or Netlify.
- Pages: `/`, `/services`, `/approach`, `/sectors`, `/about`, `/contact`. All copy comes from `site/src/content/site.ts`, which mirrors `brief/copy/`.
- Footage in use: circuit board (home hero, loop with parallax and mouse drift), Nairobi grid (home approach teaser, scrubbed by scroll), highlands (sectors hero, loop with parallax), fibre (about values deck, scrubbed by scroll; contact card loop), Nairobi (contact page panel loop). Atrium still on the About hero with scroll parallax.
- Motion in: loader (four fragments lock into the C, then scatter), tile-wall page transitions, word reveals, pill nav that docks to the bottom, full screen menu overlay with hover panel, draggable rails with inertia, colour band accordion, letter-by-letter statement reveal under the oxblood spotlight, self drawing approach diagram, pinned four pillar scroll, fanned values deck with arrow keys, custom cursor with DRAG / VIEW / OPEN labels, reduced motion fallbacks.
- Still placeholders: service, sector and pillar visuals use the tile SVG until Higgsfield credits allow the S6 to S10 runs. Contact form submits via mailto until a form backend is chosen.

## Workflow

1. **Approve brand direction** (`02`): palette, type, logo prompt. Nothing gets generated until this is signed off, because every asset inherits the palette.
2. **Writer produces copy** (`07` in, `copy/` out) in parallel with step 3.
3. **Generate assets** with Higgsfield from `03`. Logo first, then shapes and pattern tiles, then video loops, then imagery.
4. **The design canvas** builds the canvas from `04` + `02` + `copy/` + `assets/`. Liban refines visually in the canvas editor (select, edit text, adjust), then exports or shares the artboards back.
5. **Handoff to build**: the build takes the canvas artboards + `06-motion-spec.md` + assets and codes the site (responsive, animated).

## What the design canvas needs attached when you prompt it

- `02-brand-direction.md` (tokens: colors, fonts, spacing scale)
- `copy/*.md` (final copy, so the design is built on real words, not lorem)
- `assets/logo/*.png` (transparent logo mark + wordmark)
- `assets/shapes/*.png` (pattern tiles / fragments for the assembling motif)
- 3 to 5 reference frames from the recording (already extracted, see `refs/`)
- The per-page prompt from `04-design-brief.md`

## Hard rules (apply to everything)

- No em dashes. Anywhere.
- No invented facts, stats, clients, testimonials, team members, awards.
- No stock-looking or AI-looking imagery. Abstract, textural, environmental, or typographic visuals only. No fake people presented as staff.
- Fully responsive: 360px phones through 1920px+ desktops.
- Every animation has a reduced-motion fallback.
