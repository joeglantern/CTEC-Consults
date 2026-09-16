import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { List, WhatsappLogo, ArrowUp, SquaresFour, Clock, ListDashes } from "@phosphor-icons/react";
import { nav, contact } from "../content/site";
import { TransitionLink } from "./PageTransition";
import { Button } from "./Button";
import "./Nav.css";

export function Nav({ onMenu }: { onMenu: () => void }) {
  const { pathname } = useLocation();
  const [docked, setDocked] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setDocked(y > 140);
      setHidden(y > last + 6 && y > 400);
      if (y < last - 6 || y < 400) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = `https://wa.me/${contact.phoneIntl}`;
  const light = pathname.startsWith("/services") || pathname.startsWith("/privacy") || pathname.startsWith("/terms");

  return (
    <>
      <header className={`hdr ${docked ? "is-docked" : ""} ${light ? "on-light-hdr" : ""}`}>
        <TransitionLink to="/" className="brand" onClick={undefined}>
          <img src={light ? "/logo-ink.svg" : "/logo.svg"} alt="" width="40" height="40" />
          <span className="serif brand-name">CTEC Consults</span>
        </TransitionLink>
        <div className="hdr-right">
          <a className="round" href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsappLogo size={18} weight="regular" /></a>
          <Button to="/contact">{nav.cta}</Button>
        </div>
      </header>

      <nav className={`pill ${docked ? "is-docked" : ""} ${hidden ? "is-hidden" : ""}`} aria-label="Primary">
        <button className="round pill-up" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp size={16} /></button>
        <div className="pill-links">
          {nav.links.map((l) => (
            <TransitionLink key={l.to} to={l.to} className={`pill-link ${pathname.startsWith(l.to) ? "is-active" : ""}`}>{l.label}</TransitionLink>
          ))}
          <button className="pill-link pill-menu" onClick={onMenu}><List size={16} /> Menu</button>
        </div>
        <a className="round pill-wa" href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsappLogo size={18} /></a>
      </nav>

      <nav className={`bar ${hidden ? "is-hidden" : ""}`} aria-label="Primary mobile">
        <TransitionLink to="/" className={`bar-item ${pathname === "/" ? "is-active" : ""}`}><img src="/logo.svg" alt="" width="18" height="18" /><span className="mono">Home</span></TransitionLink>
        <TransitionLink to="/services" className={`bar-item ${pathname.startsWith("/services") ? "is-active" : ""}`}><ListDashes size={18} /><span className="mono">Services</span></TransitionLink>
        <TransitionLink to="/approach" className={`bar-item ${pathname.startsWith("/approach") ? "is-active" : ""}`}><Clock size={18} /><span className="mono">Approach</span></TransitionLink>
        <TransitionLink to="/sectors" className={`bar-item ${pathname.startsWith("/sectors") ? "is-active" : ""}`}><SquaresFour size={18} /><span className="mono">Sectors</span></TransitionLink>
        <button className="bar-item" onClick={onMenu}><List size={18} /><span className="mono">Menu</span></button>
      </nav>
    </>
  );
}
