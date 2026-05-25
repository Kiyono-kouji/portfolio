"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Github, Linkedin, Mail, ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Config — swap these out with your real details ──────────────────────────
const EMAIL    = "kjonathan08@student.ciputra.ac.id";
const GITHUB   = "https://github.com/Kiyono-kouji";
const LINKEDIN = "https://www.linkedin.com/in/kenneth-jonathan-halim-945580390/";

// ─── Social link definitions ──────────────────────────────────────────────────
const socials = [
  {
    id: "email",
    label: "Email",
    sub: "Drop me a line",
    href: `mailto:${EMAIL}`,
    icon: Mail,
    gradient: "from-primary to-secondary",
    shadow: "hover:shadow-[0_0_35px_rgba(251,191,36,0.25)]",
    border: "hover:border-primary/60",
  },
  {
    id: "github",
    label: "GitHub",
    sub: "Browse my code",
    href: GITHUB,
    icon: Github,
    gradient: "from-secondary to-chart-3",
    shadow: "hover:shadow-[0_0_35px_rgba(251,191,36,0.18)]",
    border: "hover:border-secondary/60",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    sub: "Let's connect",
    href: LINKEDIN,
    icon: Linkedin,
    gradient: "from-chart-3 to-primary",
    shadow: "hover:shadow-[0_0_35px_rgba(251,191,36,0.18)]",
    border: "hover:border-chart-3/60",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const emailRef   = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  // ── Copy-to-clipboard handler ─────────────────────────────────────────────
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── GSAP entrance animations ──────────────────────────────────────────────
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(subRef.current,     { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .fromTo(emailRef.current,   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .fromTo(
          cardsRef.current?.querySelectorAll(".social-card") ?? [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12 },
          "-=0.4"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* ── Ambient glows ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.4s" }}
        />
      </div>

      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center gap-12">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Available for opportunities
          </div>

          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold leading-tight opacity-0"
          >
            Let's Build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
              Something
            </span>{" "}
            Together
          </h2>

          <p
            ref={subRef}
            className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed opacity-0"
          >
            I'm currently looking for new opportunities, freelance projects, or
            just to connect with fellow developers. Drop me a line!
          </p>
        </div>

        {/* ── Email copy card ───────────────────────────────────────────── */}
        <div ref={emailRef} className="w-full opacity-0">
          <button
            onClick={handleCopy}
            aria-label="Copy email address"
            className="group w-full relative flex items-center justify-between gap-4 px-7 py-5 bg-card/50 backdrop-blur-xl border border-border rounded-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(251,191,36,0.15)] overflow-hidden"
          >
            {/* Sliding gradient fill on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Left: icon + email text */}
            <div className="relative flex items-center gap-4">
              <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/30">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground font-mono mb-0.5">Professional Email</p>
                <p className="text-sm md:text-base font-mono text-foreground font-medium tracking-wide">
                  {EMAIL}
                </p>
              </div>
            </div>

            {/* Right: copy / copied state */}
            <div className="relative flex-shrink-0">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="copied"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-xl border border-primary/40 text-sm font-mono font-semibold"
                  >
                    <Check className="w-4 h-4" />
                    Copied!
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-muted/50 text-muted-foreground rounded-xl border border-border group-hover:border-primary/40 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-200 text-sm font-mono"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </div>

        {/* ── Social link cards ─────────────────────────────────────────── */}
        <div
          ref={cardsRef}
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.id}
                href={s.href}
                target={s.id !== "email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`social-card group relative flex flex-col items-start gap-3 p-5 bg-card/50 backdrop-blur-xl border border-border rounded-2xl transition-all duration-300 ${s.border} ${s.shadow} overflow-hidden opacity-0`}
              >
                {/* Hover gradient fill */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`relative p-3 bg-gradient-to-br ${s.gradient} rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.2)]`}>
                  <Icon className="w-5 h-5 text-background" />
                </div>

                {/* Text + arrow */}
                <div className="relative flex flex-col items-start">
                  <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-200">
                    {s.label}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono mt-0.5">
                    {s.sub}
                  </span>
                </div>

                {/* Arrow icon top-right */}
                <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </a>
            );
          })}
        </div>

        {/* ── Footer note ───────────────────────────────────────────────── */}
        <p className="text-muted-foreground font-mono text-xs opacity-60">
          © {new Date().getFullYear()} · Crafted with precision and passion.
        </p>
      </div>
    </section>
  );
}
