"use client";

import { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { Experience } from "../components/Experience";
import { TechStack } from "../components/TechStack";
import { Projects } from "../components/Projects";
import { Contact } from "../components/Contact";
import BackgroundGrid from "../components/BackgroundGrid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Single registration point — all child components import from gsap directly
// (plugin is already registered by the time any child effect runs)
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Integrate Lenis with GSAP ticker for frame-perfect sync with ScrollTrigger
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    setMounted(true);
    // Refresh ScrollTrigger after Lenis is set up so pin calculations are correct
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BackgroundGrid />
      <Navigation />
      <Hero />
      <Projects isAppMounted={mounted} />
      <Experience isAppMounted={mounted} />
      <TechStack isAppMounted={mounted} />
      <Contact isAppMounted={mounted} />
    </div>
  );
}
