# Inspiration breakdown: creativeans.com

Source: 109 second screen recording, 2560x1516, viewed at 1 frame per second. Timestamps are mm:ss. Verdict column says what happens for CTEC: **Keep** (same mechanic), **Adapt** (same idea, our content/palette), **Drop** (no content for it or not our vibe).

## Global system (present on every page)

| Element | What it does | Verdict |
|---|---|---|
| Loader (00:00 to 00:02) | Black screen, iridescent 3D "C" monogram with chromatic edge light, rotates slightly, then hard cut to page. | **Adapt.** Our loader is the CTEC mark assembling from pattern fragments (see `06-motion-spec.md`). No rainbow. |
| Pill nav | Centered dark pill with a thin animated gradient border (teal to purple). Links: Works, Solutions, About, BrandsBuilder.ai, MORE. Logo left. Right side: two round icon buttons (WhatsApp, search) + outlined "Start a Project" pill with a circular arrow chip. | **Keep the pill + docking.** Border gradient becomes ochre to oxblood. Right side: one round WhatsApp button + "Start a conversation" pill. Drop search. |
| Nav docking (00:04) | On scroll the pill detaches from the header and floats at bottom center with an up-arrow circle on its left and a green WhatsApp circle on its right. Stays for the whole page. | **Keep.** This is the signature. On mobile it becomes a compact bottom bar. |
| Dropdown menus (00:40 to 00:46, 01:36 to 01:39) | Hover on a nav item opens a rounded panel with a gradient border: left column serif category label, right columns plain text links. No imagery. | **Drop.** Replaced by image-embedded overlay, see `05-nav-concepts.md`. |
| Ticker banner (top) | Scrolling promo strip above the header. | **Drop.** Nothing to promote and it cheapens the header. |
| Ambient aura | Large blurred rainbow blob (yellow, green, blue, magenta) drifting slowly behind all dark sections. It is a blurred video or animated gradient, always moving. | **Adapt.** Same mechanic, our palette: ochre, oxblood, moss, drifting on ink. Lower saturation, slower. |
| Custom cursor (00:16 onward) | Lollipop 3D object follows the cursor on the home page. "DRAG" circle label on carousels. "VIEW" circle on cards. | **Adapt.** Drop the lollipop. Keep contextual cursor labels (DRAG, VIEW, OPEN) as a small ochre circle with mono text. |
| Button style | Outlined pill, white 1px border, text left, small filled circle with a 45 degree arrow on the right. | **Keep.** Colors from our palette. Arrow chip rotates to 90 degrees on hover. |
| Typography | Display: high contrast serif (Didone style) with true italics, used for headlines and numerals. Italic word inside a roman headline for emphasis ("Build A Brand That *Matters*"). Body: Roboto-like sans. Eyebrows: small caps tracked out, sometimes in ( brackets ). | **Adapt.** Our pairing in `02-brand-direction.md`. Keep the italic-emphasis-word trick and the bracketed eyebrow. |
| Dark to light rhythm | Pages alternate ink sections and bone (off-white) sections. Light sections sometimes enter with large rounded top corners (01:19). | **Keep.** |
| Footer (00:36 to 00:38) | "LET'S CONNECT" serif, short line, email pill, 3 social circles. Middle: link columns with serif headings. Right: rounded image card that swaps image on link hover. Bottom: wordmark, badge, description, legal row. | **Adapt.** Same structure. Right card shows our pattern tiles instead of client work, and it reacts to hover on sector links (each sector has its own tile composition). |
| Page transitions (00:47, 00:59, 01:15) | Crossfade with a brief double exposure / blur ghost of the old page, then new page hero text fades in from near-transparent grey to white or black, word by word. | **Adapt.** See motion spec. We use a pattern "disassemble to reassemble" wipe instead of the ghost blur. |

## Home page (00:02 to 00:39)

| Time | Section | What it does | Verdict |
|---|---|---|---|
| 00:02 | Hero | Three line serif headline left ("Build A Brand / That ——— / *Matters*") with a horizontal rule as a typographic element and the last word italic and offset right. Right column: short paragraph + outlined pill button. Aura behind. Bottom: "AS FEATURED IN" logo marquee. | **Adapt.** Keep the 3 line headline with rule and italic word. Drop the press logo marquee (no content). Replace with a quiet mono line: sectors we serve, ticking through. |
| 00:07 | Featured works rail | Edge-bleed horizontal cards, hover reveals title + arrow and category chips, image pans. | **Drop as portfolio.** Rebuild the mechanic as the **Services rail**: 9 service cards, each with a generated abstract visual, hover reveals the service name and one line. |
| 00:12 | Statement + stats | Small intro line, then a huge sans paragraph, then four serif numerals counting up with uppercase labels. | **Adapt statement, drop stats.** Statement paragraph = the "We do not just consult" line. No numerals (no data in profile). |
| 00:15 | "Wonderland" | Centered serif headline, floating 3D toys parallax at the edges, cards tilted in the corners, CTA fades in. | **Adapt.** This becomes the **Approach** teaser: headline centered, our pattern fragments float at the edges and assemble into four pillars as you scroll. |
| 00:18 | Light section | Italic + roman serif headline left, two column body right, outlined CTA. | **Keep.** Used for "Why CTEC" intro. |
| 00:20 | Services accordion | Full-bleed stacked bands, each a different muted color (oxblood, slate, plum, teal, brown, wine, moss, steel, navy). Closed: italic serif title + plus icon. Open: circled number, italic serif title, 3 paragraphs, outlined "Learn More", image card on the right. Open band expands to full height. | **Keep.** 9 services = 9 bands. Our band colors are 9 tints derived from the palette (see `02`). Image card = generated abstract per service. |
| 00:26 | Testimonials | Uppercase serif headline, vertical logo carousel (active logo scales up), big serif quote, name, up/down arrows. | **Drop.** No testimonials. |
| 00:29 | "Brands that trust us" | Logo row. | **Drop.** |
| 00:30 | Drag carousel | "You Can *Expect* That We Are" left, draggable cards right (image top, italic serif claim). DRAG cursor. | **Adapt.** Becomes **Why CTEC**: 5 cards from the profile's "what sets us apart", each with a generated visual. |
| 00:34 | Consultation CTA card | Rounded card with animated gradient border, portrait left, serif headline with italic second line, body, "Book a *Free Brand Consultation*", pill button. | **Adapt.** No portrait. Left side holds an assembling pattern loop. Headline from the Get in Touch copy. |

## Solutions page (00:47 to 01:00)

| Time | Section | What it does | Verdict |
|---|---|---|---|
| 00:47 | Hero | Light page. Serif hero fades in from 5 percent opacity over ~1s. A flowing purple/blue silk ribbon graphic sits bottom right, partially behind text. | **Adapt.** Our ribbon = a rendered pattern "sheet" in ochre/bone, curling. Generated as a transparent PNG (see `03`). |
| 00:52 | Split layout | Photo left, numbered uppercase serif accordion right (1. BRAND TRANSFORMATION PROJECTS, 2. ...). Minus/plus toggles. | **Keep** for Services page: left = generated abstract, right = numbered accordion. |
| 00:53 | Card grid | "Every Part of Your Brand, Built to Matter." Three cards, image top, colored footer bar with italic serif title and arrow chip. Grid scrolls horizontally. | **Adapt** for Sectors: 6 cards, footer color per sector. |
| 00:54 | Scroll reveal statement | Dark section, red spotlight glow at top, "We Build Brands That *Matter*" letters brighten from grey to white as you scroll, then a CTA. | **Keep.** Statement = vision line. Spotlight color = oxblood. |
| 00:58 | Diagram | Hand-drawn style S-curve chart (Sales vs Time) with dashed future line. | **Adapt.** Our four pillar approach as a drawn line diagram that draws itself in. |

## Works page (01:02 to 01:16)

| Time | Section | What it does | Verdict |
|---|---|---|---|
| 01:02 | Fanned deck | "*Featured* Works". Five cards fanned in 3D perspective, center card upright and largest. Hover: card lifts, glass caption panel slides up, VIEW circle follows cursor. | **Adapt** as the **Values deck**: 6 value cards fanned, each with a generated visual. |
| 01:09 | Filter + grid | Industry tag list with superscript counts, search input, "All Solutions" select, 3 column card grid. | **Drop.** |
| 01:10 | Testimonials | Same vertical carousel. | **Drop.** |

## About page (01:17 to 01:33)

| Time | Section | What it does | Verdict |
|---|---|---|---|
| 01:17 | Hero | Serif paragraph as headline with italic emphasis words, then two body columns offset right. | **Keep.** About Us copy. |
| 01:19 | Founder bentos | Light section with rounded top corners. 3 column bento per founder: colored tiles (label, serif title, chips), quote tile, list tiles with icons, large portrait tile with name and bio. | **Adapt** to **Mission + Vision + Values bento**: no people. Tiles hold vision, mission, and the six values with Phosphor icons. |
| 01:27 | Our Approach | Dark section, oxblood spotlight top center, bracketed eyebrow, serif title, one line. Then a pinned horizontal scroll: five tilted polaroid cards (01 / 05, category chip, image, serif title, short line) slide in from the right as you scroll down. | **Keep.** Four pillar cards. This is the strongest section for CTEC. |
| 01:29 | Our Crew | Photo rail. | **Drop.** |
| 01:32 | Partners + awards | Light section, headshot grid, awards logo marquee. | **Drop.** |

## Resources page (01:34 to 01:49)

| Time | Section | What it does | Verdict |
|---|---|---|---|
| 01:40 | Resources hero | Light, italic + roman serif, search pill, stats, tab filters, sidebar categories, card grid. | **Drop.** No resources content. Could return later as an Insights page. |

## What the site will actually contain

Pages: **Home**, **Services**, **Approach**, **Sectors**, **About**, **Contact**. Six pages, all built from the profile.

Sections that exist on the inspo but are dropped for CTEC: press logos, works portfolio, stats counters, testimonials, client logos, founder profiles, crew, partners, awards, resources, ticker, search.
