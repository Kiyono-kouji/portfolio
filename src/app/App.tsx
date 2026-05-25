"use client";

import {Navigation }  from "../components/Navigation";
import { Hero } from "../components/Hero";
import { Experience } from "../components/Experience";
import { TechStack } from "../components/TechStack";
import { Projects } from "../components/Projects";
import { Contact } from "../components/Contact";
import  BackgroundGrid  from "../components/BackgroundGrid";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BackgroundGrid />
      <Navigation />    
      <Hero />
      <Projects />
      <Experience />
      <TechStack />
      <Contact />
    </div>
  );
}