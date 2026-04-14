"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Palette, Rocket, Mouse } from "lucide-react";
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
        background: "linear-gradient(135deg, #2563eb, #db2777)",
        borderRadius: "2px",
        verticalAlign: "middle",
        marginLeft: "4px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.08s",
        boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
      }}
    />
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

// Lines of text to type
const TYPED_LINES = [
  "We Don't Build Websites.",
  "We Build Experiences.",
];

/* ── Floating Item Component ── */
function FloatingItem({ icon: Icon, delay = 0, x = 0, y = 0, scale = 1, rotation = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        scale: [scale, scale * 1.05, scale],
        y: [y, y - 15, y],
        rotate: [rotation, rotation + 8, rotation - 8, rotation]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        delay, 
        ease: "easeInOut" 
      }}
      style={{
        position: "absolute",
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        zIndex: 5,
        pointerEvents: "none"
      }}
    >
      <div style={{
        padding: "1rem",
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(12px)",
        border: "1.5px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        color: "rgba(255,255,255,0.7)"
      }}>
        <Icon size={24} />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const typed = useTypewriter(TYPED_LINES, 30, 1200);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => { 
      pos.current = { x: e.clientX, y: e.clientY }; 
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--x", `${e.clientX}px`);
        spotlightRef.current.style.setProperty("--y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const tick = () => {
      cx += (pos.current.x - cx) * 0.035;
      cy += (pos.current.y - cy) * 0.035;
      if (contentRef.current) {
        const dx = (cx - window.innerWidth / 2) / window.innerWidth * 15;
        const dy = (cy - window.innerHeight / 2) / window.innerHeight * 12;
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
        background: "#020205",
        contain: "paint",
      }}
    >
      {/* ── Interactive Spotlight Glow ── */}
      <div 
        ref={spotlightRef}
        aria-hidden 
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(124, 58, 237, 0.05), transparent 80%)",
          zIndex: 1,
          pointerEvents: "none"
        } as any}
      />

      {/* ── Nebula Glow (Blue & Purple) ── */}
      <div 
        aria-hidden 
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 60%), radial-gradient(circle at 15% 45%, rgba(30, 58, 138, 0.08) 0%, transparent 55%), radial-gradient(circle at 50% 60%, rgba(30, 64, 175, 0.06) 0%, transparent 60%)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      {/* ── Galaxy Canvas ── */}
      {mounted && <GalaxyCanvas />}

      {/* ── Floating Interactive Elements ── */}
      {mounted && (
        <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}>
          <FloatingItem icon={Code2} x={-420} y={-180} delay={0} scale={1.1} rotation={15} />
          <FloatingItem icon={Palette} x={450} y={-100} delay={1.5} scale={1} rotation={-12} />
          <FloatingItem icon={Rocket} x={-500} y={150} delay={3} scale={0.9} rotation={25} />
        </div>
      )}

      {/* ── Vignette ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 65% at 50% 50%, transparent 20%, #000 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />


      {/* ── Foreground content ── */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "920px",
          width: "100%",
          padding: "0 1.5rem",
          textAlign: "center",
          willChange: "transform",
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: '"Outfit", "Inter", sans-serif'
        }}
      >
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "100px",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.8rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "3rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
          }}
        >
          Webis &mdash; The New Standard
        </motion.div>

        {/* Typewriter Headline */}
        <motion.div {...fadeUp(0)}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: "clamp(2.8rem, 9.5vw, 6.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              marginBottom: "1.5rem",
              minHeight: "2.2em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.15rem",
              color: "#ffffff"
            }}
          >
            {/* Line 1 */}
            <span style={{ display: "block", minHeight: "1.1em" }}>
              {typed[0]}
              {typed[1] === "" && <Cursor />}
            </span>

            {/* Line 2 — gradient */}
            <span
              style={{
                display: "block",
                minHeight: "1.1em",
                background: "linear-gradient(135deg, #2563eb, #c026d3, #db2777)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                visibility: typed[1] ? "visible" : "hidden",
                opacity: typed[1] ? 1 : 0,
                transition: "opacity 0.6s ease"
              }}
            >
              {typed[1] || "Placeholder"} 
              {!allDone && typed[1] && <Cursor />}
            </span>
          </h1>
        </motion.div>

        {/* Sub-headline Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: allDone ? 0.7 : 0, y: allDone ? 0 : 15 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "rgba(255,255,255,0.8)",
            maxWidth: "600px",
            lineHeight: 1.6,
            fontWeight: 500,
            margin: "0 auto",
            letterSpacing: "-0.01em"
          }}
        >
          We architect lightning-fast digital solutions that turn global visitors into brand advocates. <strong>Book a free consultation</strong> about your idea today.
        </motion.p>

        {/* CTA — fade */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: allDone ? 1 : 0, y: allDone ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "1.25rem", 
            justifyContent: "center",
            marginTop: "3.5rem"
          }}
        >
          <Magnetic amount={0.2}>
            <motion.a
              href="/#contact"
              className="btn btn-white"
              style={{ 
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem", 
                padding: "1.1rem 3.2rem",
                gap: "0.75rem", 
                borderRadius: "100px",
                overflow: "hidden",
                border: "1.5px solid rgba(255,255,255,0.2)",
                boxShadow: "0 10px 40px rgba(124, 58, 237, 0.15)",
                color: "white",
                textDecoration: "none",
                fontWeight: 700
              }}
              whileHover={{ scale: 1.05, y: -4, boxShadow: "0 20px 60px rgba(124, 58, 237, 0.25)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                Book Free Consultation <ArrowRight size={20} />
              </span>
            </motion.a>
          </Magnetic>

          <Magnetic amount={0.1}>
            <motion.a
              href="/#portfolio"
              className="glass-panel"
              style={{ 
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem", 
                padding: "1.1rem 3.2rem", 
                borderRadius: "100px",
                color: "white",
                textDecoration: "none",
                fontWeight: 700,
                border: "1.5px solid rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(24px)",
                boxShadow: "inset 0 0 16px rgba(255, 255, 255, 0.05)"
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -4, 
                background: "rgba(255,255,255,0.08)",
                boxShadow: "0 20px 60px rgba(255,255,255,0.05)" 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>
                View Portfolio
              </span>
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>

    </section>
  );
}

