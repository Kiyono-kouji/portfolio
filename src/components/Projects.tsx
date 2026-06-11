"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Layers, Code2 } from "lucide-react";

// ─── Project Data ────────────────────────────────────────────────────────────
const projects = [
  {
    title: "TanamIn",
    role: "Full-Stack Developer",
    techStack: ["Kotlin", "Jetpack Compose", "Postgre"],
    description:
      "Developed a comprehensive android application for financial tracking and investment education. Engineered core modules including a Wallet system for transaction management and a gamified educational Course interface.",
    icon: Layers,
    image: "/images/tanamIn.webp",
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
    image: "/images/cotha.webp",
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
    image: "/images/pintarSkinCare.webp",
    accentFrom: "from-chart-3",
    accentTo: "to-primary",
    number: "03",
  },
];

// ─── Shared Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  idx,
}: {
  project: (typeof projects)[number];
  idx: number;
}) {
  const imageLeft = idx % 2 === 0;

  return (
    <div
      className="proj-card group relative flex-shrink-0 w-full lg:w-[72vw] xl:w-[58vw]"
    >
      {/* Glow backdrop */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.accentFrom}/20 ${project.accentTo}/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div
        className={`
          relative flex flex-col
          lg:flex-row lg:h-[400px]
          ${!imageLeft ? "lg:flex-row-reverse" : ""}
          bg-card/50 backdrop-blur-xl border border-border rounded-3xl
          overflow-hidden hover:border-primary/50 transition-all duration-300
          hover:shadow-[0_0_50px_rgba(251,191,36,0.15)]
        `}
      >
        {/* ── Image panel ─────────────────────────────────────── */}
        <div className="relative w-full h-56 sm:h-64 lg:w-1/2 lg:h-full flex-shrink-0 overflow-hidden bg-black/50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80 lg:hidden z-10 pointer-events-none" />
          <div
            className={`hidden lg:block absolute inset-0 ${
              imageLeft ? "bg-gradient-to-r" : "bg-gradient-to-l"
            } from-transparent to-card/70 z-10 pointer-events-none`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.accentFrom}/10 ${project.accentTo}/10 z-10 pointer-events-none mix-blend-overlay`}
          />
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>

        {/* ── Text panel ──────────────────────────────────────── */}
        <div className="relative flex flex-col justify-center flex-1 p-5 sm:p-6 lg:p-8 overflow-hidden">
          {/* Floating orb */}
          <div
            className={`absolute -bottom-10 -right-10 lg:${
              imageLeft ? "-right-10" : "-left-10"
            } lg:top-1/2 lg:-translate-y-1/2 w-48 h-48 bg-gradient-to-br ${project.accentFrom}/15 ${project.accentTo}/5 rounded-full blur-3xl pointer-events-none`}
          />

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
}

// ─── Component ───────────────────────────────────────────────────────────────
export function Projects({ isAppMounted = false }: { isAppMounted?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // ── SSR-safe viewport detection ───────────────────────────────────────────
  // `isMobile` starts false to match SSR (no hydration mismatch).
  // `isAppMounted` starts false so GSAP bails out on the very first commit —
  //   before useLayoutEffect has read the real viewport width.
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── GSAP animations ──────────────────────────────────────────────────────
  useGSAP(
    () => {
      const section = sectionRef.current;
      // Do nothing on the first commit — useLayoutEffect hasn't run yet so
      // isMobile is still false. Returning here prevents the pinned
      // ScrollTrigger from being created before we know the real viewport.
      if (!section || !isAppMounted) return;

      // Header entrance — runs on both mobile and desktop
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

      if (isMobile) {
        // ── Mobile: staggered fade-in cards, no pinning ─────────────────────
        const cards = mobileCardsRef.current.filter(Boolean);
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
              delay: i * 0.08,
            }
          );
        });
      } else {
        // ── Desktop: pinned horizontal scroll ───────────────────────────────
        const track = trackRef.current;
        if (!track) return;

        gsap.fromTo(
          track,
          { x: () => window.innerWidth },
          {
            x: () => -track.scrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 0.2,
              start: "top top",
              end: () => `+=${window.innerWidth + track.scrollWidth}`,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [isAppMounted, isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-background"
      style={isMobile ? {} : { minHeight: "100vh" }}
    >
      {/* ── Ambient background glows ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
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
          {isMobile ? "Swipe through the work ↓" : "Scroll to explore the work ↓"}
        </p>
      </div>

      {isMobile ? (
        // ── Mobile: vertical stack ──────────────────────────────────────────
        <div className="relative z-10 flex flex-col items-center gap-8 px-4 sm:px-8 lg:px-12 pb-24">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              ref={(el) => { mobileCardsRef.current[idx] = el; }}
              className="w-full max-w-2xl opacity-0"
            >
              <ProjectCard project={project} idx={idx} />
            </div>
          ))}
        </div>
      ) : (
        // ── Desktop: horizontal scroll track ───────────────────────────────
        <div className="relative z-10 overflow-hidden" style={{ minHeight: "100vh" }}>
          <div
            ref={trackRef}
            className="flex flex-nowrap items-center gap-8 px-[8vw] will-change-transform"
            style={{ width: "max-content" }}
          >
            {projects.map((project, idx) => (
              <ProjectCard key={project.title} project={project} idx={idx} />
            ))}

            {/* End padding – breathing room after last project */}
            <div className="flex-shrink-0 w-[8vw]" aria-hidden="true" />
          </div>
        </div>
      )}
    </section>
  );
}
