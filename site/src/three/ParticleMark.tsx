import { useEffect, useRef } from "react";
import * as THREE from "three";
import { reduceMotion } from "../hooks/useReveal";
import "./ParticleMark.css";

/**
 * A field of points that gathers into a shape and morphs between shapes: the CTEC mark, a word set in
 * Fraunces, a glyph. Points are sampled straight from the rendered shape, so a word is the real typeface.
 * The field assembles as its block scrolls into view, breathes once formed, scatters out of the cursor's
 * way like sand and drifts back, and cycles to the next shape on a timer or the moment the cursor enters.
 * One Points draw call, positions integrated on the CPU, paused when off screen.
 *
 * Targets: { kind: "logo" } samples /logo.svg. { kind: "text", text, italic? } renders the text with the
 * site's serif. Lines can be separated with a newline.
 */
export type ParticleTarget = { kind: "logo" } | { kind: "text"; text: string; italic?: boolean };

type Props = {
  targets?: ParticleTarget[];
  /** milliseconds each shape holds before morphing to the next; 0 disables the timer */
  cycle?: number;
  count?: number;
  accent?: string;
  /** width of the widest shape in scene units at the camera distance */
  width?: number;
};

const BONE = new THREE.Color("#F1ECE2");
const S = 360; // sampling canvas size

function sprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.9)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

type Sample = { x: number; y: number; accent: boolean };

/** Draws one target onto an offscreen canvas and returns exactly n points inside it, centred. */
async function sample(target: ParticleTarget, n: number, width: number): Promise<Sample[]> {
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d", { willReadFrequently: true })!;
  const pad = S * 0.06;
  if (target.kind === "logo") {
    const img = new Image();
    img.src = "/logo.svg";
    await img.decode();
    g.drawImage(img, pad, pad, S - pad * 2, S - pad * 2);
  } else {
    const style = target.italic === false ? "normal" : "italic";
    try { await document.fonts.load(`${style} 400 100px "Fraunces"`); } catch { /* fall back to the stack below */ }
    const lines = target.text.split("\n");
    g.fillStyle = "#fff";
    g.textAlign = "center";
    g.textBaseline = "middle";
    // find the largest size where every line fits the width
    let px = 200;
    const family = `"Fraunces", "Iowan Old Style", Georgia, serif`;
    for (; px > 20; px -= 4) {
      g.font = `${style} 400 ${px}px ${family}`;
      const widest = Math.max(...lines.map((l) => g.measureText(l).width));
      if (widest <= S - pad * 2 && px * lines.length * 1.05 <= S - pad * 2) break;
    }
    const lh = px * 1.05, total = lh * lines.length;
    lines.forEach((l, i) => g.fillText(l, S / 2, S / 2 - total / 2 + lh * (i + 0.5)));
  }
  const data = g.getImageData(0, 0, S, S).data;
  const inside: [number, number][] = [];
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if (data[(y * S + x) * 4 + 3] > 110) inside.push([x, y]);
  if (!inside.length) return Array.from({ length: n }, () => ({ x: 0, y: 0, accent: false }));
  for (let i = inside.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [inside[i], inside[j]] = [inside[j], inside[i]]; }
  const k = width / S, cx = S / 2, cy = S / 2;
  const out: Sample[] = [];
  for (let i = 0; i < n; i++) {
    const [x, y] = inside[i % inside.length];
    const px = (x - cx) * k, py = -(y - cy) * k;
    // the logo's bottom right segment carries the accent; text gets a light scatter of accent points
    const ang = (Math.atan2(py, px) * 180) / Math.PI;
    const accent = target.kind === "logo" ? ang > -88 && ang < -30 : Math.random() < 0.08;
    out.push({ x: px, y: py, accent });
  }
  return out;
}

export default function ParticleMark({ targets = [{ kind: "logo" }], cycle = 0, count, accent = "#E0A030", width = 2.5 }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const key = JSON.stringify(targets);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = reduceMotion();
    const N = count ?? (window.innerWidth < 700 ? 1500 : 3000);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    const halfH = Math.tan(THREE.MathUtils.degToRad(15));

    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), vel = new Float32Array(N * 3);
    const away = new Float32Array(N * 3), seed = new Float32Array(N);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.028, sizeAttenuation: true, vertexColors: true, map: sprite(),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.95,
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    const ochre = new THREE.Color(accent);
    const homes: Float32Array[] = [];    // one xyz array per target
    const accents: Uint8Array[] = [];
    const state = { progress: reduced ? 1 : 0, mx: 99, my: 99, t: 0, ready: false, from: 0, to: 0, m: 1, hold: 0, cool: 0 };
    let alive = true;

    for (let i = 0; i < N; i++) {
      const r = 2.2 + Math.random() * 2.6, a = Math.random() * Math.PI * 2, b = (Math.random() - 0.5) * Math.PI;
      away[i * 3] = Math.cos(a) * Math.cos(b) * r * 1.4;
      away[i * 3 + 1] = Math.sin(b) * r * 0.9;
      away[i * 3 + 2] = Math.sin(a) * Math.cos(b) * r - 1;
      pos[i * 3] = away[i * 3]; pos[i * 3 + 1] = away[i * 3 + 1]; pos[i * 3 + 2] = away[i * 3 + 2];
      seed[i] = Math.random() * Math.PI * 2;
    }

    const paint = (ti: number) => {
      const acc = accents[ti];
      for (let i = 0; i < N; i++) {
        const c = acc[i] ? ochre : BONE;
        const v = acc[i] ? 0.9 + ((seed[i] * 7) % 1) * 0.2 : 0.75 + ((seed[i] * 13) % 1) * 0.3;
        col[i * 3] = c.r * v; col[i * 3 + 1] = c.g * v; col[i * 3 + 2] = c.b * v;
      }
      geo.attributes.color.needsUpdate = true;
    };

    Promise.all(targets.map((t) => sample(t, N, width))).then((sets) => {
      if (!alive) return;
      sets.forEach((pts) => {
        const h = new Float32Array(N * 3), a = new Uint8Array(N);
        pts.forEach((p, i) => { h[i * 3] = p.x; h[i * 3 + 1] = p.y; h[i * 3 + 2] = (((seed[i] * 31) % 1) - 0.5) * 0.08; a[i] = p.accent ? 1 : 0; });
        homes.push(h); accents.push(a);
      });
      paint(0);
      state.ready = true;
    });

    const MORPH = 1.7; // seconds
    const advance = () => {
      if (homes.length < 2 || state.m < 1) return;
      state.from = state.to; state.to = (state.to + 1) % homes.length; state.m = 0; state.hold = 0;
      paint(state.to);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const u = (e.clientX - r.left) / r.width, v = (e.clientY - r.top) / r.height;
      state.mx = (u - 0.5) * 2 * halfH * camera.position.z * camera.aspect;
      state.my = -(v - 0.5) * 2 * halfH * camera.position.z;
    };
    const onLeave = () => { state.mx = 99; state.my = 99; };
    const onEnter = () => { if (state.cool <= 0 && state.progress > 0.9) { advance(); state.cool = 2.5; } };
    if (!reduced) {
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("pointerenter", onEnter);
    }

    const R = 0.62, PUSH = 4.2, SPRING = 9, DAMP = 5.5;
    const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    let raf = 0, last = performance.now(), visible = true;
    const tick = (now: number) => {
      if (!visible || !state.ready) return;
      const dt = Math.min((now - last) / 1000, 0.033); last = now; state.t += dt;
      if (!reduced) {
        const top = el.getBoundingClientRect().top, vh = window.innerHeight;
        const goal = Math.min(1, Math.max(0, (vh * 0.95 - top) / (vh * 0.55)));
        state.progress += (goal - state.progress) * 0.08;
        if (state.m < 1) state.m = Math.min(1, state.m + dt / MORPH);
        else if (cycle > 0 && homes.length > 1 && state.progress > 0.95) { state.hold += dt; if (state.hold * 1000 >= cycle) advance(); }
        state.cool -= dt;
      }
      const p = state.progress, q = 1 - p, t = state.t, e = easeInOut(state.m);
      const A = homes[state.from], B = homes[state.to];
      for (let i = 0; i < N; i++) {
        const o = i * 3, s = seed[i];
        // each point takes its own slightly staggered path between shapes, so a morph reads as a flock not a slide
        const ei = Math.min(1, Math.max(0, (e - ((s / (Math.PI * 2)) * 0.25)) / 0.75));
        const hx = A[o] + (B[o] - A[o]) * ei, hy = A[o + 1] + (B[o + 1] - A[o + 1]) * ei, hz = A[o + 2] + (B[o + 2] - A[o + 2]) * ei;
        const lift = Math.sin(ei * Math.PI) * 0.35; // arc out of the plane mid-morph
        const tx = away[o] * q + (hx + Math.sin(t * 0.9 + s) * 0.012) * p;
        const ty = away[o + 1] * q + (hy + Math.cos(t * 0.7 + s * 1.7) * 0.012) * p;
        const tz = away[o + 2] * q + (hz + lift) * p;
        let ax = (tx - pos[o]) * SPRING - vel[o] * DAMP;
        let ay = (ty - pos[o + 1]) * SPRING - vel[o + 1] * DAMP;
        let az = (tz - pos[o + 2]) * SPRING - vel[o + 2] * DAMP;
        const dx = pos[o] - state.mx, dy = pos[o + 1] - state.my, d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 0.001, f = (1 - d / R) * PUSH * 60;
          ax += (dx / d) * f; ay += (dy / d) * f; az += 0.6 * f;
        }
        vel[o] += ax * dt; vel[o + 1] += ay * dt; vel[o + 2] += az * dt;
        pos[o] += vel[o] * dt; pos[o + 1] += vel[o + 1] * dt; pos[o + 2] += vel[o + 2] * dt;
      }
      geo.attributes.position.needsUpdate = true;
      points.rotation.y = Math.sin(t * 0.25) * 0.08 * (reduced ? 0 : 1);
      renderer.render(scene, camera);
    };
    const frame = (now: number) => { raf = requestAnimationFrame(frame); tick(now); };
    if (import.meta.env.DEV) (el as unknown as { __pmark?: unknown }).__pmark = { state, tick, geo, advance };

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // frame the widest shape with a little air on either side, whatever the block's proportions
      const need = (width * 1.18) / 2 / Math.min(camera.aspect, 1.4);
      camera.position.z = Math.max(need / halfH, (width * 0.55) / halfH);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; last = performance.now(); }, { threshold: 0.05 });
    io.observe(el);
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); el.removeEventListener("pointerenter", onEnter);
      geo.dispose(); mat.map?.dispose(); mat.dispose(); renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [key, cycle, count, accent, width]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={host} className="pmark" aria-hidden="true" />;
}
