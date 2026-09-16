import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Scroll state for the navigation.
 *
 * The naive version of this reads the delta between consecutive scroll events and
 * flips on any movement. With smooth scrolling that stream is a run of one and two
 * pixel deltas, so the bar ends up flipping several times a second: the flicker you
 * see while scrolling and the snap back when you stop.
 *
 * This accumulates distance travelled in a single direction and only changes state
 * once that run passes a threshold, with a shorter threshold for coming back so the
 * bar feels eager to return and reluctant to leave. Reads are throttled to one per
 * frame and clamped to the document bounds, which also throws away the negative and
 * overshooting values iOS reports while rubber banding at either end.
 */
export function useScrollState({
  dockAfter = 140,
  freeUntil = 420,
  awayRun = 56,
  backRun = 22,
}: { dockAfter?: number; freeUntil?: number; awayRun?: number; backRun?: number } = {}) {
  const [docked, setDocked] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [deep, setDeep] = useState(false);
  const deepRef = useRef(false);
  const collapsedRef = useRef(false);
  const run = useRef(0);

  /** Opens the bar back up on demand, for a tap on the collapsed pill. */
  const expand = useCallback(() => {
    run.current = 0;
    collapsedRef.current = false;
    setCollapsed(false);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const read = () => {
      frame = 0;
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.min(Math.max(window.scrollY, 0), max);
      const d = y - last;
      last = y;

      setDocked(y > dockAfter);

      // how far through the page we are, published as a css variable so the progress
      // ring can follow the scroll without re-rendering anything each frame
      const p = max > 0 ? y / max : 0;
      document.documentElement.style.setProperty("--scroll", p.toFixed(4));
      const far = y > window.innerHeight * 1.5;
      if (far !== deepRef.current) { deepRef.current = far; setDeep(far); }

      if (y <= freeUntil) {
        run.current = 0;
        if (collapsedRef.current) { collapsedRef.current = false; setCollapsed(false); }
        return;
      }
      if (d === 0) return;

      // a change of direction starts a fresh run rather than eating into the old one
      run.current = (run.current > 0 && d > 0) || (run.current < 0 && d < 0) ? run.current + d : d;

      if (!collapsedRef.current && run.current > awayRun) {
        collapsedRef.current = true; setCollapsed(true); run.current = 0;
      } else if (collapsedRef.current && run.current < -backRun) {
        collapsedRef.current = false; setCollapsed(false); run.current = 0;
      }
    };

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    window.addEventListener("scroll", onScroll, { passive: true });
    read();
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [dockAfter, freeUntil, awayRun, backRun]);

  return { docked, collapsed, deep, expand };
}
