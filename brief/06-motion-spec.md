# Motion spec

Build stack (decided by Liban, 16 Sep 2026): **Vite + React**, client side routing with React Router so URLs are clean (`/services`, `/approach`, `/sectors`, `/about`, `/contact`, no `.html`). Motion: GSAP + ScrollTrigger + Lenis (smooth scroll), a small Canvas layer for the pattern field, CSS for everything simple. Page transitions run on route change via a transition layer that lives outside the router outlet. Deploy target must serve `index.html` for every path (SPA fallback).

Motion tells one story on this site: fragments assemble into structure. Every transition, loader and reveal is a version of that.

## Easing and timing tokens

| Token | Value | Use |
|---|---|---|
| `ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Reveals, entrances |
| `ease-in-out-slow` | `cubic-bezier(0.65, 0, 0.35, 1)` | Page transitions, panel moves |
| `ease-snap` | `cubic-bezier(0.5, 0, 0.1, 1)` | Tiles locking into place |
| `dur-xs` | 180ms | Hover states |
| `dur-s` | 400ms | Element reveals |
| `dur-m` | 700ms | Section reveals, accordion |
| `dur-l` | 1100ms | Page transitions |
| `stagger` | 40ms | Between siblings, max 12 items then batch |

Nothing uses spring or bounce easing. Nothing scales beyond 1.04.

## 1. Loader (first visit per session)

1. Ink screen. Four C fragments start off screen at the four compass points.
2. 0 to 900ms: fragments fly in with `ease-snap`, slight overshoot of 2 percent, lock into the C. As each seam closes, a 2px ochre line flashes along it and fades (200ms).
3. 900 to 1300ms: the assembled C holds, mono label "CTEC" fades in beneath, a thin ochre progress hairline under the label fills to match real asset load progress (min display 1.3s, max 3s, then proceed regardless).
4. Exit: the C scales to 0.9 and disassembles outward into the hero's pattern field (the four fragments become four of the thousands of tiles), while the hero fades in. This is the join between loader and V1 field. 700ms.

Fallback: V2 video plays on devices without WebGL. Reduced motion: static mark, 600ms fade.

## 2. Pattern field (hero backdrop)

Canvas of about 800 flat tiles (quarter arcs and triangles) on ink. Idle: slow drift (0.2px per frame), slight rotation. Every 14 seconds a "lock" event: tiles ease to grid positions over 2s (`ease-snap`), hold 3s, release with `ease-out-soft` over 2.5s. Mouse: tiles within 160px repel gently. Scroll: field parallaxes at 0.4x and fades to 0 by the end of the hero. Tile color bone at 60 percent, 6 percent of tiles ochre.

Mobile: 300 tiles, no mouse repel, same lock cycle. Reduced motion or low power: V1 poster frame.

## 3. Page transitions

Leave: the current page's content fades to 40 percent (300ms) while a field of tiles sweeps in from the right edge and assembles into a solid ink wall covering the viewport (500ms, `ease-in-out-slow`). The docked nav pill stays in place throughout (it lives outside the transition layer).
Enter: the wall disassembles, tiles sweeping out to the left (500ms), revealing the new page with its hero already positioned. New hero headline then does the word reveal.
Total about 1100ms. Scroll position resets during the wall.

## 4. Text reveals

- Headlines: split by word, each word starts at `opacity 0.08` (ash) and `translateY 12px`, animates to bone with `ease-out-soft` `dur-s`, stagger 40ms. Italic emphasis word comes last with a 120ms extra delay.
- Statement reveal (mission line): letters bound to scroll progress. At section top all letters are ash; as the section moves through the viewport letters brighten left to right. Oxblood spotlight at top scales from 0.8 to 1 over the same range.
- Body paragraphs: single fade up, `dur-s`.
- Eyebrows: brackets draw in from the center outward, text fades, 300ms.

## 5. Nav

- Header pill: at scroll > 120px it undocks. The pill scales to 0.94, fades out (200ms), then fades and scales back in at bottom center (250ms). Reverse on scroll to top. The up arrow circle and WhatsApp circle slide in from behind the pill.
- Active link: an ochre dot slides between items (layout animation, 300ms).
- Overlay open: see `05`. The wall wipe from page transitions is reused, then links stagger in.
- Bottom bar (mobile): translateY 100 percent on scroll down, back on scroll up, 250ms.

## 6. Section choreography

- **Services rail**: cards enter with 24px translateX from the right, stagger 60ms, clip-path inset reveal. Hover: image scales 1.04 over 700ms, caption panel slides up 100 percent, arrow chip rotates 45 degrees. Rail is draggable with inertia, and the wheel scrolls it horizontally when the section is pinned.
- **Approach teaser**: the four S6 objects float at the corners with a 6s sine hover. Scroll progress 0 to 1 across the section moves them to center and rotates them to zero, at 1 they are touching and a seam glow fires once.
- **Why CTEC drag rail**: cards drag with inertia and snap to nearest. The cursor becomes the DRAG circle inside the rail.
- **Accordion**: height auto via GSAP, `dur-m`. The band color extends to full bleed as it opens, the number circle draws its stroke, the image card slides in from 24px right. Only one band open at a time. Plus icon rotates to a minus.
- **Sectors cards**: staggered reveal, hover tilts 2 degrees toward the cursor (max), footer bar color brightens 8 percent.
- **Approach pinned scroll**: section pins for 4 viewport heights. Cards translateX from 120vw to their final fanned positions, one per viewport height. Backdrop V4 loops. Each card's tilt is fixed at minus 4, 2, minus 2, 4 degrees. Progress hairline at the bottom in ochre. On mobile: no pin, cards are a snap scrolling horizontal rail.
- **Values deck**: cards fan from a stacked pile on enter (rotate from 0 to their fan angles, 700ms). Hover on a card lifts it 16px and brings the glass caption panel up. Arrow keys and swipe rotate the deck.
- **Contact card**: gradient border is a rotating conic gradient (12s loop). Card lifts 4px on hover.
- **Footer image card**: crossfade between pattern compositions on link hover, 400ms.

## 7. Cursor

Desktop only. Default: a 10px ochre dot with 80ms lag. Over links: grows to 40px ring. Over rails: becomes a 72px ochre circle with mono DRAG. Over cards: VIEW. Over the accordion: OPEN or CLOSE. Hidden when the OS cursor leaves the window.

## 8. Performance and responsiveness rules

- All animation on `transform` and `opacity` only. No animating layout properties except accordion height (which is GSAP measured).
- Pattern field canvas capped at 60fps, drops to 30fps when the tab is hidden or on battery saver.
- Videos: `preload="metadata"`, poster frames, `playsinline`, muted, loop, and paused when off screen via IntersectionObserver. Serve WebM + MP4, max 2.5MB each.
- Fonts: Fraunces and Hanken Grotesk as variable woff2, subset to Latin, `font-display: swap`, headline sizes use `clamp()`.
- Breakpoints: 360, 640, 900, 1200, 1440, 1920. Test at all of them plus iPad portrait and landscape.
- `prefers-reduced-motion`: loader becomes a fade, field becomes the poster, pinned sections unpin, staggers become single fades, cursor is the OS cursor.
- Lighthouse targets: Performance 90+, Accessibility 100, no CLS from the loader (reserve the hero height before it exits).


## Section labels, revised 16 Sep (replaces the glyph + decode + hairline treatment)

Every section label is an index entry: a small ochre counter in mono (numbered in page order, so a page
reads 01, 02, 03 down its length), the label itself formed from particles in Geist Mono uppercase, and a
hairline that draws out to the column edge. The particles gather from a loose scatter when the label
enters the viewport (about 1.1 s), breathe once formed, part for the cursor within a 22 px radius, and
settle. No brackets, no decode, no travelling dot. Implementation is a 2D canvas per label
(`site/src/components/Eyebrow.tsx`), a few hundred points each, and the loop sleeps when the label is
still and unhovered. Reduced motion draws the word settled with no animation. A visually hidden span
carries the real text for screen readers.
