import { Suspense, lazy } from "react";
import { home, contact, footer } from "../content/site";

const ParticleMark = lazy(() => import("../three/ParticleMark"));
import { Button } from "./Button";
import { useReveal } from "../hooks/useReveal";
import "./ContactCard.css";

export function ContactCard() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="container cc-wrap">
      <div className="cc reveal">
        <div className="cc-media">
          <Suspense fallback={null}>
            <ParticleMark targets={[{ kind: "logo" }, { kind: "text", text: footer.heading }, { kind: "text", text: "→", italic: false }]} cycle={4200} width={2.3} />
          </Suspense>
          <div className="grain" />
        </div>
        <div className="cc-body">
          <h2 className="serif h-2">{home.contactHeadline[0]}<br /><em>{home.contactHeadline[1]}</em></h2>
          <p className="body-lg">{home.contactBody}</p>
          <Button to="/contact">Start a conversation</Button>
          <div className="cc-meta mono muted"><span>{contact.email}</span><span>{contact.phone}</span><span>{contact.location}</span></div>
        </div>
      </div>
    </section>
  );
}
