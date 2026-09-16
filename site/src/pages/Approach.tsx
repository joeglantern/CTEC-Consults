import { Suspense, lazy, useEffect, useRef } from "react";
import gsap from "gsap";
import { approachPage, pillars } from "../content/site";
import { Button } from "../components/Button";
import { Eyebrow } from "../components/Eyebrow";
import { Words } from "../components/Words";
import { ContactCard } from "../components/ContactCard";
import { ScrollVideo } from "../components/ScrollVideo";
import { useReveal, reduceMotion } from "../hooks/useReveal";
import "./Approach.css";

const Mark3D = lazy(() => import("../three/Mark3D"));

const arcs = ["M50 10 A40 40 0 0 0 10 50 L50 50 Z", "M90 50 A40 40 0 0 0 50 10 L50 50 Z", "M10 50 A40 40 0 0 0 50 90 L50 50 Z", "M50 90 A40 40 0 0 0 90 50 L50 50 Z"];
const objects = [
  <svg viewBox="0 0 100 100"><path d={arcs[0]} fill="#0C0D0B" /><circle cx="62" cy="62" r="14" fill="none" stroke="#0C0D0B" strokeWidth="3" /></svg>,
  <svg viewBox="0 0 100 100"><path d={arcs[1]} fill="#0C0D0B" /><path d={arcs[2]} fill="#E0A030" /></svg>,
  <svg viewBox="0 0 100 100"><rect x="20" y="60" width="60" height="14" fill="#0C0D0B" /><rect x="30" y="42" width="40" height="14" fill="#0C0D0B" /><rect x="40" y="24" width="20" height="14" fill="#E0A030" /></svg>,
  <svg viewBox="0 0 100 100"><path d={arcs[3]} fill="#0C0D0B" /><path d="M50 50 L20 20 L50 20 Z" fill="#E0A030" /></svg>,
];
const tilts = [-4, 2, -2, 4];

export default function Approach() {
  const page = useReveal<HTMLDivElement>();
  const pin = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pin.current, tr = track.current;
    if (!el || !tr || reduceMotion() || window.innerWidth < 900) return;
    const cards = tr.querySelectorAll<HTMLElement>(".pcard");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top top", end: "+=" + cards.length * 90 + "%", pin: true, scrub: 0.6 },
    });
    cards.forEach((c, i) => {
      tl.fromTo(c, { x: window.innerWidth * 1.1, rotate: 0 }, { x: 0, rotate: tilts[i], ease: "power2.out", duration: 1 }, i * 0.9);
    });
    tl.to(el.querySelector(".pprog"), { scaleX: 1, ease: "none", duration: cards.length * 0.9 }, 0);
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <div ref={page}>
      <section className="container ap-hero">
        <div className="stack">
          <Eyebrow>{approachPage.eyebrow}</Eyebrow>
          <h1 className="serif h-hero"><Words text={approachPage.headline[0]} /><Words text={approachPage.headline[1]} italic /></h1>
        </div>
        <p className="body-lg reveal">{approachPage.body}</p>
      </section>
      <section className="ap-stage">
        <Suspense fallback={<div className="container ap-frags">{arcs.map((d, i) => <svg key={i} viewBox="0 0 100 100"><path d={d} fill={i === 3 ? "#E0A030" : "#F1ECE2"} /></svg>)}</div>}>
          <Mark3D />
        </Suspense>
      </section>

      <section ref={pin} className="ap-pin">
        <ScrollVideo src="/video/cgi-assembly.mp4" poster="/img/cgi-assembly-poster.jpg" mode="loop" parallax={6} className="ap-cgi" />
        <div className="ap-spot" />
        <div className="grain" />
        <div className="ap-pin-head">
          <Eyebrow>{approachPage.sectionEyebrow}</Eyebrow>
          <h2 className="serif h-2">{approachPage.sectionHeadline[0]}<em>{approachPage.sectionHeadline[1]}</em>{approachPage.sectionHeadline[2]}</h2>
        </div>
        <div ref={track} className="ap-track">
          {pillars.map((p, i) => (
            <div key={p.n} className="pcard" style={{ transform: `rotate(${tilts[i]}deg)` }}>
              <div className="pcard-top"><span className="mono" style={{ color: "var(--mist-dark)" }}>{p.n} / 04</span><span className="pchip mono">{p.chip}</span></div>
              <div className="pcard-obj"><img src={p.visual} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />{objects[i]}</div>
              <h3 className="serif pcard-name">{p.name}</h3>
              <p className="pcard-line">{p.line}</p>
              <ul className="pcard-list">{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="ap-prog"><span className="pprog" /></div>
      </section>

      <section className="on-light ap-close">
        <div className="container">
          <div className="ap-close-line reveal"><span className="serif">{approachPage.closing}</span></div>
          <div className="reveal" style={{ display: "flex", justifyContent: "center" }}><Button to="/contact">Start a conversation</Button></div>
        </div>
      </section>

      <div style={{ paddingTop: "var(--section)" }}><ContactCard /></div>
    </div>
  );
}
