# Copy brief for the writer

You are writing every word on the CTEC Consults website. The design is already planned (read `01` for the section structure and `04` for the per page layout). Your job is to make the words feel like a sharp person wrote them for a specific company, not like a template with the company name swapped in.

## The one rule

**Only facts from `content/company-profile-source.md`.** You can cut, compress, reorder, rephrase, turn a paragraph into a headline, turn a bullet into a sentence. You cannot add a year, a number, a client, a country beyond Kenya and "Africa and beyond", a quote, a person, an award, or a capability that is not in the profile. If the profile is silent, the site is silent. The ESG service line is incomplete in the source; write only what exists and add a note flagging it.

## Voice

- A senior consultant who is good at their job and does not need to oversell. Plain, direct, warm.
- Short sentences. Vary the rhythm. One idea per sentence.
- Speak to the reader as "you" and the firm as "we". Never "CTEC Consults believes" in body copy; the About page can name the firm once.
- Specific over grand. "We map who holds power over the outcome" beats "we understand stakeholders".
- Confident verbs. Design, build, map, test, deliver, hand over.
- Kenyan English spellings are fine (organisation, programme) but be consistent; the profile uses American (organization). Pick American and stick to it.

## Banned

- Em dashes. Use a period, a comma, or a colon.
- These words and their cousins: unlock, seamless, elevate, empower, leverage, cutting edge, world class, holistic, synergy, robust, solutions provider, passionate, journey, ecosystem, innovative (as a filler adjective; "innovation" as a noun from the profile is fine), transformative (once, in About, if it comes straight from the source).
- Rhetorical questions as headlines.
- Three item lists of adjectives ("strategic, innovative, and impactful").
- Exclamation marks.
- "In today's fast paced world" or any opener about the world changing.
- Titles like "Welcome to" or "Discover".

## Typography awareness

Headlines are set in a high contrast serif (Fraunces) at very large sizes with one word in italic for emphasis. Write headlines that survive that treatment: 3 to 7 words, one word worth italicising (mark it with `*asterisks*`). Avoid words that look bad huge (lots of ascenders in a row, all caps acronyms). Body is a clean sans at 18px, 60 characters per line, so paragraphs of 2 to 4 sentences.

Eyebrows are 12px mono in brackets, 1 to 3 words, uppercase in the design (write them in sentence case, the CSS handles caps).

## Deliverables

Write one md file per page into `brief/copy/`. Use this structure so the designer can map it directly:

```
# Page name

## Section: <section name from 04>
eyebrow: ( ... )
headline: ... *italic word* ...
body: ...
cta: ...
```

Pages and what each needs:

### home.md
1. Hero: eyebrow, 3 line headline (line 2 ends before the rule, line 3 is the italic word), one paragraph (max 45 words), primary CTA label.
2. Services rail: eyebrow, section headline, then for each of the 9 services a name (as in the profile) and a one line hook (max 14 words), plus a "see all" label.
3. Statement: one paragraph (max 35 words) built from "We do not just consult..."
4. Approach teaser: eyebrow, headline, one line, CTA.
5. Why CTEC: eyebrow, headline with italic word, intro (max 30 words), then 5 card titles (max 5 words) and 5 lines (max 20 words) from the "what sets us apart" bullets.
6. Accordion: for each of the 9 services: title, the full description reworked into 1 to 2 short paragraphs (max 70 words total), a CTA label.
7. Sectors: eyebrow, headline, one line, then 6 sector names and a one line each (max 12 words).
8. Contact card: headline with italic second line, one paragraph (max 30 words), CTA label.

### services.md
Hero headline + paragraph, numbered list titles, the 9 descriptions (can reuse from home), statement reveal line (from the mission, max 25 words), diagram labels (4 pillar names, 2 words each), closing CTA.

### approach.md
Hero eyebrow + headline + intro (from "Our Approach" paragraph, max 50 words), 4 cards: pillar name, a one line framing (max 12 words), the 3 bullets rephrased as short lines (max 6 words each), closing full width line (from "Backed by technology at every step").

### sectors.md
Hero headline + intro line, 6 sectors each with a one paragraph description (max 45 words). The profile gives only names, so describe what CTEC brings to each sector using only services and approach language from the profile, no invented sector facts. Closing CTA.

### about.md
Hero: the About Us first paragraph as a headline paragraph (max 40 words, mark 3 italic words), then paragraphs two and three reworked into two short columns (max 60 words each). Vision line, mission line (verbatim or lightly trimmed). Six values: name + line (max 18 words). Values deck captions (max 8 words each). Closing CTA.

### contact.md
Headline with italic word, one paragraph (max 35 words), form field labels and placeholder text, the four contact details, a WhatsApp CTA label, a thank you state (max 20 words), an error state (max 12 words).

### global.md
Nav labels, menu overlay captions (one line per page, max 10 words), footer: heading, one line, column headings, legal line, one line company description (max 20 words), loader label, 404 headline and line, meta titles and descriptions per page (title max 60 chars, description max 155 chars).

## Process

1. Read `content/company-profile-source.md` twice.
2. Read `01-inspo-breakdown.md` sections marked Keep and Adapt so you know what the words sit inside.
3. Draft `home.md` first and stop. Post it back so Liban can check the voice before you do the rest.
4. Then the remaining pages.
5. Run your own pass for banned words and em dashes before delivering. Search the files for the em dash character, unicode U+2014, and for each banned word.
