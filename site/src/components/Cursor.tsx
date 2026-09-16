import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Cursor.css";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"dot" | "ring" | "label">("dot");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = dot.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3" });
    const move = (e: MouseEvent) => {
      x(e.clientX); y(e.clientY);
      const t = e.target as HTMLElement;
      const lab = t.closest<HTMLElement>("[data-cursor]");
      if (lab) { setLabel(lab.dataset.cursor || ""); setMode("label"); return; }
      if (t.closest("a, button")) { setMode("ring"); return; }
      setMode("dot");
    };
    window.addEventListener("mousemove", move);
    document.documentElement.classList.add("has-cursor");
    return () => { window.removeEventListener("mousemove", move); document.documentElement.classList.remove("has-cursor"); };
  }, []);

  return <div ref={dot} className={`cur is-${mode}`} aria-hidden="true"><span>{label}</span></div>;
}
