"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Code2, Layers } from "lucide-react";

// Register both plugins once, at module level
gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Project Data ────────────────────────────────────────────────────────────
const projects = [
  {
    title: "TanamIn",
    role: "Full-Stack Developer",
    techStack: ["Kotlin", "Jetpack Compose", "Postgre"],
    description:
      "Developed a comprehensive android application for financial tracking and investment education. Engineered core modules including a Wallet system for transaction management and a gamified educational Course interface.",
    icon: Layers,
    image: "/images/tanamIn.png",
    accentFrom: "from-primary",
    accentTo: "to-secondary",
    number: "01",
  },
  {
    title: "COTHA",
    role: "Full-Stack Developer",
    techStack: ["Laravel", "MySQL", "Bootstrap"],
    description:
      "Spearheaded the complete redesign and modernization of the COTHA website. Leveraged modern Laravel tools and SQL for robust backend data management, paired with a custom Bootstrap implementation to deliver a refreshed, responsive UI.",
    icon: Code2,
    image: "/images/cotha.png",
    accentFrom: "from-secondary",
    accentTo: "to-chart-3",
    number: "02",
  },
  {
    title: "PintarSkinCare",
    role: "Full-Stack Developer",
    techStack: ["Laravel", "Tailwind CSS"],
    description:
      "Developed the official web-based landing page for the PintarSkinCare application. Utilized Laravel for the backend infrastructure and Tailwind CSS to craft a highly responsive, modern frontend designed to drive user acquisition.",
    icon: Code2,
    image: "/images/pintarSkinCare.png",
    accentFrom: "from-chart-3",
    accentTo: "to-primary",
    number: "03",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // ── 1. Header entrance ────────────────────────────────────────────────
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );

      // ── 2. Pinned horizontal scroll ───────────────────────────────────────
      //  Journey: fully off-screen RIGHT → sweeps left → fully off-screen LEFT
      //
      //  Function-based values (the ()=> syntax) are re-evaluated by GSAP on
      //  every invalidateOnRefresh call, so phone / tablet / desktop all get
      //  their own correct travel distance with no stale values.

      gsap.fromTo(
        track,
        {
          // Start: track shifted so first card is just off the right edge
          x: () => window.innerWidth,
        },
        {
          // End: track shifted so last card has just cleared the left edge
          x: () => -track.scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.2,
            start: "top top",
            // Travel = distance from fromX to toX, recalculated each refresh
            end: () => `+=${window.innerWidth + track.scrollWidth}`,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-background"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Ambient background glows ─────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      {/* ── Section header ───────────────────────────────────────────────── */}
      <div className="relative z-10 pt-24 pb-10 text-center px-6">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold mb-3 opacity-0"
        >
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
            Projects
          </span>
        </h2>
        <p
          ref={subtitleRef}
          className="text-muted-foreground font-mono text-lg opacity-0"
        >
          Scroll to explore the work ↓
        </p>
      </div>

      {/* ── Horizontal track ─────────────────────────────────────────────── */}
      <div className="relative z-10 overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-nowrap items-center gap-8 px-[8vw] will-change-transform"
          style={{ width: "max-content" }}
        >
          {projects.map((project, idx) => {
            const IconComponent = project.icon;
            const imageLeft = idx % 2 === 0;

            return (
              <div
                key={project.title}
                // Width: nearly full-width on all sizes so cards feel immersive
                className="proj-card group relative flex-shrink-0 w-[88vw] md:w-[72vw] lg:w-[58vw]"
              >
                {/* Glow backdrop */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.accentFrom}/20 ${project.accentTo}/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/*
                  Card surface
                  ─ Mobile  : flex-col  → image stacked above text, height auto
                  ─ Desktop : flex-row / flex-row-reverse → side-by-side, fixed height
                */}
                <div
                  className={`
                    relative flex flex-col
                    md:flex-row md:h-[400px]
                    ${!imageLeft ? "md:flex-row-reverse" : ""}
                    bg-card/50 backdrop-blur-xl border border-border rounded-3xl
                    overflow-hidden hover:border-primary/50 transition-all duration-300
                    hover:shadow-[0_0_50px_rgba(251,191,36,0.15)]
                  `}
                >
                  {/* ── Image panel ─────────────────────────────────────── */}
                  {/*
                    Mobile  : full width, fixed height (h-52) — image contained inside
                    Desktop : half width (w-1/2), fills the card height
                  */}
                  <div className="relative w-full h-52 md:w-1/2 md:h-full flex-shrink-0 overflow-hidden bg-black/50">
                    {/* Fade toward text panel — direction switches per breakpoint */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80 md:hidden z-10 pointer-events-none" />
                    <div
                      className={`hidden md:block absolute inset-0 ${
                        imageLeft ? "bg-gradient-to-r" : "bg-gradient-to-l"
                      } from-transparent to-card/70 z-10 pointer-events-none`}
                    />
                    {/* Accent tint */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.accentFrom}/10 ${project.accentTo}/10 z-10 pointer-events-none mix-blend-overlay`}
                    />
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* ── Text panel ──────────────────────────────────────── */}
                  <div className="relative flex flex-col justify-center flex-1 p-6 md:p-8 overflow-hidden">
                    {/* Floating orb */}
                    <div
                      className={`absolute -bottom-10 -right-10 md:${
                        imageLeft ? "-right-10" : "-left-10"
                      } md:top-1/2 md:-translate-y-1/2 w-48 h-48 bg-gradient-to-br ${project.accentFrom}/15 ${project.accentTo}/5 rounded-full blur-3xl pointer-events-none`}
                    />

                    {/* Icon + external link row
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div
                        className={`p-3 bg-gradient-to-br ${project.accentFrom} ${project.accentTo} rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.3)]`}
                      >
                        <IconComponent className="w-5 h-5 text-background" />
                      </div>
                      <button
                        aria-label={`Open ${project.title}`}
                        className="p-2.5 bg-muted/50 backdrop-blur-sm rounded-full border border-border hover:border-primary hover:bg-primary/20 hover:-rotate-45 hover:scale-110 hover:shadow-[0_0_15px_rgba(251,191,36,0.35)] transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </button>
                    </div> */}

                    <div className="relative z-10">
                      <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-primary transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>

                      {/* Role badge */}
                      <p className="inline-flex w-fit items-center text-secondary font-mono text-xs mb-3 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30">
                        {project.role}
                      </p>

                      <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                        {project.description}
                      </p>

                      {/* Tech stack chips */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-muted/40 backdrop-blur-sm rounded-full text-xs font-mono border border-border hover:border-primary/50 hover:shadow-[0_0_10px_rgba(251,191,36,0.25)] transition-all duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* End padding – breathing room after last project */}
          <div className="flex-shrink-0 w-[8vw]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
