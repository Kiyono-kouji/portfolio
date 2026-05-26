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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    ScrollTrigger.refresh();
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