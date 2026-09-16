import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reduceMotion } from "../hooks/useReveal";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  src: string;
  poster: string;
  /** loop: autoplay muted loop with parallax. scrub: currentTime follows scroll through the parent section. */
  mode?: "loop" | "scrub";
  /** parallax travel in percent of height, loop mode only */
  parallax?: number;
  className?: string;
  style?: React.CSSProperties;
  /** element that defines the scroll range; defaults to the video's parent */
  triggerRef?: React.RefObject<HTMLElement | null>;
  /** scrub mode only: the slice of the clip the scroll maps onto, as fractions of its duration */
  range?: [number, number];
};

export function ScrollVideo({ src, poster, mode = "loop", parallax = 12, className = "", style, triggerRef, range = [0, 1] }: Props) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const trigger = triggerRef?.current ?? v.parentElement!;
    const reduced = reduceMotion();

    if (mode === "loop") {
      if (!reduced) {
        const io = new IntersectionObserver(([e]) => { e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }, { threshold: 0.05 });
        io.observe(v);
        const tween = gsap.fromTo(v, { yPercent: -parallax / 2 }, {
          yPercent: parallax / 2, ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
        });
        return () => { io.disconnect(); tween.scrollTrigger?.kill(); tween.kill(); };
      }
      return;
    }

    // scrub mode
    v.pause();
    let duration = 0;
    const onMeta = () => { duration = v.duration || 0; };
    v.addEventListener("loadedmetadata", onMeta);
    if (v.readyState >= 1) onMeta();
    let last = 0;
    let seeking = false;
    const onSeeked = () => { seeking = false; };
    v.addEventListener("seeked", onSeeked);
    const st = ScrollTrigger.create({
      trigger, start: "top bottom", end: "bottom top", scrub: 0.6,
      onUpdate: (self) => {
        if (!duration || seeking) return;
        const now = performance.now();
        if (now - last < 66) return;
        const t = (range[0] + self.progress * (range[1] - range[0])) * (duration - 0.05);
        if (Math.abs(v.currentTime - t) > 0.04) { last = now; seeking = true; v.currentTime = t; }
      },
    });
    return () => { v.removeEventListener("loadedmetadata", onMeta); v.removeEventListener("seeked", onSeeked); st.kill(); };
  }, [mode, parallax, triggerRef, range[0], range[1]]);

  return (
    <video
      ref={video}
      className={`media-fill ${className}`}
      style={{ ...style, transform: mode === "loop" ? "scale(1.14)" : undefined }}
      src={src}
      poster={poster}
      muted
      playsInline
      loop={mode === "loop"}
      preload={mode === "scrub" ? "auto" : "metadata"}
      aria-hidden="true"
    />
  );
}
