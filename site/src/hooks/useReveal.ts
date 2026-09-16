import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Adds .is-in to every .reveal and .word inside the ref when it scrolls into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal, .word"));
    if (!items.length) return;
    if (reduceMotion()) { items.forEach((el) => el.classList.add("is-in")); return; }
    const triggers = items.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          const delay = el.classList.contains("word") ? (i % 12) * 40 : 0;
          setTimeout(() => el.classList.add("is-in"), delay);
        },
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);
  return ref;
}
