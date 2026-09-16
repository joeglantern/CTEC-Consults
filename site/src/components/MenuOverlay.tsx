import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X } from "@phosphor-icons/react";
import { nav, contact } from "../content/site";
import { TransitionLink } from "./PageTransition";
import "./MenuOverlay.css";

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(el, { display: "grid" });
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35 });
      gsap.fromTo(el.querySelectorAll(".ov-link"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out", delay: 0.1 });
      gsap.fromTo(el.querySelector(".ov-panel"), { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.15 });
    } else {
      document.body.style.overflow = "";
      gsap.to(el, { opacity: 0, duration: 0.25, onComplete: () => gsap.set(el, { display: "none" }) });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // one still per link, all mounted so the switch is a crossfade rather than a load
  const stills = [
    { src: "/img/menu/menu-services.jpg", ink: false },
    { src: "/img/menu/menu-approach.jpg", ink: false },
    { src: "/img/menu/menu-sectors.jpg", ink: false },
    { src: "/img/menu/menu-about.jpg", ink: true },
  ];
  const cur = nav.links[hover];

  return (
    <div ref={root} className="ov" style={{ display: "none" }} role="dialog" aria-modal="true" aria-label="Menu">
      <div className="ov-top">
        <TransitionLink to="/" className="brand" onClick={onClose}><img src="/logo.svg" alt="" width="40" height="40" /><span className="serif brand-name">CTEC Consults</span></TransitionLink>
        <button className="round" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
      </div>
      <div className="ov-left">
        <div className="ov-links">
          {nav.links.map((l, i) => (
            <TransitionLink key={l.to} to={l.to} className={`ov-link ${hover === i ? "is-hot" : ""}`} onClick={onClose}>
              <span className="mono ov-num" onMouseEnter={() => setHover(i)}>{String(i + 1).padStart(2, "0")}</span>
              <span className="serif ov-word" onMouseEnter={() => setHover(i)}>{l.label}</span>
            </TransitionLink>
          ))}
        </div>
        <div className="ov-secondary">
          <TransitionLink to="/contact" onClick={onClose}>Contact</TransitionLink>
          <a href={`https://wa.me/${contact.phoneIntl}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={`mailto:${contact.email}`}>Email</a>
        </div>
        <div className="ov-contact mono muted"><span>{contact.email}</span><span>{contact.phone}</span><span>{contact.location}</span></div>
      </div>
      <div className="ov-right">
        <div className={`ov-panel ${stills[hover].ink ? "is-ink" : ""}`}>
          {stills.map((s, i) => <img key={s.src} src={s.src} alt="" className={`ov-img ${hover === i ? "is-on" : ""}`} draggable={false} />)}
          <div className="ov-poster" key={cur.to} aria-hidden="true">
            <span className="mono ov-poster-num">{String(hover + 1).padStart(2, "0")} / {String(nav.links.length).padStart(2, "0")}</span>
            <span className="mono ov-poster-brand">CTEC Consults</span>
            <span className="serif ov-poster-title">{cur.label}</span>
            <span className="ov-poster-cap">{cur.caption}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
