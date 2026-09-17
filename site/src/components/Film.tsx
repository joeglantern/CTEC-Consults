import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sectors } from "../content/site";
import { TransitionLink } from "./PageTransition";
import { reduceMotion } from "../hooks/useReveal";
import { clip, silence } from "../video";
import "./Film.css";

gsap.registerPlugin(ScrollTrigger);

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

/**
 * Full-frame scroll film. The stage pins for one viewport per sector. Each sector fills the screen with its
 * clip (or its still, with a slow drift, where no clip exists yet). At every chapter boundary the next scene
 * opens through a soft-edged iris from the centre while the outgoing one eases back and dims.
 */
export function Film() {
  const root = useRef<HTMLElement>(null);
  const n = sectors.length;
  const [staticMode] = useState(() => reduceMotion());
  // phones get the clips too; only the chapter in view ever plays, so it stays cheap
  const [useVideo] = useState(() => !reduceMotion());

  useEffect(() => {
    const el = root.current;
    if (!el || staticMode) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>(".film-layer"));
    const caps = Array.from(el.querySelectorAll<HTMLElement>(".film-cap"));
    const warp = el.querySelector<HTMLVideoElement>(".film-warp");
    const fill = el.querySelector<HTMLElement>(".film-bar-fill")!;
    const idx = el.querySelector<HTMLElement>(".film-idx")!;
    const videos = layers.map((l) => l.querySelector("video"));

    gsap.set(layers, { opacity: 0, scale: 1, filter: "brightness(1)", "--r0": "150%", "--r1": "160%" });
    gsap.set(layers[0], { opacity: 1 });
    gsap.set(caps, { opacity: 0, y: 48 });
    gsap.set(caps[0], { opacity: 1, y: 0 });

    let current = -1;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => "+=" + n * 110 + "%",
        pin: true,
        scrub: 1.1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress * n;
          const active = Math.min(n - 1, Math.max(0, Math.floor(p)));
          fill.style.transform = `scaleY(${self.progress})`;
          if (active !== current) { current = active; idx.textContent = String(active + 1).padStart(2, "0"); }
          videos.forEach((v, i) => {
            if (!v) return;
            const near = Math.abs(p - (i + 0.5)) < 1;
            if (near) { if (v.paused) v.play().catch(() => {}); }
            else if (!v.paused) v.pause();
          });
        },
      },
    });

    const D = 0.6;
    for (let k = 0; k < n - 1; k++) {
      const T = k + 0.68;
      // next scene opens through a feathered iris from the centre and settles from a slight zoom
      tl.set(layers[k + 1], { opacity: 1, scale: 1.08, "--r0": "0%", "--r1": "6%" }, T);
      tl.to(layers[k + 1], { "--r0": "100%", "--r1": "126%", scale: 1, ease: "power2.inOut", duration: D }, T);
      // the scene we are leaving eases back and dims underneath it
      tl.to(layers[k], { scale: 1.06, filter: "brightness(0.5)", ease: "power1.inOut", duration: D }, T);
      tl.set(layers[k], { opacity: 0 }, T + D + 0.02);
      if (warp) {
        // a light CGI particle pass over the iris, screen-blended. Hidden by onError until the clip exists.
        tl.call(() => { warp.currentTime = 0; warp.play().catch(() => {}); }, [], T - 0.02);
        tl.fromTo(warp, { opacity: 0 }, { opacity: 0.26, ease: "power1.in", duration: 0.25 }, T);
        tl.to(warp, { opacity: 0, ease: "power2.out", duration: 0.3 }, T + 0.32);
      }
      tl.to(caps[k], { opacity: 0, y: -40, ease: "power2.in", duration: 0.22 }, T);
      tl.fromTo(caps[k + 1], { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power3.out", duration: 0.34 }, T + 0.3);
    }
    tl.to({}, { duration: 0.01 }, n - 0.01);

    return () => { tl.scrollTrigger?.kill(); tl.kill(); videos.forEach((v) => v?.pause()); };
  }, [n, staticMode]);

  if (staticMode) {
    return (
      <section className="film film-static">
        {sectors.map((s, i) => (
          <div key={s.id} className="film-static-row">
            <img src={s.visual} alt="" className="media-fill" />
            <div className="film-scrim" />
            <div className="container film-cap">
              <span className="mono film-cap-eyebrow">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
              <TransitionLink to={`/sectors#${s.id}`} className="film-cap-link"><h3 className="serif film-cap-name">{s.name}</h3><span className="film-cap-chip"><Arrow /></span></TransitionLink>
              <p className="film-cap-line">{s.line}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={root} className="film" aria-label="Sectors we serve">
      <div className="film-stage">
        {sectors.map((s) => (
          <div key={s.id} className="film-layer">
            {useVideo && s.clip
              ? <video ref={silence} src={clip(s.clip)} poster={s.poster ?? s.visual} muted playsInline loop preload="metadata" aria-hidden="true" />
              : <img src={s.visual} alt="" className="film-kb" />}
          </div>
        ))}
        <video ref={silence} className="film-warp" src={clip("/video/cgi-warp.mp4")} muted playsInline preload="metadata" aria-hidden="true" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        <div className="film-scrim" aria-hidden="true" />
        <div className="grain" />
        <div className="film-caps container">
          {sectors.map((s, i) => (
            <div key={s.id} className="film-cap">
              <span className="mono film-cap-eyebrow">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
              <TransitionLink to={`/sectors#${s.id}`} className="film-cap-link" data-cursor="open">
                <h3 className="serif film-cap-name">{s.name}</h3>
                <span className="film-cap-chip"><Arrow /></span>
              </TransitionLink>
              <p className="film-cap-line">{s.line}</p>
            </div>
          ))}
        </div>
        <div className="film-hud" aria-hidden="true">
          <span className="mono film-idx">01</span>
          <span className="film-bar"><span className="film-bar-fill" /></span>
        </div>
      </div>
    </section>
  );
}
