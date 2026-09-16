import { useEffect, useRef } from "react";

/** Mouse drag-to-scroll with light inertia for horizontal rails. */
export function useDragRail<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false, startX = 0, startLeft = 0, vel = 0, lastX = 0, raf = 0;
    const onDown = (e: MouseEvent) => { down = true; startX = e.pageX; lastX = e.pageX; startLeft = el.scrollLeft; el.classList.add("is-dragging"); cancelAnimationFrame(raf); };
    const onMove = (e: MouseEvent) => { if (!down) return; e.preventDefault(); vel = e.pageX - lastX; lastX = e.pageX; el.scrollLeft = startLeft - (e.pageX - startX); };
    const onUp = () => {
      if (!down) return; down = false; el.classList.remove("is-dragging");
      const glide = () => { if (Math.abs(vel) < 0.5) return; el.scrollLeft -= vel; vel *= 0.94; raf = requestAnimationFrame(glide); };
      glide();
    };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { el.removeEventListener("mousedown", onDown); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}
