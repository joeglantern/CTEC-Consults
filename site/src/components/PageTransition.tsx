import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { reduceMotion } from "../hooks/useReveal";
import "./PageTransition.css";

type Ctx = { go: (to: string) => void };
const TransitionCtx = createContext<Ctx>({ go: () => {} });

const COLS = 12;
const ROWS = 7;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const wall = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const [covered, setCovered] = useState(false);
  const pending = useRef<string | null>(null);

  const tiles = () => Array.from(wall.current?.querySelectorAll<HTMLElement>(".tile") ?? []);

  /** Links carry anchors, as in /services#mel, but the router only ever reports the path. */
  const pathOf = (to: string) => to.split(/[#?]/)[0] || "/";

  /** Puts the wall away immediately, whatever state it was left in. */
  const clear = useCallback(() => {
    const t = tiles();
    gsap.killTweensOf(t);
    gsap.set(t, { opacity: 0, scale: 0 });
    gsap.set(wall.current, { pointerEvents: "none" });
    pending.current = null;
    busy.current = false;
    setCovered(false);
  }, []);

  const go = useCallback((to: string) => {
    if (busy.current) return;
    if (reduceMotion()) { navigate(to); window.scrollTo(0, 0); return; }
    // same page, different anchor: no wall, just let the scroll happen
    if (pathOf(to) === location.pathname) { navigate(to); return; }
    busy.current = true;
    pending.current = to;
    setCovered(true);
    gsap.set(wall.current, { pointerEvents: "auto" });
    gsap.fromTo(
      tiles(),
      { scale: 0, rotate: 8, opacity: 0 },
      {
        scale: 1, rotate: 0, opacity: 1, duration: 0.45, ease: "power3.inOut",
        stagger: { each: 0.012, from: "end", grid: [ROWS, COLS] },
        onComplete: () => { navigate(to); window.scrollTo(0, 0); },
      }
    );
  }, [location.pathname, navigate]);

  useEffect(() => {
    // compare paths, not the raw link, or a navigation with an anchor never uncovers
    if (!covered || !pending.current || pathOf(pending.current) !== location.pathname) return;
    pending.current = null;
    gsap.to(tiles(), {
      scale: 0, rotate: -8, opacity: 0, duration: 0.5, ease: "power3.inOut", delay: 0.1,
      stagger: { each: 0.012, from: "start", grid: [ROWS, COLS] },
      onComplete: () => { gsap.set(wall.current, { pointerEvents: "none" }); setCovered(false); busy.current = false; },
    });
  }, [location.pathname, covered]);

  // last resort: nothing should ever leave the wall sitting over the site
  useEffect(() => {
    if (!covered) return;
    const t = setTimeout(clear, 4500);
    return () => clearTimeout(t);
  }, [covered, clear]);

  return (
    <TransitionCtx.Provider value={{ go }}>
      {children}
      <div ref={wall} className="wall" aria-hidden="true" style={{ pointerEvents: "none" }}>
        {Array.from({ length: COLS * ROWS }).map((_, i) => (
          <span key={i} className="tile" style={{ opacity: 0, transform: "scale(0)" }} />
        ))}
      </div>
    </TransitionCtx.Provider>
  );
}

export function useTransition() { return useContext(TransitionCtx); }

export function TransitionLink({ to, className, children, onClick, tabIndex }: { to: string; className?: string; children: ReactNode; onClick?: () => void; tabIndex?: number }) {
  const { go } = useTransition();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onClick?.();
    go(to);
  };
  return <a href={to} className={className} onClick={handle} tabIndex={tabIndex}>{children}</a>;
}
