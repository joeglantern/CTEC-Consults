import type { ReactNode } from "react";
import { TransitionLink } from "./PageTransition";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

type Props = { to?: string; href?: string; onClick?: () => void; children: ReactNode; className?: string; type?: "button" | "submit" };

export function Button({ to, href, onClick, children, className = "", type = "button" }: Props) {
  const inner = (
    <>
      <span>{children}</span>
      <span className="chip"><Arrow /></span>
    </>
  );
  if (to) return <TransitionLink to={to} className={`btn ${className}`}>{inner}</TransitionLink>;
  if (href) return <a href={href} className={`btn ${className}`} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>;
  return <button type={type} onClick={onClick} className={`btn ${className}`}>{inner}</button>;
}
