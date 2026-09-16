/**
 * Talks to the boot screen that lives inline in index.html.
 *
 * The split of work matters. The boot screen covers only the part nothing else can:
 * downloading and parsing the app bundle. It hands over the moment the intro is on
 * screen and ready to play. Everything heavier, the webfonts and the first hero frame,
 * loads underneath the intro, and the intro holds on its final frame until they land.
 *
 * That way the intro is never skipped and never cut short, and the page is never
 * revealed before it can actually be shown.
 */

declare global {
  interface Window {
    __boot?: { set(v: number): void; finish(): Promise<void> };
  }
}

/** Resolves when the image is decoded, and also when it fails, so one bad asset cannot stall anything. */
function decode(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

/** The bundle is parsed and React is running. */
export function appMounted(): void {
  window.__boot?.set(0.62);
}

/** Waits two frames so React has actually painted before the boot screen lifts. */
export function painted(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
}

/** Fills the bar, lifts the boot screen and resolves once it is gone. */
export function handOver(): Promise<void> {
  window.__boot?.set(1);
  return window.__boot?.finish() ?? Promise.resolve();
}

/**
 * The heavy things, loaded while the intro plays. Resolves when the page is genuinely
 * ready to be looked at: fonts resolved, the mark decoded, and on the home page the
 * first frame of the hero video.
 */
export function assetsReady(pathname: string): Promise<unknown> {
  const jobs: Promise<unknown>[] = [
    document.fonts ? document.fonts.ready : Promise.resolve(),
    decode("/logo.svg"),
  ];
  if (pathname === "/") jobs.push(decode("/img/circuit-poster.jpg"));
  return Promise.allSettled(jobs);
}
