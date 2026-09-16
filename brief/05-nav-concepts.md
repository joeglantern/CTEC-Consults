# Navigation: replacing the text dropdown

The inspo's hover dropdown (frames 00:40 to 00:46) is a rounded panel with a serif category label and columns of plain links. Problems: it is text only, hover based (dead on touch), it covers the hero, and it looks like every SaaS site. Three replacements, ranked.

## Option A (recommended): Full screen overlay with live image panel

Trigger: the nav pill links go straight to pages. A "Menu" item (hamburger icon + mono label) opens the overlay. On mobile, the bottom bar's Menu button opens the same overlay.

Layout (desktop):
- Left 40 percent: four Fraunces links at 96px, stacked, each prefixed with a mono number (01 to 04). Below: small links Contact, WhatsApp, Email in Hanken. Bottom: email, phone, "Nairobi, Kenya" in mono.
- Right 60 percent: one large rounded image panel (24px radius). Default shows the S3 pattern sheet drifting. Hovering a link crossfades the panel to that page's composition: Services shows the nine S7 visuals as a tight mosaic, Approach shows the four S6 objects locking, Sectors shows the six S8 visuals as a strip, About shows the values deck. A one line mono caption sits under the panel describing the page in the writer's words.
- Close: X circle top right, Esc key, click outside the columns.

Motion: overlay wipes in as a pattern disassembly (see `06`), links stagger in from below over 400ms with 40ms between each, image panel scales from 0.96 to 1 with a 20px blur to 0. Closing reverses in half the time.

Mobile: single column. Image panel on top (16:10), links below at 48px, contact block at the bottom. Panel updates on tap-hold or simply shows the page image once a link gets focus.

Why this: works on touch, shows the site's visual language before you click, gives the pattern system a stage, and it is the pattern high end studios use (Locomotive, Off+Brand, Basement) without copying them.

## Option B: Pill expands into a horizontal image strip

Hover or tap on "Services" in the pill and the pill itself grows downward into a wide panel (same gradient border) containing a horizontal strip of nine small cards (S7 visual + service name). Sectors does the same with six. Approach and About are direct links.

Pros: stays close to the inspo, quick to scan. Cons: still hover-first, gets crowded with nine items, weak on mobile (falls back to a sheet).

Use this only if Liban wants the dropdown feel kept.

## Option C: Command palette style

Cmd/Ctrl+K or the search icon opens a centered floating card: type to filter pages, services and sectors, each result shows a tiny visual thumbnail. Gen z tech flavour.

Pros: distinctive. Cons: bad primary nav for consultancy clients (government, NGO staff) who are not power users. Could be an extra, never the main nav.

## Decision

Build **A**. Keep the pill with direct links plus Menu. Prototype Option B only if A feels too heavy after the design pass.

## Mobile bottom bar spec

Height 64px, graphite, 1px ash top border, safe area padding. Five items: Home (mark icon), Services, Approach, Sectors, Menu. Active item gets an ochre dot above the icon. Tapping Menu opens Option A overlay. The bar hides on scroll down and returns on scroll up, same as the docked pill on desktop.
