import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? "bg-card/80 shadow-[0_0_30px_rgba(102,252,241,0.15)] border border-primary/30"
          : "bg-card/40 border border-border"
      }`}
    >
      <ul className="flex gap-4 sm:gap-8 items-center">
        {["Projects", "Experience", "Stack", "Contact"].map((item) => (
          <li key={item}>
            <button
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(102,252,241,0.8)]" />
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
