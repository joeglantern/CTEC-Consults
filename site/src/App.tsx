import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionProvider } from "./components/PageTransition";
import { Nav } from "./components/Nav";
import { MenuOverlay } from "./components/MenuOverlay";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { Cursor } from "./components/Cursor";
import { meta } from "./content/site";
import { reduceMotion } from "./hooks/useReveal";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Approach from "./pages/Approach";
import Sectors from "./pages/Sectors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import { privacy, terms } from "./content/legal";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { pathname, hash } = useLocation();
  const [menu, setMenu] = useState(false);
  const [ready, setReady] = useState(false);
  const onLoaded = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (reduceMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const m = meta[pathname] ?? meta["/"];
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", m.description);
    requestAnimationFrame(() => ScrollTrigger.refresh());
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 700);
    }
  }, [pathname, hash]);

  useEffect(() => {
    document.body.classList.toggle("is-loading", !ready);
  }, [ready]);

  return (
    <TransitionProvider>
      <Loader onDone={onLoaded} />
      <Cursor />
      <Nav onMenu={() => setMenu(true)} />
      <MenuOverlay open={menu} onClose={() => setMenu(false)} />
      <main className={ready ? "is-ready" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal doc={privacy} />} />
          <Route path="/terms" element={<Legal doc={terms} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </TransitionProvider>
  );
}
