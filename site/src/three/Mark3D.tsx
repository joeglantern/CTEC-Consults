import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reduceMotion } from "../hooks/useReveal";
import "./Mark3D.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * The CTEC mark in 3D, built in Blender (scripts/blender-mark.py) and loaded as glTF. The four ring
 * segments start scattered and lock together as the block scrolls into view, then the whole mark tilts
 * toward the cursor and a cloud of instanced shards orbits it. Hovering pulls the segments apart a touch,
 * so the mark keeps assembling and disassembling under the visitor's hand.
 *
 * Lightweight on purpose: one renderer capped at 1.5x pixel ratio, the loop only runs while on screen,
 * shards are GPU instanced, and the whole module is lazy loaded so three.js never enters the main bundle.
 */

// mid angle of each segment (degrees, from logo.svg) so it can slide out along its own bisector
const PIECES: Record<string, number> = {
  arc_top_right: 60.7,
  arc_top_left: 135,
  arc_bottom_left: 225,
  arc_bottom_right: 299.3,
};

type Props = { className?: string; accent?: string };

export default function Mark3D({ className = "", accent = "#E0A030" }: Props) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = reduceMotion();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 0, 5.6);

    // lights: one warm key from the upper left, a low bone fill, an amber rim from behind right
    scene.add(new THREE.AmbientLight(0xf1ece2, 0.35));
    const key = new THREE.DirectionalLight(0xfff3df, 2.4); key.position.set(-3, 4, 5); scene.add(key);
    const fill = new THREE.DirectionalLight(0xf1ece2, 0.6); fill.position.set(3, -2, 4); scene.add(fill);
    const rim = new THREE.PointLight(new THREE.Color(accent), 18, 14, 2); rim.position.set(3.5, 1.5, -2.5); scene.add(rim);

    const rig = new THREE.Group();       // follows the cursor
    const mark = new THREE.Group();      // the four segments
    mark.rotation.x = Math.PI / 2;       // glTF is Y up, the ring was built flat in Blender, stand it up
    rig.add(mark);
    scene.add(rig);

    const state = { progress: reduced ? 1 : 0, hover: 0, tx: 0, ty: 0, t: 0 };
    const pieces: { mesh: THREE.Mesh; dir: THREE.Vector3; spin: THREE.Euler }[] = [];
    const loader = new GLTFLoader();
    let alive = true;

    loader.load("/models/ctec-mark.glb", (gltf) => {
      if (!alive) return;
      const found: THREE.Mesh[] = [];
      gltf.scene.traverse((o) => { if (o instanceof THREE.Mesh && PIECES[o.name] !== undefined) found.push(o); });
      // collected first: re-parenting during traversal skips siblings
      found.forEach((o) => {
        const a = PIECES[o.name];
        const m = o.material as THREE.MeshStandardMaterial;
        m.roughness = o.name === "arc_bottom_right" ? 0.3 : 0.38;
        m.metalness = o.name === "arc_bottom_right" ? 0.45 : 0.08;
        const rad = (a * Math.PI) / 180;
        // bisector in the model's own space (Blender XY became glTF X, -Z)
        const dir = new THREE.Vector3(Math.cos(rad), 0, -Math.sin(rad));
        const spin = new THREE.Euler((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.2);
        pieces.push({ mesh: o, dir, spin });
        mark.add(o);
      });
    });

    // shards: six low poly chunks, instanced, orbiting the mark on tilted rings
    const shards: { mesh: THREE.InstancedMesh; seeds: Float32Array }[] = [];
    const PER = 22;
    loader.load("/models/shards.glb", (gltf) => {
      if (!alive) return;
      gltf.scene.traverse((o) => {
        if (!(o instanceof THREE.Mesh)) return;
        const mat = (o.material as THREE.MeshStandardMaterial).clone();
        mat.roughness = 0.42;
        const inst = new THREE.InstancedMesh(o.geometry, mat, PER);
        const seeds = new Float32Array(PER * 6);
        for (let i = 0; i < PER; i++) {
          seeds[i * 6 + 0] = 1.55 + Math.random() * 1.9;             // orbit radius
          seeds[i * 6 + 1] = Math.random() * Math.PI * 2;            // phase
          seeds[i * 6 + 2] = (0.08 + Math.random() * 0.16) * (Math.random() < 0.5 ? -1 : 1); // speed
          seeds[i * 6 + 3] = (Math.random() - 0.5) * 1.3;            // ring tilt
          seeds[i * 6 + 4] = 0.035 + Math.random() * 0.075;          // scale
          seeds[i * 6 + 5] = Math.random() * Math.PI * 2;            // tumble
        }
        shards.push({ mesh: inst, seeds });
        rig.add(inst);
      });
    });

    // scroll drives assembly; the cursor drives tilt; hover eases the segments apart
    const st = reduced ? null : ScrollTrigger.create({
      trigger: el, start: "top 88%", end: "center 42%", scrub: 0.6,
      onUpdate: (self) => { state.progress = self.progress; },
    });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      state.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      state.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onEnter = () => gsap.to(state, { hover: 1, duration: 0.9, ease: "power3.out" });
    const onLeave = () => gsap.to(state, { hover: 0, duration: 1.1, ease: "power3.inOut" });
    if (!reduced) {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    }

    const dummy = new THREE.Object3D();
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    let raf = 0, last = performance.now(), visible = true;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const dt = Math.min((now - last) / 1000, 0.05); last = now; state.t += dt;

      const p = ease(state.progress);
      const apart = (1 - p) * 2.2 + state.hover * 0.22;
      pieces.forEach(({ mesh, dir, spin }) => {
        mesh.position.copy(dir).multiplyScalar(apart);
        const s = 1 - p;
        mesh.rotation.set(spin.x * s, spin.y * s + state.hover * 0.12 * Math.sin(state.t * 1.4), spin.z * s);
      });

      // idle drift plus cursor tilt
      const idle = reduced ? 0 : 1;
      rig.rotation.y += ((state.tx * 0.55 + Math.sin(state.t * 0.35) * 0.18 * idle) - rig.rotation.y) * 0.06;
      rig.rotation.x += ((-state.ty * 0.35 + Math.cos(state.t * 0.28) * 0.08 * idle) - rig.rotation.x) * 0.06;
      mark.rotation.z = Math.sin(state.t * 0.22) * 0.05 * idle;

      shards.forEach(({ mesh, seeds }) => {
        for (let i = 0; i < PER; i++) {
          const r = seeds[i * 6], ph = seeds[i * 6 + 1] + state.t * seeds[i * 6 + 2] * idle, tilt = seeds[i * 6 + 3];
          const sc = seeds[i * 6 + 4] * (0.75 + 0.25 * p) * (1 + state.hover * 0.25);
          const x = Math.cos(ph) * r, z = Math.sin(ph) * r;
          dummy.position.set(x, z * Math.sin(tilt) + Math.sin(ph * 2 + seeds[i * 6 + 5]) * 0.12, z * Math.cos(tilt));
          dummy.rotation.set(seeds[i * 6 + 5] + state.t * 0.4 * idle, ph, tilt);
          dummy.scale.setScalar(sc);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the mark the same visual size from phone to desktop
      camera.position.z = w < 640 ? 7.2 : w < 1000 ? 6.3 : 5.6;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; last = performance.now(); }, { threshold: 0.02 });
    io.observe(el);
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect(); st?.kill();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.InstancedMesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [accent]);

  return <div ref={host} className={`mark3d ${className}`} aria-hidden="true" />;
}
