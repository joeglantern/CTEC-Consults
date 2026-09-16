import { Suspense, lazy } from "react";
import { footer, contact, services, sectors, nav } from "../content/site";
import { Button } from "./Button";
import { TransitionLink } from "./PageTransition";
import "./Footer.css";

const ParticleMark = lazy(() => import("../three/ParticleMark"));

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ftr">
      <div className="container ftr-grid">
        <div className="ftr-lead">
          <h2 className="serif h-2">{footer.heading}</h2>
          <p className="muted">{footer.line}</p>
          <Button href={`mailto:${contact.email}`}>{contact.email}</Button>
        </div>
        <div className="ftr-cols">
          <div className="ftr-col">
            <span className="mono muted">Pages</span>
            {nav.links.map((l) => <TransitionLink key={l.to} to={l.to}>{l.label}</TransitionLink>)}
            <TransitionLink to="/contact">Contact</TransitionLink>
          </div>
          <div className="ftr-col">
            <span className="mono muted">Services</span>
            {services.map((s) => <TransitionLink key={s.id} to={`/services#${s.id}`}>{s.name.split(" & ")[0].replace(" (MEL)", "")}</TransitionLink>)}
          </div>
          <div className="ftr-col">
            <span className="mono muted">Sectors</span>
            {sectors.map((s) => <TransitionLink key={s.id} to={`/sectors#${s.id}`}>{s.short}</TransitionLink>)}
          </div>
        </div>
      </div>
      <div className="ftr-stage">
        <Suspense fallback={null}><ParticleMark /></Suspense>
      </div>
      <div className="container ftr-legal">
        <div className="ftr-brand"><img src="/logo.svg" alt="" width="32" height="32" /><span className="muted">{footer.description}</span></div>
        <div className="ftr-meta mono muted"><span>© {year} CTEC Consults Limited. All rights reserved.</span><span>{contact.location}</span><TransitionLink to="/privacy">Privacy</TransitionLink><TransitionLink to="/terms">Terms</TransitionLink></div>
      </div>
    </footer>
  );
}
