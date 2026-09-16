import { useEffect, useRef } from "react";
import { reduceMotion } from "../hooks/useReveal";
import "./Eyebrow.css";

/**
 * Section label as an index entry: a small ochre counter, the label formed from particles in the mono
 * face, and a hairline that draws out to the column edge. The counter numbers labels in page order.
 *
 * The particles are a 2D canvas, not WebGL: cheap enough to run a dozen per page. The word is rasterised
 * once, sampled into a few hundred points, and those points gather from a loose scatter when the label
 * enters the viewport, breathe once formed, part for the cursor and settle. The loop sleeps when the
 * label is still and unhovered, so an idle page costs nothing.
 */
type Props = { children: string; className?: string; n?: string; numbered?: boolean };

const FONT = '500 15px "Geist Mono", ui-monospace, Menlo, monospace';
const TRACK = 0.16;   // letter spacing, em
const GAP = 1.25;     // sampling step in css px, smaller is denser
const DOT = 1.15;     // point radius in css px

export function Eyebrow({ children, className = "", n, numbered = true }: Props) {
  const root = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const text = children.toUpperCase();

  useEffect(() => {
    const el = root.current, cv = canvas.current;
    if (!el || !cv) return;
    const reduced = reduceMotion();

    // page-order counter
    if (numbered && num.current && !n) {
      const all = Array.from(document.querySelectorAll<HTMLElement>(".eb"));
      num.current.textContent = String(all.indexOf(el) + 1).padStart(2, "0");
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = cv.getContext("2d")!;
    // the word is drawn in the page's text colour, not the muted label grey, so it holds over footage and paper
    const onLight = !!el.closest(".on-light");
    const color = onLight ? "rgba(12,13,11,0.92)" : "rgba(241,236,226,0.92)";
    const accent = "#E0A030";
    let disposed = false;
    let cleanup = () => {};

    // the word is rasterised once the mono face is ready, but never waits longer than a moment for it:
    // a slow or failed font load falls back to the system mono rather than leaving the label empty
    Promise.race([
      document.fonts.load(FONT).catch(() => {}),
      new Promise((r) => setTimeout(r, 800)),
    ]).then(() => { if (!disposed) cleanup = build(); });

    const build = () => {
    // measure and rasterise the word once
    ctx.font = FONT;
    const chars = text.split("");
    const track = 15 * TRACK;
    const widths = chars.map((c) => ctx.measureText(c).width);
    const textW = widths.reduce((a, w) => a + w, 0) + track * (chars.length - 1);
    const W = Math.ceil(textW + 8), H = 24;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + "px"; cv.style.height = H + "px";

    const off = document.createElement("canvas");
    off.width = W * 3; off.height = H * 3;
    const og = off.getContext("2d", { willReadFrequently: true })!;
    og.scale(3, 3);
    og.font = FONT; og.fillStyle = "#fff"; og.textBaseline = "middle";
    let x = 4;
    chars.forEach((c, i) => { og.fillText(c, x, H / 2 + 0.5); x += widths[i] + track; });
    const data = og.getImageData(0, 0, off.width, off.height).data;
    const home: number[] = [];
    const step = GAP * 3;
    for (let py = 0; py < off.height; py += step) {
      for (let px = 0; px < off.width; px += step) {
        const i = ((py | 0) * off.width + (px | 0)) * 4 + 3;
        if (data[i] > 100) home.push(px / 3, py / 3);
      }
    }
    const N = home.length / 2;
    const pos = new Float32Array(N * 2), vel = new Float32Array(N * 2), from = new Float32Array(N * 2);
    const seed = new Float32Array(N), acc = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      from[i * 2] = home[i * 2] + (Math.random() - 0.5) * 120;
      from[i * 2 + 1] = home[i * 2 + 1] + (Math.random() - 0.5) * 60;
      pos[i * 2] = from[i * 2]; pos[i * 2 + 1] = from[i * 2 + 1];
      seed[i] = Math.random() * Math.PI * 2;
      acc[i] = Math.random() < 0.1 ? 1 : 0;
    }

    const state = { p: reduced ? 1 : 0, mx: -999, my: -999, t: 0, hot: false };
    let raf = 0, last = performance.now(), visible = false, entered = reduced;
    const R = 22, PUSH = 3.2, SPRING = 30, DAMP = 9;

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < N; i++) if (!acc[i]) { ctx.moveTo(pos[i * 2] + DOT, pos[i * 2 + 1]); ctx.arc(pos[i * 2], pos[i * 2 + 1], DOT, 0, Math.PI * 2); }
      ctx.fill();
      ctx.fillStyle = accent;
      ctx.beginPath();
      for (let i = 0; i < N; i++) if (acc[i]) { ctx.moveTo(pos[i * 2] + DOT, pos[i * 2 + 1]); ctx.arc(pos[i * 2], pos[i * 2 + 1], DOT, 0, Math.PI * 2); }
      ctx.fill();
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.033); last = now; state.t += dt;
      if (entered && state.p < 1) state.p = Math.min(1, state.p + dt / 1.1);
      const e = 1 - Math.pow(1 - state.p, 3);
      let energy = 0;
      for (let i = 0; i < N; i++) {
        const o = i * 2, s = seed[i];
        const tx = from[o] + (home[o] - from[o]) * e + Math.sin(state.t * 1.1 + s) * 0.25 * e;
        const ty = from[o + 1] + (home[o + 1] - from[o + 1]) * e + Math.cos(state.t * 0.9 + s * 1.3) * 0.25 * e;
        let ax = (tx - pos[o]) * SPRING - vel[o] * DAMP, ay = (ty - pos[o + 1]) * SPRING - vel[o + 1] * DAMP;
        const dx = pos[o] - state.mx, dy = pos[o + 1] - state.my, d2 = dx * dx + dy * dy;
        if (d2 < R * R) { const d = Math.sqrt(d2) || 0.01, f = (1 - d / R) * PUSH * 60; ax += (dx / d) * f; ay += (dy / d) * f; }
        vel[o] += ax * dt; vel[o + 1] += ay * dt; pos[o] += vel[o] * dt; pos[o + 1] += vel[o + 1] * dt;
        energy += Math.abs(vel[o]) + Math.abs(vel[o + 1]);
      }
      draw();
      // sleep once settled and unhovered; the breath is small enough to freeze without anyone noticing
      const busy = state.p < 1 || state.hot || energy / N > 0.6;
      if (busy && visible && !reduced) raf = requestAnimationFrame(tick);
    };
    // a frame is pending iff raf is non-zero; that is the only source of truth for "running"
    const wake = () => { if (raf === 0 && visible && !reduced) { last = performance.now(); raf = requestAnimationFrame(tick); } };

    if (import.meta.env.DEV) (el as unknown as { __eb?: unknown }).__eb = { tick, enter: () => { entered = true; visible = true; el.classList.add("is-in"); } };
    const onMove = (ev: PointerEvent) => { const r = cv.getBoundingClientRect(); state.mx = ev.clientX - r.left; state.my = ev.clientY - r.top; state.hot = true; wake(); };
    const onLeave = () => { state.mx = -999; state.my = -999; state.hot = false; wake(); };
    if (!reduced) { cv.addEventListener("pointermove", onMove, { passive: true }); cv.addEventListener("pointerleave", onLeave); }
    // forming is triggered by visibility, which also fires for labels already on screen at load
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !entered) { entered = true; el.classList.add("is-in"); }
      if (visible) wake();
    }, { threshold: 0.1 });
    io.observe(el);
    draw();
    if (reduced) { visible = true; el.classList.add("is-in"); }
    // watchdog: whatever the observer does, a label that is on screen and not yet formed gets its loop started
    const onScreen = () => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight && r.width > 0; };
    const dog = window.setInterval(() => {
      if (reduced) { window.clearInterval(dog); return; }
      if (onScreen()) { visible = true; if (!entered) { entered = true; el.classList.add("is-in"); } if (state.p < 1) wake(); }
      if (state.p >= 1) window.clearInterval(dog); // formed once, the observer handles everything after
    }, 500);

    return () => { io.disconnect(); window.clearInterval(dog); cancelAnimationFrame(raf); cv.removeEventListener("pointermove", onMove); cv.removeEventListener("pointerleave", onLeave); };
    };

    return () => { disposed = true; cleanup(); };
  }, [text, n, numbered]);

  return (
    <span ref={root} className={`eb ${className}`} role="heading" aria-level={6}>
      {numbered && <span ref={num} className="eb-num mono" aria-hidden="true">{n ?? ""}</span>}
      <span className="eb-word">
        <canvas ref={canvas} className="eb-canvas" aria-hidden="true" />
        <span className="sr-only">{children}</span>
      </span>
    </span>
  );
}
