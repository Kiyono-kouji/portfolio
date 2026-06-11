import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Code, Server, Database, Cpu, GitBranch } from "lucide-react";


const techCategories = [
  {
    icon: Smartphone,
    title: "Native Mobile",
    skills: ["SwiftUI", "SwiftData", "Kotlin", "Jetpack Compose"],
  },
  {
    icon: Code,
    title: "Web Frontend",
    skills: ["React", "Tailwind CSS", "Bootstrap"],
  },
  {
    icon: Server,
    title: "Backend Frameworks",
    skills: ["Laravel", "PHP"],
  },
  {
    icon: Database,
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "Firebase"],
  },
  {
    icon: Cpu,
    title: "Core Languages",
    skills: ["C++", "Python", "Java"],
  },
  {
    icon: GitBranch,
    title: "Tools & Version Control",
    skills: ["Git", "GitHub"],
  },
];

export function TechStack({ isAppMounted = false }: { isAppMounted?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRingsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAppMounted) return;

    const ctx = gsap.context(() => {
      const rings = orbitRingsRef.current?.querySelectorAll(".orbit-ring");
      if (rings) {
        gsap.fromTo(
          rings,
          {
            scale: 0,
            opacity: 0,
            rotation: -180,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              once: true,
            },
          }
        );
        // Infinite rotation is now handled by CSS animation (slow-spin keyframe)
        // so GSAP doesn’t need to tick for it at all.
      }

      const cards = cardsRef.current?.querySelectorAll(".tech-card");
      if (cards) {
        gsap.fromTo(
          cards,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
            rotation: -15,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isAppMounted]);

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Tech Stack &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Architecture
            </span>
          </h2>
          <p className="text-muted-foreground font-mono">Expertise across the full technology spectrum</p>
        </div>

        <div className="relative">
          <div ref={orbitRingsRef} className="absolute inset-0 flex items-center justify-center">
            <div className="orbit-ring w-64 h-64 border-2 border-primary/20 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.2)]" style={{ animation: 'slow-spin 60s linear infinite' }} />
            <div className="orbit-ring absolute w-96 h-96 border-2 border-primary/15 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.15)]" style={{ animation: 'slow-spin 90s linear infinite' }} />
            <div className="orbit-ring absolute w-[32rem] h-[32rem] border border-primary/10 rounded-full shadow-[0_0_40px_rgba(251,191,36,0.1)]" style={{ animation: 'slow-spin 120s linear infinite' }} />
          </div>

          <div ref={cardsRef} className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCategories.map((category, idx) => (
              <div key={category.title} className="tech-card group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors group-hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-mono">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-tag px-3 py-1.5 bg-muted/50 backdrop-blur-sm rounded-full text-sm border border-border hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_10px_rgba(251,191,36,0.3)] transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
