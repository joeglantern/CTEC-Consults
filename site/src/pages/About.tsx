import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, ShieldCheck, Medal, HandsClapping, ArrowsOutCardinal, UsersThree } from "@phosphor-icons/react";
import { aboutPage, values } from "../content/site";
import { Button } from "../components/Button";
import { Eyebrow } from "../components/Eyebrow";
import { Emph } from "../components/Words";
import { ScrollVideo } from "../components/ScrollVideo";
import { ContactCard } from "../components/ContactCard";
import { useReveal, reduceMotion } from "../hooks/useReveal";
import "./About.css";

const icons = [Sparkle, ShieldCheck, Medal, HandsClapping, ArrowsOutCardinal, UsersThree];

export default function About() {
  const page = useReveal<HTMLDivElement>();
  const hero = useRef<HTMLElement>(null);
  const deck = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // the deck pins and the scroll deals the cards one by one, first to last; arrows and clicks still work
  useEffect(() => {
    const el = deck.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % values.length);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + values.length) % values.length);
    };
    window.addEventListener("keydown", onKey);
    if (reduceMotion()) return () => window.removeEventListener("keydown", onKey);
    const n = values.length;
    const stage = el.querySelector<HTMLElement>(".deck") ?? el;
    const st = ScrollTrigger.create({
      trigger: stage, start: "center center", end: "+=" + n * 62 + "%", pin: true, scrub: 0.5, anticipatePin: 1,
      onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n + 0.0001))),
    });
    return () => { window.removeEventListener("keydown", onKey); st.kill(); };
  }, []);

  return (
    <div ref={page}>
      <section ref={hero} className="ab-hero">
        <ScrollVideo src="/video/cgi-prism.mp4" poster="/img/cgi-prism-poster.jpg" mode="loop" parallax={12} />
        <div className="scrim ab-scrim" />
        <div className="grain" />
        <div className="container ab-hero-body">
          <h1 className="serif ab-h1 reveal"><Emph text={aboutPage.headline} /></h1>
          <div className="ab-cols">
            <p className="body-lg reveal">{aboutPage.col1}</p>
            <p className="body-lg reveal">{aboutPage.col2}</p>
          </div>
        </div>
      </section>

      <section className="on-light ab-bento">
        <div className="container stack">
          <Eyebrow>vision, mission, values</Eyebrow>
          <div className="bento">
            <div className="tile reveal" style={{ background: "var(--oxblood)", color: "var(--bone)", gridColumn: "span 2" }}><span className="mono tile-lbl">Vision</span><p className="serif tile-big">{aboutPage.vision}</p></div>
            <div className="tile reveal" style={{ background: "var(--moss)", color: "var(--bone)", gridColumn: "span 2" }}><span className="mono tile-lbl">Mission</span><p className="serif tile-big">{aboutPage.mission}</p></div>
            {values.map((v, i) => {
              const Icon = icons[i];
              return (
                <div key={v.name} className="tile reveal" style={{ background: "var(--parchment)", gridColumn: i >= 4 ? "span 2" : undefined }}>
                  <Icon size={28} color="#E0A030" />
                  <div className="stack-sm"><h3 className="serif tile-h">{v.name}</h3><p className="tile-p">{v.line}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={deck} className="ab-deck section">
        <div className="grain" />
        <div className="container stack" style={{ alignItems: "center", textAlign: "center" }}>
          <Eyebrow>{aboutPage.valuesEyebrow}</Eyebrow>
          <h2 className="serif h-2 reveal">{aboutPage.valuesHeadline[0]}<em>{aboutPage.valuesHeadline[1]}</em></h2>
        </div>
        <div className="deck" data-cursor="view">
          <ScrollVideo src="/video/cgi-network.mp4" poster="/img/cgi-network-poster.jpg" mode="scrub" className="deck-bg" />
          <div className="scrim" style={{ background: "rgba(12,13,11,0.55)" }} />
          {values.map((v, i) => {
            const off = i - active;
            const abs = Math.abs(off);
            return (
              <button
                key={v.name}
                className={`vcard ${off === 0 ? "is-active" : ""}`}
                onClick={() => setActive(i)}
                style={{
                  transform: `translateX(${off * 240}px) rotate(${off * 6}deg) scale(${1 - abs * 0.06}) translateY(${abs * 30}px)`,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.25,
                  zIndex: 10 - abs,
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
              >
                <img className="vcard-img" src={v.visual} alt="" loading="lazy" draggable={false} />
                <span className="mono vcard-num" style={{ color: off === 0 ? "var(--ochre)" : "var(--mist)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="stack-sm"><span className="serif vcard-name">{v.name}</span><span className="vcard-cap">{v.caption}</span></span>
              </button>
            );
          })}
        </div>
        <div className="container" style={{ display: "flex", justifyContent: "center", marginTop: 40 }}><Button to="/contact">Start a conversation</Button></div>
      </section>

      <ContactCard />
    </div>
  );
}
