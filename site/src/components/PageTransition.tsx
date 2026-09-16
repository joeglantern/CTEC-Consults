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

  const go = useCallback((to: string) => {
    if (busy.current || to === location.pathname) return;
    if (reduceMotion()) { navigate(to); window.scrollTo(0, 0); return; }
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
    if (!covered || pending.current !== location.pathname) return;
    pending.current = null;
    gsap.to(tiles(), {
      scale: 0, rotate: -8, opacity: 0, duration: 0.5, ease: "power3.inOut", delay: 0.1,
      stagger: { each: 0.012, from: "start", grid: [ROWS, COLS] },
      onComplete: () => { gsap.set(wall.current, { pointerEvents: "none" }); setCovered(false); busy.current = false; },
    });
  }, [location.pathname, covered]);

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

export function TransitionLink({ to, className, children, onClick }: { to: string; className?: string; children: ReactNode; onClick?: () => void }) {
  const { go } = useTransition();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onClick?.();
    go(to);
  };
  return <a href={to} className={className} onClick={handle}>{children}</a>;
}
