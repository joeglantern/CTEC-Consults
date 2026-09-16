import { useEffect, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { services } from "../content/site";
import { TransitionLink } from "./PageTransition";
import "./ServicesMenu.css";

/**
 * The services menu. One component, two shapes.
 *
 * On a pointer screen it is a panel that drops from the nav: a three column grid of the
 * nine services, each with its own still, opened on hover with a little intent delay so
 * it does not flash open as the cursor crosses the word.
 *
 * On a touch screen the same content becomes a sheet that rises from the bottom edge,
 * where a thumb can reach it, with the services as a scrollable list rather than a grid.
 * The sheet is the same markup; the layout switches in CSS rather than in JavaScript.
 */
export function ServicesMenu({ open, onClose, onHold, onRelease }: { open: boolean; onClose: () => void; onHold?: () => void; onRelease?: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={panel}
      className={`svm ${open ? "is-open" : ""}`}
      role="dialog"
      aria-label="Services"
      aria-hidden={!open}
    >
      <button className="svm-scrim" aria-label="Close services" tabIndex={-1} onClick={onClose} />
      <div className="svm-sheet" onPointerEnter={onHold} onPointerLeave={onRelease}>
        <span className="svm-grip" aria-hidden="true" />
        <header className="svm-head">
          <span className="mono svm-kicker">Nine services</span>
          <TransitionLink to="/services" className="svm-all" onClick={onClose}>
            All services <ArrowUpRight size={14} weight="bold" />
          </TransitionLink>
        </header>

        <div className="svm-grid">
          {services.map((s, i) => (
            <TransitionLink
              key={s.id}
              to={`/services#${s.id}`}
              className="svm-card"
              onClick={onClose}
            >
              <span className="svm-thumb" style={{ background: s.tint }}>
                <img src={s.visual} alt="" loading="lazy" />
              </span>
              <span className="svm-text">
                <span className="mono svm-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="serif svm-name">{s.name}</span>
                <span className="svm-hook">{s.hook}</span>
              </span>
            </TransitionLink>
          ))}
        </div>
      </div>
    </div>
  );
}
