import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "2024 - Present",
    title: "Informatics Full-Stack Developer",
    organization: "Ciputra University Surabaya",
    description: "Informatics student that specializes in full-stack development. Have a strong foundation in software engineering principles and practices.",
    icon: GraduationCap,
    color: "from-primary to-secondary",
  },
  {
    year: "2024",
    title: "Internship",
    organization: "Apple Foundation",
    description: "Created an app that utilizes pomodoro technique in one month. Utilized Challenge Based Learning (CBL) in the application development",
    icon: Briefcase,
    color: "from-secondary to-chart-3",
  },
];

export function Experience({ isAppMounted = false }: { isAppMounted?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAppMounted) return;

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      // Animate subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      // Animate timeline line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Animate each timeline item
      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      if (items) {
        items.forEach((item, index) => {
          const isEven = index % 2 === 0;

          // Main card animation
          gsap.fromTo(
            item.querySelectorAll(".timeline-card"),
            {
              x: isEven ? -100 : 100,
              y: 60,
              opacity: 0,
              rotationZ: isEven ? -8 : 8,
              scale: 0.85,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              rotationZ: 0,
              scale: 1,
              duration: 1.2,
              delay: index * 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );

          // Icon animation
          const iconWrapper = item.querySelector(".timeline-icon-wrapper");
          gsap.fromTo(
            iconWrapper,
            {
              scale: 0,
              rotation: -180,
              opacity: 0,
            },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.2 + 0.3,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );

          // Glow effect on icon
          const iconGlow = item.querySelector(".icon-glow");
          gsap.fromTo(iconGlow,
            { boxShadow: "0 0 10px rgba(251, 191, 36, 0)" },
            {
              boxShadow: "0 0 30px rgba(251, 191, 36, 0.6)",
              duration: 1,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }
          );

          // Year badge animation
          const yearBadges = item.querySelectorAll(".year-badge");
          gsap.fromTo(
            yearBadges,
            { opacity: 0, scale: 0.6 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: index * 0.2 + 0.4,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );

          // Title animation
          const expTitles = item.querySelectorAll(".exp-title");
          gsap.fromTo(
            expTitles,
            { opacity: 0, x: -20, filter: "blur(10px)" },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.7,
              delay: index * 0.2 + 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );

          // Description animation
          const expDescriptions = item.querySelectorAll(".exp-description");
          gsap.fromTo(
            expDescriptions,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: index * 0.2 + 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );

          // Enhanced hover animation
          const cards = item.querySelectorAll(".timeline-card");
          cards.forEach((card) => {
            const onMouseEnter = () => {
              gsap.timeline()
                .to(
                  card,
                  {
                    y: -15,
                    scale: 1.02,
                    boxShadow: "0 30px 60px rgba(251, 191, 36, 0.2)",
                    duration: 0.4,
                    ease: "power2.out",
                  },
                  0
                )
                .to(
                  iconWrapper,
                  {
                    rotation: 360,
                    scale: 1.15,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                  },
                  0.1
                );

              const glowBg = card.querySelector(".card-glow");
              gsap.to(glowBg, {
                opacity: 0.6,
                scale: 1.1,
                duration: 0.4,
                ease: "power2.out",
              });
            };

            const onMouseLeave = () => {
              gsap.timeline()
                .to(
                  card,
                  {
                    y: 0,
                    scale: 1,
                    boxShadow: "0 0 0px rgba(251, 191, 36, 0)",
                    duration: 0.4,
                    ease: "power2.out",
                  },
                  0
                )
                .to(
                  iconWrapper,
                  {
                    rotation: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                  },
                  0
                );

              const glowBg = card.querySelector(".card-glow");
              gsap.to(glowBg, {
                opacity: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
              });
            };

            card.addEventListener("mouseenter", onMouseEnter);
            card.addEventListener("mouseleave", onMouseLeave);

            cleanups.push(() => {
              card.removeEventListener("mouseenter", onMouseEnter);
              card.removeEventListener("mouseleave", onMouseLeave);
            });
          });
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [isAppMounted]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-0 animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-0 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-4">
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 animate-gradient">
              Journey
            </span>
          </h2>
          <p ref={subtitleRef} className="text-muted-foreground font-mono text-lg">
            Crafting solutions and building expertise
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Animated center line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary -translate-x-1/2 origin-top"
            style={{ transformOrigin: "top center" }}
          />

          {/* Timeline items */}
          <div className="space-y-16">
            {timeline.map((item, idx) => {
              const IconComponent = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="timeline-item relative flex items-stretch"
                >
                  {/* Left side - even indices */}
                  {isEven && (
                    <div className="hidden md:flex flex-1 flex-col justify-center items-end pr-16">
                      <div className="timeline-card relative group w-full max-w-sm">
                        <div className="card-glow absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 transition-opacity duration-300" />
                        <div className="relative bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent rounded-2xl pointer-events-none" />

                          <div className="relative z-10">
                            <div className="year-badge inline-block mb-3 px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-xs font-mono rounded-full border border-primary/50">
                              {item.year}
                            </div>
                            <h3 className="exp-title text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                              {item.title}
                            </h3>
                            <p className="text-secondary text-sm font-mono mb-3">{item.organization}</p>
                            <p className="exp-description text-muted-foreground text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Center icon */}
                  <div className="flex flex-col items-center justify-start md:justify-center">
                    <div className="timeline-icon-wrapper relative z-20">
                      <div className="icon-glow w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_20px_rgba(251,191,36,0.5)]" />
                      <div className="absolute inset-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-background" />
                      </div>
                    </div>
                  </div>

                  {/* Right side - odd indices */}
                  {!isEven && (
                    <div className="hidden md:flex flex-1 flex-col justify-center items-start pl-16">
                      <div className="timeline-card relative group w-full max-w-sm">
                        <div className="card-glow absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl blur-xl opacity-0 transition-opacity duration-300" />
                        <div className="relative bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent rounded-2xl pointer-events-none" />

                          <div className="relative z-10">
                            <div className="year-badge inline-block mb-3 px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-xs font-mono rounded-full border border-primary/50">
                              {item.year}
                            </div>
                            <h3 className="exp-title text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                              {item.title}
                            </h3>
                            <p className="text-secondary text-sm font-mono mb-3">{item.organization}</p>
                            <p className="exp-description text-muted-foreground text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile card */}
                  <div className="md:hidden flex-1 ml-8">
                    <div className="timeline-card relative group w-full">
                      <div className="card-glow absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 transition-opacity duration-300" />
                      <div className="relative bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent rounded-2xl pointer-events-none" />

                        <div className="relative z-10">
                          <div className="year-badge inline-block mb-3 px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-xs font-mono rounded-full border border-primary/50">
                            {item.year}
                          </div>
                          <h3 className="exp-title text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-secondary text-sm font-mono mb-3">{item.organization}</p>
                          <p className="exp-description text-muted-foreground text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
