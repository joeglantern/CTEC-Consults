import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { List, WhatsappLogo, ArrowUp, SquaresFour, Clock, ListDashes, CaretDown } from "@phosphor-icons/react";
import { nav, contact } from "../content/site";
import { TransitionLink } from "./PageTransition";
import { Button } from "./Button";
import { ServicesMenu } from "./ServicesMenu";
import { useScrollState } from "../hooks/useScrollState";
import "./Nav.css";

export function Nav({ onMenu }: { onMenu: () => void }) {
  const { pathname } = useLocation();
  const { docked, collapsed, expand, deep } = useScrollState();
  const [services, setServices] = useState(false);
  const timer = useRef(0);
  const fine = useRef(false);
  useEffect(() => { fine.current = window.matchMedia("(pointer: fine)").matches; }, []);

  // Hover, with intent on both sides: a short delay before opening so the panel does not
  // flash as the cursor crosses the word, and a slightly longer one before closing so the
  // gap between the nav and the panel can be crossed without it vanishing underneath you.
  const openSoon = () => { if (!fine.current) return; window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setServices(true), 130); };
  const closeSoon = () => { if (!fine.current) return; window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setServices(false), 220); };
  const hold = () => window.clearTimeout(timer.current);

  useEffect(() => { setServices(false); }, [pathname]);

  useEffect(() => {
    if (!services) return;
    // the sheet is modal on touch, so the page behind it should not scroll. On a pointer
    // screen the panel is a hover affordance, so scrolling simply dismisses it.
    const touch = !fine.current;
    if (touch) document.body.style.overflow = "hidden";
    const away = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest(".svm-sheet") && !t.closest(".pill-svc") && !t.closest(".bar-item")) setServices(false);
    };
    const onScroll = () => { if (!touch) setServices(false); };
    document.addEventListener("pointerdown", away);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("pointerdown", away);
      window.removeEventListener("scroll", onScroll);
    };
  }, [services]);

  const wa = `https://wa.me/${contact.phoneIntl}`;
  const light = pathname.startsWith("/services") || pathname.startsWith("/privacy") || pathname.startsWith("/terms");
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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

      <nav className={`pill ${docked ? "is-docked" : ""} ${collapsed ? "is-hidden" : ""}`} aria-label="Primary">
        <button className="round pill-up" aria-label="Back to top" onClick={toTop}><ArrowUp size={16} /></button>
        <div className="pill-links">
          {nav.links.map((l) =>
            l.to === "/services" ? (
              <span
                key={l.to}
                className="pill-svc"
                onPointerEnter={openSoon}
                onPointerLeave={closeSoon}
              >
                <TransitionLink to={l.to} className={`pill-link ${pathname.startsWith(l.to) ? "is-active" : ""} ${services ? "is-lit" : ""}`}>
                  {l.label}
                  <CaretDown size={12} weight="bold" className="pill-caret" />
                </TransitionLink>
              </span>
            ) : (
              <TransitionLink key={l.to} to={l.to} className={`pill-link ${pathname.startsWith(l.to) ? "is-active" : ""}`}>{l.label}</TransitionLink>
            )
          )}
          <button className="pill-link pill-menu" onClick={onMenu}><List size={16} /> Menu</button>
        </div>
        <a className="round pill-wa" href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsappLogo size={18} /></a>
      </nav>

      {/*
        Mobile. Rather than dropping out of sight on the way down, the bar draws in
        to a pill that still gets you anywhere in one tap, and opens back out the
        moment you scroll up. It is one element throughout, so the two states are a
        single continuous shape change instead of one thing leaving and another arriving.
      */}
      <nav className={`bar ${collapsed ? "is-min" : ""}`} aria-label="Primary mobile">
        <div className="bar-full" aria-hidden={collapsed}>
          <TransitionLink to="/" className={`bar-item ${pathname === "/" ? "is-active" : ""}`} tabIndex={collapsed ? -1 : 0}><img src="/logo.svg" alt="" width="18" height="18" /><span className="mono">Home</span></TransitionLink>
          <button className={`bar-item ${pathname.startsWith("/services") ? "is-active" : ""}`} onClick={() => setServices(true)} tabIndex={collapsed ? -1 : 0}><ListDashes size={18} /><span className="mono">Services</span></button>
          <TransitionLink to="/approach" className={`bar-item ${pathname.startsWith("/approach") ? "is-active" : ""}`} tabIndex={collapsed ? -1 : 0}><Clock size={18} /><span className="mono">Approach</span></TransitionLink>
          <TransitionLink to="/sectors" className={`bar-item ${pathname.startsWith("/sectors") ? "is-active" : ""}`} tabIndex={collapsed ? -1 : 0}><SquaresFour size={18} /><span className="mono">Sectors</span></TransitionLink>
          <button className="bar-item" onClick={onMenu} tabIndex={collapsed ? -1 : 0}><List size={18} /><span className="mono">Menu</span></button>
        </div>
        {/* a tap opens the bar back out rather than jumping straight to the menu */}
        <button className="bar-min" onClick={expand} aria-label="Show navigation" aria-hidden={!collapsed} tabIndex={collapsed ? 0 : -1}>
          <span className="bar-min-dots" aria-hidden="true"><i /><i /><i /></span>
        </button>
      </nav>

      {/* Back to top, mobile. Rides above the bar, and only once there is a way back worth taking. */}
      <button
        className={`totop ${deep ? "is-on" : ""}`}
        onClick={toTop}
        aria-label="Back to top"
        aria-hidden={!deep}
        tabIndex={deep ? 0 : -1}
      >
        <svg className="totop-ring" viewBox="0 0 44 44" aria-hidden="true">
          <circle className="totop-track" cx="22" cy="22" r="20" />
          <circle className="totop-fill" cx="22" cy="22" r="20" pathLength={1} />
        </svg>
        <ArrowUp size={16} weight="bold" />
      </button>

      <ServicesMenu open={services} onClose={() => setServices(false)} onHold={hold} onRelease={closeSoon} />
    </>
  );
}
