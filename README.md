# CTEC Consults

Marketing site for CTEC Consults Limited, a management and development consultancy in Nairobi.

## Running it

```bash
cd site
npm install
npm run dev
```

Build with `npm run build`. Output goes to `site/dist`.

## Stack

Vite, React and TypeScript, with client side routing so URLs stay clean. GSAP and Lenis drive the
scrolling and the pinned sections. Three.js handles the 3D mark on the approach page and the particle
fields in the footer and the contact card, both lazy loaded so they never touch the initial bundle.
The section labels use plain 2D canvas.

## Layout

```
site/          the app
  src/content  all copy and data in one place
  public/      video, stills, models, icons
  scripts/     favicon and social card generation
brief/         planning docs, prompts and the approved copy
```

## Content rule

Every word on the site comes from the company profile. Nothing is invented: no statistics, no client
names, no awards. `brief/14-content-audit.md` has the full check against the source document.

## Before launch

- Partner logos are pending the list from CTEC. The hero strip stays hidden until then.
- The contact form currently opens the visitor's own mail client. It needs a real endpoint.
- The privacy policy and terms need a lawyer's read.
- `robots.txt`, `sitemap.xml` and the social tags assume www.ctecconsults.com.
