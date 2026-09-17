import { useState, type FormEvent } from "react";
import { EnvelopeSimple, Globe, Phone, MapPin, Check, Warning } from "@phosphor-icons/react";
import { contactPage, contact, sectors } from "../content/site";
import { Button } from "../components/Button";
import { Words } from "../components/Words";
import { useReveal } from "../hooks/useReveal";
import { clip, silence } from "../video";
import "./Contact.css";

export default function Contact() {
  const page = useReveal<HTMLDivElement>();
  const [state, setState] = useState<"idle" | "sent" | "error">("idle");
  const f = contactPage.fields;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [`Name: ${data.get("name")}`, `Organization: ${data.get("org")}`, `Email: ${data.get("email")}`, `Sector: ${data.get("sector")}`, "", `${data.get("message")}`].join("\n");
    try {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent("New enquiry from ctecconsults.com")}&body=${encodeURIComponent(body)}`;
      setState("sent");
    } catch { setState("error"); }
  };

  return (
    <div ref={page}>
      <section className="container ct-grid">
        <div className="ct-left">
          <div className="stack">
            <h1 className="serif h-hero"><Words text={contactPage.headline[0]} /><Words text={contactPage.headline[1]} italic /></h1>
            <p className="body-lg reveal">{contactPage.body}</p>
          </div>
          {state === "sent" ? (
            <div className="ct-note ct-ok reveal is-in"><Check size={18} color="#3A6B4A" /> {contactPage.thanks}</div>
          ) : (
            <form className="ct-form reveal" onSubmit={submit}>
              <label className="field"><span className="mono lbl">{f.name.label}</span><input name="name" required placeholder={f.name.placeholder} /></label>
              <label className="field"><span className="mono lbl">{f.org.label}</span><input name="org" placeholder={f.org.placeholder} /></label>
              <label className="field"><span className="mono lbl">{f.email.label}</span><input name="email" type="email" required placeholder={f.email.placeholder} /></label>
              <label className="field"><span className="mono lbl">{f.sector.label}</span>
                <select name="sector" defaultValue="">
                  <option value="" disabled>{f.sector.placeholder}</option>
                  {sectors.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </label>
              <label className="field field-full"><span className="mono lbl">{f.message.label}</span><textarea name="message" rows={5} required placeholder={f.message.placeholder} /></label>
              <div><Button type="submit">{contactPage.cta}</Button></div>
              {state === "error" && <div className="ct-note ct-err field-full"><Warning size={18} color="#E0A030" /> {contactPage.error}</div>}
            </form>
          )}
        </div>
        <aside className="ct-right reveal">
          <div className="ct-media"><video ref={silence} className="media-fill" src={clip("/video/city-dusk.mp4")} poster="/img/city-dusk-poster.jpg" muted playsInline loop autoPlay aria-hidden="true" /><div className="grain" /></div>
          <Button href={`https://wa.me/${contact.phoneIntl}`}>{contactPage.whatsapp}</Button>
          <div className="ct-details mono muted">
            <a href={`mailto:${contact.email}`}><EnvelopeSimple size={16} color="#E0A030" /> {contact.email}</a>
            <span><Globe size={16} color="#E0A030" /> {contact.web}</span>
            <a href={`tel:+${contact.phoneIntl}`}><Phone size={16} color="#E0A030" /> {contact.phone}</a>
            <span><MapPin size={16} color="#E0A030" /> {contact.location}</span>
          </div>
        </aside>
      </section>
    </div>
  );
}
