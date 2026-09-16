import { useEffect, useRef, useState } from "react";
import type { LegalDoc } from "../content/legal";
import { Eyebrow } from "../components/Eyebrow";
import { Words } from "../components/Words";
import { TransitionLink } from "../components/PageTransition";
import { useReveal } from "../hooks/useReveal";
import "./Legal.css";

/**
 * Shared layout for the privacy policy and the terms of use. The page is one CSS grid with named areas
 * and a sticky contents column; the article itself is a subgrid so every section's number sits in the
 * same gutter column as the headings above it. Section numbering is a CSS counter, the active entry in
 * the contents follows the reader through an IntersectionObserver, and the print stylesheet drops the
 * chrome so the document prints as a clean paper copy.
 */
export default function Legal({ doc }: { doc: LegalDoc }) {
  const page = useReveal<HTMLDivElement>();
  const article = useRef<HTMLElement>(null);
  const [active, setActive] = useState(doc.sections[0].id);

  useEffect(() => {
    const el = article.current;
    if (!el) return;
    const heads = Array.from(el.querySelectorAll<HTMLElement>("section[id]"));
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [doc]);

  return (
    <div ref={page} className="on-light legal" data-doc={doc.slug}>
      <header className="container lg-hero">
        <div className="lg-hero-copy">
          <Eyebrow>{doc.eyebrow}</Eyebrow>
          <h1 className="serif lg-title"><Words text={doc.title} /></h1>
          <p className="body-lg lg-intro reveal">{doc.intro}</p>
        </div>
        <dl className="lg-meta reveal">
          <div><dt className="mono">Last updated</dt><dd>{doc.updated}</dd></div>
          <div><dt className="mono">Also read</dt><dd><TransitionLink to={doc.otherTo} className="lg-switch">{doc.otherLabel}<span aria-hidden="true">→</span></TransitionLink></dd></div>
        </dl>
        <ul className="lg-glance reveal" aria-label="At a glance">
          {doc.glance.map((g) => (
            <li key={g.label}><span className="mono lg-glance-k">{g.label}</span><span className="lg-glance-v">{g.value}</span></li>
          ))}
        </ul>
      </header>

      <div className="container lg-body">
        <nav className="lg-toc" aria-label="Contents">
          <span className="mono lg-toc-head">Contents</span>
          <ol>
            {doc.sections.map((s) => (
              <li key={s.id} className={active === s.id ? "is-active" : ""}>
                <a href={`#${s.id}`}>{s.heading}</a>
              </li>
            ))}
          </ol>
          <button type="button" className="lg-print mono" onClick={() => window.print()}>Print this page</button>
        </nav>

        <article ref={article} className="lg-article">
          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="lg-section">
              <h2 className="serif lg-h">{s.heading}</h2>
              <div className="lg-text">
                {s.paras.map((p, i) => <p key={i}>{p}</p>)}
                {s.list && <ul>{s.list.map((li, i) => <li key={i}>{li}</li>)}</ul>}
              </div>
            </section>
          ))}
          <footer className="lg-end">
            <span className="mono muted">End of document</span>
            <TransitionLink to={doc.otherTo} className="lg-switch">{doc.otherLabel}<span aria-hidden="true">→</span></TransitionLink>
          </footer>
        </article>
      </div>
    </div>
  );
}
