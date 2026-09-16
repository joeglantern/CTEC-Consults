import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { services, servicesPage } from "../content/site";
import { Button } from "../components/Button";
import { Eyebrow } from "../components/Eyebrow";
import { Words } from "../components/Words";
import { ContactCard } from "../components/ContactCard";
import { useReveal, reduceMotion } from "../hooks/useReveal";
import "./Services.css";

export default function Services() {
  const page = useReveal<HTMLDivElement>();
  const { hash } = useLocation();
  const [open, setOpen] = useState(0);
  const statement = useRef<HTMLElement>(null);
  const diagram = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const idx = services.findIndex((s) => `#${s.id}` === hash);
    if (idx >= 0) setOpen(idx);
  }, [hash]);

  // letters brighten with scroll under the spotlight
  useEffect(() => {
    const el = statement.current;
    if (!el || reduceMotion()) return;
    const letters = el.querySelectorAll<HTMLElement>(".ltr");
    const tween = gsap.fromTo(letters, { color: "#2A2B27" }, {
      color: "#F1ECE2", stagger: 0.02, ease: "none",
      scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  // diagram draws itself
  useEffect(() => {
    const svg = diagram.current;
    if (!svg || reduceMotion()) return;
    const path = svg.querySelector<SVGPathElement>(".dpath")!;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    const tween = gsap.to(path, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: svg, start: "top 85%", end: "bottom 45%", scrub: true } });
    const dots = gsap.fromTo(svg.querySelectorAll(".dot, .dlabel"), { opacity: 0 }, { opacity: 1, stagger: 0.25, scrollTrigger: { trigger: svg, start: "top 80%", end: "bottom 45%", scrub: true } });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); dots.scrollTrigger?.kill(); dots.kill(); };
  }, []);

  const stmt = servicesPage.statement;

  return (
    <div ref={page} className="on-light">
      <section className="container svc-hero">
        <img src="/tiles.svg" alt="" className="svc-ribbon" />
        <div className="stack" style={{ position: "relative" }}>
          <Eyebrow>{servicesPage.eyebrow}</Eyebrow>
          <h1 className="serif h-hero"><Words text={servicesPage.headline[0]} /><Words text={servicesPage.headline[1]} italic /></h1>
        </div>
        <p className="body-lg muted reveal" style={{ position: "relative" }}>{servicesPage.body}</p>
      </section>

      <section className="container svc-split">
        <div className="svc-sticky">
          <div className="svc-sticky-card" style={{ background: services[open].tint }}>
            <img key={services[open].id} src={services[open].visual} alt="" className="media-fill svc-sticky-img" />
            <div className="grain" />
            <span className="mono">{String(open + 1).padStart(2, "0")} / 09</span>
          </div>
        </div>
        <div className="svc-list">
          {services.map((s, i) => (
            <div key={s.id} id={s.id} className={`svc-row ${open === i ? "is-open" : ""}`}>
              <button className="svc-row-head" onClick={() => setOpen(i)} aria-expanded={open === i}>
                <span className="svc-row-t"><span className="mono" style={{ color: "var(--mist-dark)", width: 28 }}>{String(i + 1).padStart(2, "0")}</span><span className="serif svc-row-name">{s.name}</span></span>
                <span className="serif" style={{ fontSize: 30 }}>{open === i ? "−" : "+"}</span>
              </button>
              <div className="svc-row-body" style={{ display: open === i ? "flex" : "none" }}>
                <p className="body-lg muted">{s.body}</p>
                <Button to="/contact">Start a conversation</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={statement} className="svc-statement">
        <div className="svc-spot" />
        <div className="grain" />
        <h2 className="serif" style={{ position: "relative" }}>
          {stmt[0].split("").map((c, i) => <span key={i} className="ltr">{c}</span>)}
          <em>{stmt[1].split("").map((c, i) => <span key={i} className="ltr">{c}</span>)}</em>
        </h2>
      </section>

      <section className="svc-diagram">
        <svg ref={diagram} viewBox="0 0 1200 260" fill="none" preserveAspectRatio="xMidYMid meet">
          <path className="dpath" d="M40 200 C 200 200, 260 80, 400 90 S 620 210, 760 160 S 1000 40, 1160 60" stroke="#F1ECE2" strokeWidth="1.5" strokeLinecap="round" />
          {[[40, 200], [400, 90], [760, 160], [1160, 60]].map(([x, y], i) => <circle key={i} className="dot" cx={x} cy={y} r="6" fill="#E0A030" />)}
          <text className="dlabel" x="40" y="240" fill="#9A9B92" fontFamily="Geist Mono, monospace" fontSize="12" letterSpacing="1.6">01 {servicesPage.diagram[0].toUpperCase()}</text>
          <text className="dlabel" x="400" y="60" fill="#9A9B92" fontFamily="Geist Mono, monospace" fontSize="12" letterSpacing="1.6" textAnchor="middle">02 {servicesPage.diagram[1].toUpperCase()}</text>
          <text className="dlabel" x="760" y="200" fill="#9A9B92" fontFamily="Geist Mono, monospace" fontSize="12" letterSpacing="1.6" textAnchor="middle">03 {servicesPage.diagram[2].toUpperCase()}</text>
          <text className="dlabel" x="1160" y="34" fill="#9A9B92" fontFamily="Geist Mono, monospace" fontSize="12" letterSpacing="1.6" textAnchor="end">04 {servicesPage.diagram[3].toUpperCase()}</text>
        </svg>
        <Button to="/approach">See our approach</Button>
      </section>

      <div style={{ background: "var(--ink)", color: "var(--bone)", paddingTop: "var(--section)" }}><ContactCard /></div>
    </div>
  );
}
