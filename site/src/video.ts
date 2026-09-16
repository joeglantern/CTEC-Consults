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
 * Some phones refuse to start muted video until the page has been touched once, and in
 * Low Power Mode they refuse until then no matter what. This retries every clip that is
 * supposed to be running, on the first interaction, and then gets out of the way.
 */
export function unlockVideoOnFirstTouch(): () => void {
  if (typeof window === "undefined") return () => {};
  let spent = false;
  const kick = () => {
    if (spent) return;
    spent = true;
    document.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
      if (v.dataset.scrub === "1" || !v.paused) return;
      // only wake the ones that are meant to be playing by themselves
      if (v.autoplay || v.loop) v.play().catch(() => {});
    });
  };
  const opts = { passive: true } as AddEventListenerOptions;
  window.addEventListener("touchstart", kick, opts);
  window.addEventListener("pointerdown", kick, opts);
  window.addEventListener("scroll", kick, opts);
  return () => {
    window.removeEventListener("touchstart", kick);
    window.removeEventListener("pointerdown", kick);
    window.removeEventListener("scroll", kick);
  };
}
