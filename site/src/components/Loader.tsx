import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { reduceMotion } from "../hooks/useReveal";
import { assetsReady } from "../boot";
import { silence } from "../video";
import "./Loader.css";

const COLS = 12;
const ROWS = 7;
const shapes = [
  "M0 0 H100 A100 100 0 0 1 0 100 Z",
  "M100 0 V100 A100 100 0 0 1 0 0 Z",
  "M0 100 V0 A100 100 0 0 1 100 100 Z",
  "M100 100 H0 A100 100 0 0 1 100 0 Z",
  "M0 100 L0 0 L100 100 Z",
  "M100 0 L100 100 L0 0 Z",
];

/** Plays on every load or refresh of the home page. Direct loads of other pages skip it. */
export function Loader({ start, onDone }: { start: boolean; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [skip] = useState(() => window.location.pathname !== "/" || reduceMotion());
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (skip) { onDone(); return; }
    // hold on the plain ink field until the boot screen has handed over, so the
    // first beat of the animation is never played behind something else
    if (!start) return;
    const el = root.current!;
    const tiles = el.querySelectorAll<HTMLElement>(".ld-tile");
    const grid: [number, number] = [ROWS, COLS];
    // the heavy assets load while this plays; the curtain waits for them, not the
    // other way round, so the intro always runs in full and never covers a page
    // that is not ready yet
    const gate = assetsReady(window.location.pathname);
    const tl = gsap.timeline({ onComplete: () => { setDone(true); onDone(); } });

    tl.set(tiles, { opacity: 0, scale: 0.3, rotate: -90 })
      // tiles flip in as a wave from the centre
      .to(tiles, { opacity: 0.22, scale: 1, rotate: 0, duration: 0.7, ease: "power3.out", stagger: { each: 0.035, from: "center", grid } }, 0)
      // a second wave: each tile quarter-turns, a ripple of ochre passes through
      .to(tiles, { rotate: 90, duration: 0.6, ease: "power2.inOut", stagger: { each: 0.025, from: "center", grid } }, 0.9)
      .to(tiles, { color: "#E0A030", duration: 0.25, ease: "power1.inOut", stagger: { each: 0.025, from: "center", grid }, yoyo: true, repeat: 1 }, 0.9)
      // ink blooms up behind the mark
      .call(() => { const v = el.querySelector<HTMLVideoElement>(".ld-ink"); if (v) { v.currentTime = 0; v.play().catch(() => {}); } }, [], 0.95)
      .fromTo(".ld-ink", { opacity: 0, scale: 1.2 }, { opacity: 0.85, scale: 1, duration: 0.8, ease: "power2.out" }, 0.95)
      // the mark rises from the centre
      .fromTo(".ld-mark", { scale: 0.6, opacity: 0, filter: "blur(10px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }, 1.15)
      // tiles scatter outward and fade
      .to(tiles, {
        opacity: 0, scale: 0.4, duration: 0.6, ease: "power3.in",
        x: (i) => ((i % COLS) - (COLS - 1) / 2) * 60,
        y: (i) => (Math.floor(i / COLS) - (ROWS - 1) / 2) * 60,
        stagger: { each: 0.02, from: "center", grid },
      }, 1.9)
      // hold here if the page still is not ready, so the lift never reveals a half
      // dressed page. The mark breathes while it waits rather than sitting frozen.
      .addPause(2.5, () => {
        let settled = false;
        const breathe = gsap.to(".ld-mark", { opacity: 0.55, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gate.then(() => {
          if (settled) return;
          settled = true;
          breathe.kill();
          gsap.set(".ld-mark", { opacity: 1 });
          tl.play();
        });
      })
      // curtain lifts, mark rides with it
      .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 2.55)
      .fromTo("main", { scale: 1.04, transformOrigin: "50% 0%" }, { scale: 1, duration: 1.1, ease: "power3.out", clearProps: "all" }, "<");
    return () => { tl.kill(); };
  }, [skip, start, onDone]);

  if (skip || done) return null;
  return (
    <div ref={root} className="loader" aria-hidden="true">
      {/* a loader sized cut of the ink: 270 KB against the full clip's 9.8 MB. The full
          one cannot buffer inside the two seconds this is on screen, which is why it
          used to sit on its first frame on a phone. */}
      <video ref={silence} className="ld-ink" src="/video/cgi-ink-loader.mp4" muted playsInline autoPlay loop preload="auto" />
      <div className="ld-grid">
        {Array.from({ length: COLS * ROWS }).map((_, i) => (
          <span key={i} className="ld-tile">
            <svg viewBox="0 0 100 100"><path d={shapes[(i * 7 + Math.floor(i / COLS)) % shapes.length]} fill="currentColor" /></svg>
          </span>
        ))}
      </div>
      <img className="ld-mark" src="/logo.svg" alt="" width="120" height="120" />
    </div>
  );
}
