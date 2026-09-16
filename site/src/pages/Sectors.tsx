import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Bank, Globe, Storefront, Student, FirstAid, Plant } from "@phosphor-icons/react";
import { sectors, sectorsPage } from "../content/site";
import { Button } from "../components/Button";
import { Eyebrow } from "../components/Eyebrow";
import { Words } from "../components/Words";
import { ScrollVideo } from "../components/ScrollVideo";
import { ContactCard } from "../components/ContactCard";
import { useReveal, reduceMotion } from "../hooks/useReveal";
import "./Sectors.css";

const icons = [Bank, Globe, Storefront, Student, FirstAid, Plant];

export default function Sectors() {
  const page = useReveal<HTMLDivElement>();
  const rows = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rows.current;
    if (!el || reduceMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".sr-vis"));
    const handlers = cards.map((c) => {
      const move = (e: MouseEvent) => {
        const r = c.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(c, { rotateY: dx * 4, rotateX: -dy * 4, duration: 0.6, ease: "power3.out" });
      };
      const leave = () => gsap.to(c, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power3.out" });
      c.addEventListener("mousemove", move); c.addEventListener("mouseleave", leave);
      return () => { c.removeEventListener("mousemove", move); c.removeEventListener("mouseleave", leave); };
    });
    return () => handlers.forEach((h) => h());
  }, []);

  return (
    <div ref={page} className="on-light">
      <section className="sr-hero">
        <ScrollVideo src="/video/cgi-terrain.mp4" poster="/img/cgi-terrain-poster.jpg" mode="loop" parallax={18} />
        <div className="scrim sr-scrim" />
        <div className="grain" />
        <div className="container sr-hero-grid">
          <div className="stack">
            <Eyebrow>{sectorsPage.eyebrow}</Eyebrow>
            <h1 className="serif h-hero"><Words text={sectorsPage.headline[0]} /><Words text={sectorsPage.headline[1]} italic /></h1>
          </div>
          <p className="body-lg reveal">{sectorsPage.body}</p>
        </div>
      </section>

      <div ref={rows}>
        {sectors.map((s, i) => {
          const Icon = icons[i];
          return (
            <section key={s.id} id={s.id} className={`sr-row ${i % 2 ? "is-flip" : ""}`} style={{ background: `rgba(${s.rgb}, 0.12)` }}>
              <div className="container sr-grid">
                <div className="sr-text reveal">
                  <span className="sr-icon"><Icon size={22} color="#E0A030" /></span>
                  <h2 className="serif h-2">{s.name}</h2>
                  <p className="body-lg muted">{s.body}</p>
                </div>
                <div className="sr-vis reveal" style={{ background: s.tint }}>
                  {s.clip ? <ScrollVideo src={s.clip} poster={s.poster ?? s.visual} mode="loop" parallax={10} /> : <img src={s.visual} alt="" className="media-fill" />}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="container" style={{ padding: "100px var(--gutter)", display: "flex", justifyContent: "center" }}>
        <Button to="/contact">Start a conversation</Button>
      </section>
      <div style={{ background: "var(--ink)", color: "var(--bone)", paddingTop: "var(--section)" }}><ContactCard /></div>
    </div>
  );
}
