import { partners } from "../content/site";
import "./LogoStrip.css";

/**
 * Endless partner strip for the hero. No tiles, no backgrounds: each logo floats on the footage as a piece
 * of frosted glass cut to its own silhouette (the logo file is used as a mask over a glass gradient), and
 * the real full-colour logo fades up in its place on hover. Renders nothing until the partners list has
 * entries, so it never shows placeholders. The row is duplicated once so the marquee wraps without a seam.
 */
export function LogoStrip() {
  if (!partners.length) return null;
  const row = [...partners, ...partners];
  return (
    <div className="lstrip" aria-label="Partners">
      <div className="lstrip-track" style={{ ["--n" as string]: partners.length }}>
        {row.map((p, i) => {
          const dup = i >= partners.length;
          const logo = (
            <span className="lstrip-logo">
              <img className="lstrip-color" src={p.logo} alt={dup ? "" : p.name} loading="lazy" draggable={false} />
              <span className="lstrip-glass" style={{ ["--logo" as string]: `url("${p.logo}")` }} aria-hidden="true">
                <span className="lstrip-shine" />
              </span>
            </span>
          );
          return p.url
            ? <a key={`${p.name}-${i}`} href={p.url} target="_blank" rel="noreferrer" className="lstrip-item" aria-hidden={dup} tabIndex={dup ? -1 : 0}>{logo}</a>
            : <span key={`${p.name}-${i}`} className="lstrip-item" aria-hidden={dup}>{logo}</span>;
        })}
      </div>
    </div>
  );
}
