import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Terminal, Code2, Sparkles } from "lucide-react";
import DecryptedText from "./DecryptedText";
import FaultyTerminal from "./FaultyTerminal";

export function Hero() {
  const [terminalFinished, setTerminalFinished] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 225, y: 225 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-28 md:py-0 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1.6}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#FBBF24"
          mouseReact={false}
          mouseStrength={0.5}
          pageLoadAnimation={true}
          brightness={1}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-mono">Full-Stack Developer</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Kenneth
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
              Jonathan Halim
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="relative w-full max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl backdrop-blur-sm border border-primary/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(102,252,241,0.15)]">
              <div className="bg-card/50 rounded-2xl p-5 sm:p-6 min-h-[320px] sm:min-h-[400px] flex flex-col backdrop-blur-sm border border-border relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-chart-3" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>

                <div className={`space-y-3 font-mono text-sm transition-opacity duration-500 ${terminalFinished && isHovered ? 'opacity-20' : 'opacity-100'}`}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-primary">$</span>
                    <span className="text-muted-foreground">
                      <DecryptedText text="./deploy --production" delay={300} />
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-2"
                  >
                    <Code2 className="w-4 h-4 text-secondary" />
                    <span className="text-secondary">
                      <DecryptedText text="Building application..." delay={700} />
                    </span>
                  </motion.div>

                  <div className="pl-6 text-muted-foreground space-y-1">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                    >
                      <DecryptedText text="✓ Compiled successfully" delay={1100} />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      <DecryptedText text="✓ Optimized for production" delay={1400} />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.7 }}
                    >
                      <DecryptedText text="✓ Tests passed: 47/47" delay={1700} />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0 }}
                    className="flex items-center gap-2"
                  >
                    <Terminal className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-primary">
                      <DecryptedText 
                        text="Deployment complete" 
                        delay={2000} 
                      />
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.3 }}
                    className="flex items-center gap-2 text-xs pt-2 border-t border-border/30 text-muted-foreground"
                  >
                    <span className="text-secondary font-bold">INFO:</span>
                    <span>
                      <DecryptedText 
                        text="Interactive reveal loaded. Hover the terminal!" 
                        delay={2300} 
                        speed={10}
                        onComplete={() => setTerminalFinished(true)}
                      />
                    </span>
                  </motion.div>
                </div>

                {/* Interactive Spotlight Reveal Layer */}
                {terminalFinished && (
                  <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={(e) => {
                      setIsHovered(true);
                      if (containerRef.current) {
                        const rect = containerRef.current.getBoundingClientRect();
                        setMousePos({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                        });
                      }
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                    className="absolute inset-0 z-20 cursor-crosshair overflow-hidden rounded-2xl"
                  >
                    {/* The spotlight image reveal */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-out"
                      style={{
                        backgroundImage: `url('/images/mainPicture.jpg')`,
                        opacity: isHovered ? 1 : 0,
                        WebkitMaskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
                        maskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
                      }}
                    />
                  </div>
                )}

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
