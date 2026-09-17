/**
 * Picks which cut of a clip to load.
 *
 * The masters are 1080p at 4 to 13 Mbps, which a phone cannot buffer inside the second
 * or two a clip is on screen during a scroll. It sits on its poster frame instead, which
 * is why video looked broken on mobile rather than merely slow. Phones get a 960 wide cut
 * with a hard bitrate ceiling from public/video/m/, which starts playing straight away.
 *
 * The choice is made once, on the size of the screen rather than the size of the window,
 * so rotating the phone does not swap every source mid scroll.
 */
const small = typeof window !== "undefined" && Math.min(window.screen?.width ?? 9999, window.screen?.height ?? 9999) <= 820;

export function clip(src: string): string {
  if (!small || !src.startsWith("/video/")) return src;
  return src.replace("/video/", "/video/m/");
}

/**
 * Some phones refuse to start muted video until the page has been touched, and in Low
 * Power Mode they refuse indefinitely. This retries on every interaction rather than
 * only the first, because the first tap often happens before a given clip has scrolled
 * into view, and only for clips that are on screen and meant to be running.
 */
export function unlockVideoOnFirstTouch(): () => void {
  if (typeof window === "undefined") return () => {};
  let last = 0;
  const kick = () => {
    const now = Date.now();
    if (now - last < 400) return;   // a tap is one gesture, not a burst
    last = now;
    document.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
      if (!v.paused || v.dataset.scrub === "1") return;
      if (!(v.autoplay || v.loop)) return;
      const r = v.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight || r.width === 0) return;
      v.play().catch(() => {});
    });
  };
  const opts = { passive: true } as AddEventListenerOptions;
  window.addEventListener("touchstart", kick, opts);
  window.addEventListener("pointerdown", kick, opts);
  return () => {
    window.removeEventListener("touchstart", kick);
    window.removeEventListener("pointerdown", kick);
  };
}

/**
 * Makes a video eligible for inline autoplay on iOS.
 *
 * React applies `muted` as a DOM property rather than writing the attribute into the
 * markup, but Safari reads the attribute when it decides whether a video may start by
 * itself. It therefore sees an unmuted autoplaying video, refuses, and draws a play
 * badge over it. Setting the attributes on the element itself, in a ref callback that
 * runs before paint, is what actually satisfies the rule.
 */
export function silence(el: HTMLVideoElement | null): void {
  if (!el) return;
  el.muted = true;
  el.defaultMuted = true;
  el.setAttribute("muted", "");
  el.setAttribute("playsinline", "");
  el.setAttribute("webkit-playsinline", "");
  el.setAttribute("disableremoteplayback", "");
}
