# Content audit against the company profile

Run on 16 September against `CTEC Consults Company Profile.docx`, extracted fresh from the document
rather than from any earlier transcription. Every user-visible string in `site/src/content/site.ts`
(200 of them) was compared against the document.

## Result: no conflicts

| Check | Result |
|---|---|
| Numbers, stats, counts, years, percentages anywhere in site copy | none, at all |
| The nine services | all nine match the document name for name |
| The six sectors | all six match word for word |
| The six core values | all six match by name, bodies are faithful rephrasings |
| The four approach pillars and their bullets | faithful to the diagram inside the document |
| The five differentiators | all five match, compressed but not altered |
| Email, website, phone, location | all four identical to the document |
| Named entities on the site | every one traceable to the document, bar the three noted below |
| Invented clients, partners, awards, certifications, team members | none |

The word-level comparison surfaced ordinary English that the writer used to rephrase, which is expected.
No word carried a claim the document does not make.

## Three things to confirm with CTEC

1. **The ESG service line is incomplete in the document.** It reads "Embed strong governance, ethical
   leadership, and ESG integration" and stops. The site completes it as "We embed strong governance,
   ethical leadership, and ESG integration into how you operate." That adds no capability, it only closes
   the sentence, but the real ending should come from CTEC.

2. **WhatsApp.** The site offers a WhatsApp button built from the phone number in the document. The
   document does not say that number is on WhatsApp. Confirm before launch or the button gets removed.

3. **The domain.** `robots.txt`, `sitemap.xml` and the social tags all assume
   `https://www.ctecconsults.com`, taken from the document. If the live domain differs, those three
   files and `index.html` need the real one.

## Note on the legal pages

`/privacy` and `/terms` necessarily contain text that is not in the profile, because the profile says
nothing about data handling. They describe only what the site actually does and they describe the company
exactly as the profile does, "a management and development consultancy based in Nairobi, Kenya". They
still need a lawyer's read before launch.
