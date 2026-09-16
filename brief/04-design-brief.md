# Design brief

How this works: The design canvas produces a multi-artboard canvas published as an artifact. You (Liban) open it, click any element, edit text, nudge layout, save versions. When you are happy, the artboards come back as the build reference. Motion cannot be shown on the canvas, so motion intent is described in annotations and lives in `06-motion-spec.md` for the build.

## Attach to every design canvas prompt

1. `brief/02-brand-direction.md`
2. `brief/copy/<page>.md` (from the writer)
3. `brief/assets/logo/` PNGs
4. `brief/assets/shapes/` PNGs (at minimum S1, S3, S5)
5. `brief/refs/` frames listed in `03-asset-manifest.md`
6. The page prompt below

## Master prompt (paste first, then the page prompt)

```
You are designing the marketing website for CTEC Consults Limited, a technology driven management and development consultancy in Nairobi, Kenya. Use only the copy in the attached copy files; do not add placeholder claims, stats, logos, testimonials or team members.

Design system (attached brand direction, use these exact tokens):
- Colors: ink #0C0D0B, graphite #181917, ash #2A2B27, bone #F1ECE2, parchment #E4DDCF, mist #9A9B92, ochre #E0A030 (accent, max 10 percent of any screen), moss #3A6B4A, oxblood #7A2E2E.
- Type: Fraunces for display (italic for emphasis words and accordion titles), Hanken Grotesk for body and UI, Geist Mono for eyebrows and numbers. Eyebrows are 12px uppercase tracked out and wrapped in brackets like ( OUR APPROACH ).
- Shape: pills 999px, cards 24px, 1px ash borders on dark, 1px parchment borders on light, 8px spacing unit, 1440px container, 40px gutters desktop, 20px mobile.
- Buttons: outlined pill, label left, small filled ochre circle with a 45 degree arrow on the right.

Mood: dark editorial with warm neutrals, like a printed annual report that came alive. Alternate ink sections and bone sections. A slow blurred aura of ochre, oxblood and moss drifts behind dark sections. Grain on all dark backgrounds. The recurring visual motif is a set of geometric fragments (quarter arcs and triangles, attached as PNGs) that assemble into structure; use them as the only illustration language. No photography of people. No icons other than Phosphor duotone.

Navigation: a centered dark pill with a thin ochre to oxblood gradient border containing Services, Approach, Sectors, About. Logo mark left. Right: a round WhatsApp button and an outlined "Start a conversation" pill. Show the pill also in its docked state at bottom center. Nav opens a full screen overlay, not a dropdown (see nav artboard).

Responsive: produce desktop (1440) and mobile (390) artboards for every page. Mobile stacks everything, headline sizes drop to the mobile scale in the brand file, the nav pill becomes a bottom bar with four icons and a Menu button.

Tone of the design: confident, quiet, precise. Nothing bounces, nothing glows except the ochre seams on the pattern. Text sizes are large and layouts are asymmetric (headline left, body offset right). Leave generous empty space.
```

## Artboard 1: Global (nav, loader, footer, buttons)

```
Create artboards for the global elements:
1. Loader: ink screen, the four C fragments mid assembly with an ochre seam glow, a 12px mono label "CTEC" beneath. Show three states: fragments apart, fragments locking, complete C.
2. Header at page top: logo mark + "CTEC Consults" wordmark left, centered nav pill, right cluster. On ink.
3. Docked nav: the pill floating at bottom center with an up arrow circle on the left and a WhatsApp circle on the right, over a blurred page behind it.
4. Overlay menu (open state): full screen ink overlay. Left 40 percent: four huge Fraunces links (Services, Approach, Sectors, About) with mono numbers 01 to 04, plus small links Contact, WhatsApp, Email. Right 60 percent: a large rounded image panel showing the pattern composition for the hovered link, with a one line mono caption. Bottom: email, phone, Nairobi, Kenya. Show the hover state for Services.
5. Mobile bottom bar: 5 items, icons with mono labels, Menu opens the same overlay stacked vertically with the image panel above the links.
6. Footer: "Let's talk" in Fraunces, one line, email pill button, WhatsApp and email circles. Middle: three link columns with mono headings (Pages, Services, Sectors). Right: rounded card holding the S3 pattern sheet that swaps to a sector composition on hover. Bottom row: wordmark, one line description, legal, Nairobi, Kenya.
7. Button set: primary (bone outline + ochre chip), on-light variant, ghost variant, hover state (chip rotates, fills), and the contextual cursor labels DRAG, VIEW, OPEN as small ochre circles with mono text.
```

## Artboard 2: Home

```
Design the Home page, desktop and mobile.

Sections in order:
1. Hero (ink). Three line Fraunces headline from the copy file, second line ends with a hairline rule as a typographic element, third line is the italic emphasis word offset right. Right column: the hero paragraph and the primary button. Behind everything the V1 pattern field (use the S3 pattern sheet PNG as a still, low opacity, with the aura on top). Bottom of hero: a single mono line ticking through the six sectors.
2. Services rail (ink). Eyebrow ( WHAT WE DO ), then a horizontal edge bleeding rail of nine cards, each card 480x600 with the S7 visual, hover state showing service name in Fraunces italic and a one line description with an arrow chip. Show two cards in hover state. Under the rail a ghost button "All services".
3. Statement (ink). The "We do not just consult" statement paragraph set huge in Hanken Grotesk, bone, max 20 words per line. No numbers, no stats.
4. Approach teaser (ink to graphite). Centered eyebrow ( OUR APPROACH ), Fraunces headline, one line, primary button. The four S6 pillar objects float at the corners at slight tilts. Annotate: on scroll these travel to the center and lock together.
5. Why CTEC (bone, rounded top corners 48px). Left: Fraunces headline with an italic word, short intro. Right: draggable rail of five cards on parchment, each with an S9 visual on top and the point title in Fraunces italic with its line in Hanken. Show the DRAG cursor label.
6. Services accordion (full bleed bands). Nine stacked bands using the nine band tints from the brand file. Closed band: 96px tall, Fraunces italic title left, plus icon right. Show band 1 open: circled mono number, title, the service paragraph, ghost button, and the S7 visual in a rounded card on the right. Open band height about 640px.
7. Sectors (ink). Eyebrow ( WHO WE WORK WITH ), headline, six cards in a horizontal grid, each: S8 visual on top, colored footer bar with Fraunces title and arrow chip.
8. Contact card (ink). Centered rounded card 1200x520 with an animated ochre to oxblood gradient border. Left 40 percent: V3 poster frame (pattern with one ochre tile). Right: Fraunces headline with an italic second line, one paragraph, primary button "Start a conversation", and beneath it email and phone in mono.
9. Footer.
```

## Artboard 3: Services

```
Design the Services page, desktop and mobile.
1. Hero (bone). Fraunces headline with an italic word, left. Right: intro paragraph. Bottom right: the S5 curling pattern ribbon partly behind the text, cropped by the page edge.
2. Split section (bone). Left 50 percent: a sticky rounded image card that changes per open item (use S7). Right: numbered accordion of nine services, uppercase Fraunces titles with mono numbers 01 to 09, plus and minus toggles, open item shows the paragraph and a ghost button.
3. Statement reveal (ink, oxblood spotlight from top). The mission line set in Fraunces, centered, with the last two words italic. Annotate: letters brighten from ash to bone on scroll.
4. Approach diagram (ink). A single continuous hairline path with four nodes labelled by the pillar names in mono, drawn as if by hand. Annotate: draws itself in on scroll.
5. Contact card and footer.
```

## Artboard 4: Approach

```
Design the Approach page, desktop and mobile.
1. Hero (ink). Eyebrow ( HOW WE WORK ), Fraunces headline, the approach intro paragraph. The four S6 objects arranged in a loose row beneath.
2. Pinned horizontal scroll (ink, oxblood spotlight top center, V4 poster behind). Four large tilted cards (each rotated between minus 4 and plus 4 degrees), 560x720, parchment background: mono "01 / 04" top left, a mono chip with the pillar name top right, the S6 object in the upper half, Fraunces title, then the three bullet lines from the copy as a short list. Show the cards fanned across the width as if mid scroll. Annotate: cards enter from the right as the user scrolls down, the section is pinned.
3. Closing line (bone). "Backed by technology at every step" style line from the copy, set as a full width Fraunces italic line with a hairline rule above and below.
4. Contact card and footer.
```

## Artboard 5: Sectors

```
Design the Sectors page, desktop and mobile.
1. Hero (bone). Fraunces headline with an italic word, intro line from the copy.
2. Six sector rows, full width, alternating alignment. Each row: sector title in Fraunces (56px), the S8 visual in a rounded card on the opposite side, Phosphor duotone icon in ochre, and the one line from the copy. Row backgrounds are the sector colors at 12 percent tint over bone. Hover state: the visual card tilts 2 degrees and the arrow chip fills.
3. Contact card and footer.
```

## Artboard 6: About

```
Design the About page, desktop and mobile.
1. Hero (ink). The About Us paragraph set as a Fraunces headline (56px) with three emphasis words in italic. Below, offset right, the second and third paragraphs in two Hanken columns.
2. Vision, mission, values bento (bone, 48px rounded top corners). Grid of tiles: Vision tile in oxblood with bone text, Mission tile in moss with bone text, six value tiles on parchment each with a Phosphor duotone icon in ochre, the value name in Fraunces italic and its line in Hanken. Vary tile sizes (2x1, 1x1, 1x2) so it reads as a composed grid, not a table.
3. Values deck (ink). Eyebrow ( WHAT WE STAND FOR ), six cards fanned in perspective, center card upright and largest, using the S10 portrait visuals. Show one card in hover state with a glass caption panel and the VIEW cursor.
4. Why CTEC rail (reuse from Home).
5. Contact card and footer.
```

## Artboard 7: Contact

```
Design the Contact page, desktop and mobile.
1. Ink page. Left 55 percent: Fraunces headline from the copy with an italic word, one paragraph, then a short form: name, organisation, email, sector (select), message, primary button. Inputs are 1px ash borders on graphite, bone text, mono labels above each field, ochre focus ring.
2. Right 45 percent: the V3 poster frame in a tall rounded card, beneath it email, phone, WhatsApp, and "Nairobi, Kenya" in mono with Phosphor icons.
3. Footer.
```

## Handoff back to code

When artboards are approved, the build needs: the artifact URL, any exported PNGs of the artboards, the final `copy/` files, and the `assets/` folder. Motion is built from `06-motion-spec.md`, not from the canvas.
