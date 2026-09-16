import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";
import { services } from "../content/site";
import { Button } from "./Button";

/** Full-bleed colour-banded services accordion, one open at a time. */
export function Accordion({ linkTo = "/services" }: { linkTo?: string }) {
  const { hash } = useLocation();
  const [open, setOpen] = useState<number>(0);
  const bodies = useRef<(HTMLDivElement | null)[]>([]);
  const first = useRef(true);

  useEffect(() => {
    const idx = services.findIndex((s) => `#${s.id}` === hash);
    if (idx >= 0) setOpen(idx);
  }, [hash]);

  useEffect(() => {
    bodies.current.forEach((b, i) => {
      if (!b) return;
      const inner = b.firstElementChild as HTMLElement;
      const h = i === open ? inner.offsetHeight : 0;
      if (first.current) { gsap.set(b, { height: h }); }
      else { gsap.to(b, { height: h, duration: 0.7, ease: "power3.inOut", onUpdate: () => ScrollTrigger.update(), onComplete: () => ScrollTrigger.refresh() }); }
    });
    first.current = false;
  }, [open]);

  return (
    <section className="acc">
      {services.map((s, i) => (
        <div key={s.id} id={s.id} className={`band ${open === i ? "is-open" : ""}`} style={{ background: s.tint }}>
          <button className="band-head" style={{ width: "100%" }} onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} data-cursor={open === i ? "close" : "open"}>
            <span className="band-title">{s.name}</span>
            <span className="band-plus" aria-hidden="true">+</span>
          </button>
          <div className="band-body" ref={(el) => { bodies.current[i] = el; }}>
            <div className="band-inner">
              <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
                <span className="mono" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid currentColor", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="body-lg">{s.body}</p>
                <Button to={`${linkTo}#${s.id}`}>Learn more</Button>
              </div>
              <div style={{ height: 360, borderRadius: 20, background: "var(--ink)", position: "relative", overflow: "hidden" }}>
                <img src={s.visual} alt="" className="media-fill" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
