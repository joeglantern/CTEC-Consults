import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { home, services, whyUs } from "../content/site";
import { Button } from "../components/Button";
import { Eyebrow } from "../components/Eyebrow";
import { Words } from "../components/Words";
import { ScrollVideo } from "../components/ScrollVideo";
import { ContactCard } from "../components/ContactCard";
import { TransitionLink } from "../components/PageTransition";
import { useReveal, reduceMotion } from "../hooks/useReveal";
import { useDragRail } from "../hooks/useDragRail";
import { Accordion } from "../components/Accordion";
import { Film } from "../components/Film";
import { LogoStrip } from "../components/LogoStrip";
import "./Home.css";

const arcs = ["M50 10 A40 40 0 0 0 10 50 L50 50 Z", "M90 50 A40 40 0 0 0 50 10 L50 50 Z", "M10 50 A40 40 0 0 0 50 90 L50 50 Z", "M50 90 A40 40 0 0 0 90 50 L50 50 Z"];

const Squiggle = ({ className }: { className: string }) => (
  <svg className={`hero-squiggle ${className}`} viewBox="0 0 220 40" fill="none" aria-hidden="true">
                <path className="squig" d="M4 24 C 20 6, 32 6, 44 22 S 68 40, 82 22 S 106 4, 120 20 S 144 38, 158 20 S 182 4, 196 18 C 204 26, 210 26, 216 20" stroke="#E0A030" strokeWidth="2.5" strokeLinecap="round">
                  <animate
                    attributeName="d"
                    dur="3.2s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0;0.5;1"
                    keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                    values="M4 24 C 20 6, 32 6, 44 22 S 68 40, 82 22 S 106 4, 120 20 S 144 38, 158 20 S 182 4, 196 18 C 204 26, 210 26, 216 20;M4 18 C 20 34, 32 34, 44 20 S 68 4, 82 20 S 106 38, 120 22 S 144 6, 158 22 S 182 38, 196 24 C 204 16, 210 16, 216 22;M4 24 C 20 6, 32 6, 44 22 S 68 40, 82 22 S 106 4, 120 20 S 144 38, 158 20 S 182 4, 196 18 C 204 26, 210 26, 216 20"
                  />
                </path>
              </svg>
);

export default function Home() {
  const page = useReveal<HTMLDivElement>();
  const rail = useDragRail<HTMLDivElement>();
  const whyRail = useDragRail<HTMLDivElement>();
  const teaser = useRef<HTMLElement>(null);
  const hero = useRef<HTMLElement>(null);
  // hero: subtle mouse parallax on the footage
  useEffect(() => {
    const el = hero.current;
    if (!el || reduceMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const v = el.querySelector("video");
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(v, { x: dx * -18, y: dy * -12, duration: 1.2, ease: "power3.out", overwrite: "auto" });
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  // approach teaser: the four fragments travel to the centre and lock as you scroll
  useEffect(() => {
    const el = teaser.current;
    if (!el || reduceMotion()) return;
    const frags = el.querySelectorAll<SVGElement>(".frag");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 30%", scrub: 0.8 } });
    frags.forEach((f, i) => {
      const from = [{ x: -220, y: -160, r: -30 }, { x: 220, y: -160, r: 30 }, { x: -220, y: 160, r: 20 }, { x: 220, y: 160, r: -20 }][i];
      tl.fromTo(f, { x: from.x, y: from.y, rotate: from.r, opacity: 0.4 }, { x: 0, y: 0, rotate: 0, opacity: 1, ease: "power2.inOut" }, 0);
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  // squiggle draws itself once the headline is in
  useEffect(() => {
    const path = hero.current?.querySelector<SVGPathElement>(".squig");
    if (!path) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    const tween = gsap.to(path, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", delay: 0.9 });
    return () => { tween.kill(); };
  }, []);

  useEffect(() => { ScrollTrigger.refresh(); }, []);

  return (
    <div ref={page}>
      {/* HERO */}
      <section ref={hero} className="hero">
        <ScrollVideo src="/video/circuit.mp4" poster="/img/circuit-poster.jpg" mode="loop" parallax={16} />
        <div className="scrim hero-scrim" />
        <div className="grain" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>{home.eyebrow}</Eyebrow>
            <h1 className="serif h-hero">
              <Words text={home.headline[0]} /><br />
              <Words text={home.headline[1]} />{" "}
              <Words text={home.headline[2]} italic />
              <Squiggle className="squig-trail word" />
            </h1>
          </div>
          <div className="hero-side reveal">
            <p className="body-lg">{home.body}</p>
            <Button to="/contact">Start a conversation</Button>
          </div>
        </div>
        <div className="hero-partners"><LogoStrip /></div>
        {/* this band belongs to the partner logos; it stays empty until they exist
            rather than being filled with something that repeats the sectors page */}
      </section>

      {/* SERVICES RAIL */}
      <section className="section services-rail-wrap">
        <div className="container rail-head">
          <div className="stack">
            <Eyebrow>{home.servicesEyebrow}</Eyebrow>
            <h2 className="serif h-2 reveal">{home.servicesHeadline[0]}<em>{home.servicesHeadline[1]}</em></h2>
          </div>
          <div className="reveal"><Button to="/services">{home.servicesCta}</Button></div>
        </div>
        <div ref={rail} className="rail services-rail" data-cursor="drag">
          {services.map((s, i) => (
            <TransitionLink key={s.id} to={`/services#${s.id}`} className="svc-card reveal" >
              <div className="svc-bg" style={{ background: s.tint }}><img src={s.visual} alt="" className="media-fill" /></div>
              <span className="mono svc-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="svc-text">
                <span className="serif svc-name">{s.name}</span>
                <span className="svc-hook">{s.hook}</span>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>

      {/* STATEMENT on fins */}
      <section className="statement-wrap">
        <ScrollVideo src="/video/cgi-ink.mp4" poster="/img/cgi-ink-poster.jpg" mode="scrub" range={[0, 0.5]} className="statement-ink" />
        <div className="scrim statement-scrim" />
        <div className="grain" />
        <div className="container"><p className="statement reveal">{home.statement}</p></div>
      </section>

      {/* APPROACH TEASER with scroll-scrubbed Nairobi footage */}
      <section ref={teaser} className="teaser">
        <ScrollVideo src="/video/nairobi.mp4" poster="/img/nairobi-poster.jpg" mode="scrub" />
        <div className="scrim teaser-scrim" />
        <div className="grain" />
        <svg className="frag frag-1" viewBox="0 0 100 100"><path d={arcs[0]} fill="#F1ECE2" /></svg>
        <svg className="frag frag-2" viewBox="0 0 100 100"><path d={arcs[1]} fill="#F1ECE2" /></svg>
        <svg className="frag frag-3" viewBox="0 0 100 100"><path d={arcs[2]} fill="#F1ECE2" /></svg>
        <svg className="frag frag-4" viewBox="0 0 100 100"><path d={arcs[3]} fill="#E0A030" /></svg>
        <div className="teaser-copy">
          <Eyebrow>{home.approachEyebrow}</Eyebrow>
          <h2 className="serif h-1 reveal">{home.approachHeadline[0]}<em>{home.approachHeadline[1]}</em>{home.approachHeadline[2]}</h2>
          <p className="muted reveal">{home.approachLine}</p>
          <div className="reveal"><Button to="/approach">{home.approachCta}</Button></div>
        </div>
      </section>

      {/* WHY CTEC */}
      <section className="on-light why">
        <div className="container why-grid">
          <div className="stack">
            <Eyebrow>{home.whyEyebrow}</Eyebrow>
            <h2 className="serif h-1 reveal">{home.whyHeadline[0]}<em>{home.whyHeadline[1]}</em></h2>
            <p className="body-lg muted reveal">{home.whyIntro}</p>
          </div>
          <div ref={whyRail} className="rail why-rail" data-cursor="drag">
            {whyUs.map((w, i) => (
              <div key={w.title} className="why-card reveal">
                <div className="why-vis"><img src={w.visual} alt="" loading="lazy" /></div>
                <div className="why-body">
                  <span className="mono" style={{ color: "var(--mist-dark)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <div className="stack-sm"><span className="serif why-title">{w.title}</span><span className="why-line">{w.line}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCORDION */}
      <Accordion />

      {/* SECTORS */}
      <section className="section">
        <div className="container stack" style={{ marginBottom: 48 }}>
          <Eyebrow>{home.sectorsEyebrow}</Eyebrow>
          <h2 className="serif h-2 reveal">{home.sectorsHeadline[0]}<em>{home.sectorsHeadline[1]}</em></h2>
          <p className="body-lg muted reveal">{home.sectorsLine}</p>
        </div>
        <div className="container reveal" style={{ marginBottom: 40 }}><Button to="/sectors">{home.sectorsCta}</Button></div>
      </section>
      <Film />
      <ContactCard />
    </div>
  );
}
