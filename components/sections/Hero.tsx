"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Magnetic from "@/components/animations/Magnetic";

const GalaxyCanvas = dynamic(() => import("@/components/animations/GalaxyCanvas"), { ssr: false });

/* ── Ultra Smooth Fast Typewriter hook ── */
function useTypewriter(lines: string[], cps = 120, pauseMs = 1200) {
  const [displayLines, setDisplayLines] = useState<string[]>(lines.map(() => ""));
  
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();
    let currentLine = 0;
    let currentChar = 0;
    let pauseUntil = 0;
    
    const msPerChar = 1000 / cps;

    const tick = (now: number) => {
      if (now < pauseUntil) {
        lastTime = now;
        rafId = requestAnimationFrame(tick);
        return;
      }
      
      const target = lines[currentLine];
      let delta = now - lastTime;
      
      if (delta >= msPerChar) {
        const charsToAdd = Math.floor(delta / msPerChar);
        currentChar += charsToAdd;
        // Don't accumulate too much lag
        lastTime += charsToAdd * msPerChar;
        
        if (currentChar > target.length) {
          currentChar = target.length;
        }
        
        setDisplayLines(prev => {
          const next = [...prev];
          next[currentLine] = target.slice(0, currentChar);
          return next;
        });
        
        if (currentChar >= target.length) {
          if (currentLine < lines.length - 1) {
            currentLine++;
            currentChar = 0;
            pauseUntil = now + pauseMs;
          } else {
            return; // Finished all lines
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [lines, cps, pauseMs]);

  return displayLines;
}

/* ── Blinking cursor ── */
function Cursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        background: "var(--gradient-brand)",
        borderRadius: "2px",
        verticalAlign: "middle",
        marginLeft: "4px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.08s",
        boxShadow: "0 0 10px var(--brand-accent)",
      }}
    />
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

// Lines of text to type — plain strings, styling applied separately
const TYPED_LINES = [
  "We Don't Build Websites.",
  "We Build Experiences.",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const typed = useTypewriter(TYPED_LINES, 30, 1200);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove, { passive: true });

    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const tick = () => {
      cx += (pos.current.x - cx) * 0.035;
      cy += (pos.current.y - cy) * 0.035;
      if (contentRef.current) {
        const dx = (cx - window.innerWidth / 2) / window.innerWidth * 10;
        const dy = (cy - window.innerHeight / 2) / window.innerHeight * 8;
        contentRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Determine if we're still typing on the last line
  const allDone = typed[TYPED_LINES.length - 1] === TYPED_LINES[TYPED_LINES.length - 1];

  return (
    <section
      id="hero"
      data-theme="dark"
      style={{
        position: "relative",
        minHeight: "100vh",
        minBlockSize: "100dvh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--hero-bg-deep)",
        contain: "paint",
      }}
    >
      {/* ── Nebula Glow (Blue & Purple) ── */}
      <div 
        aria-hidden 
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 80% 20%, rgba(217, 70, 239, 0.18) 0%, transparent 60%), radial-gradient(circle at 15% 45%, rgba(37, 99, 235, 0.12) 0%, transparent 55%), radial-gradient(circle at 50% 60%, rgba(236, 72, 153, 0.08) 0%, transparent 60%)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      {/* ── Galaxy Canvas ── */}
      {mounted && <GalaxyCanvas />}

      {/* ── Vignette ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 65% at 50% 50%, transparent 30%, var(--hero-vignette-deep) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />


      {/* ── Foreground content ── */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "820px",
          width: "100%",
          padding: "0 1.5rem",
          textAlign: "center",
          willChange: "transform",
          paddingTop: "4rem",
          paddingBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >


        {/* Typewriter Headline */}
        <motion.div {...fadeUp(0)}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: "clamp(2.6rem, 8.5vw, 5.8rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "2.75rem",
              minHeight: "2.4em",      // Increased space for stability
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.25rem"
            }}
          >
            {/* Line 1 */}
            <span style={{ display: "block", color: "#f0eaff", minHeight: "1.1em" }}>
              {typed[0]}
              {/* Show cursor on active line */}
              {typed[1] === "" && <Cursor />}
            </span>

            {/* Line 2 — gradient */}
            <span
              style={{
                display: "block",
                minHeight: "1.1em",
                background: "var(--gradient-cta)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                visibility: typed[1] ? "visible" : "hidden",
                opacity: typed[1] ? 1 : 0,
                transition: "opacity 0.4s ease"
              }}
            >
              {typed[1] || "Placeholder"} 
              {!allDone && typed[1] && <Cursor />}
            </span>
          </h1>
        </motion.div>

        {/* CTA — fade */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: allDone ? 1 : 0, y: allDone ? 0 : 20 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "1.5rem", 
            justifyContent: "center",
            marginTop: "3rem" // Improved spacing from headline
          }}
        >
          <Magnetic amount={0.25}>
            <motion.a
              href="/#contact"
              className="btn btn-primary"
              style={{ 
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.95rem", 
                padding: "1rem 2.8rem", // More prominent size
                gap: "0.75rem", 
                borderRadius: "16px",
                overflow: "hidden",
                background: "rgba(37, 99, 235, 0.2)", // Branded glass tint
                backdropFilter: "blur(32px) saturate(210%)",
                WebkitBackdropFilter: "blur(32px) saturate(210%)",
                border: "1.2px solid rgba(255,255,255,0.25)",
                boxShadow: "0 10px 40px rgba(37, 99, 235, 0.15), inset 0 0 16px rgba(255,255,255,0.1)",
                color: "white",
                textDecoration: "none",
                fontWeight: 700
              }}
              whileHover={{ scale: 1.05, y: -4, boxShadow: "0 15px 50px rgba(37, 99, 235, 0.25)" }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Liquid Wave Effect */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 50% 120%, rgba(255,255,255,0.25) 0%, transparent 60%)",
                }}
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                Get Started <ArrowRight size={20} />
              </span>
            </motion.a>
          </Magnetic>

          <Magnetic amount={0.15}>
            <motion.a
              href="/#portfolio"
              className="glass-panel"
              style={{ 
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.95rem", 
                padding: "1rem 2.8rem", 
                borderRadius: "16px",
                color: "var(--text-primary)",
                textDecoration: "none",
                fontWeight: 700,
                border: "1.2px solid rgba(255,255,255,0.25)",
                transition: "all 0.3s ease",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(32px) saturate(210%)",
                WebkitBackdropFilter: "blur(32px) saturate(210%)",
                boxShadow: "inset 0 0 16px rgba(255, 255, 255, 0.05)"
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -4, 
                background: "rgba(255,255,255,0.15)",
                boxShadow: "0 15px 50px rgba(255,255,255,0.1)" 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>
                View Work
              </span>
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>

    </section>
  );
}
