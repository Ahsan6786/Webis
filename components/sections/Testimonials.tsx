"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

// Galaxy-themed avatar gradients — enhanced for vibrant "colourful circle" look
const avatarGradients: Record<string, string> = {
  "from-blue-500 to-indigo-500":   "linear-gradient(135deg, #2563eb, #7c3aed, #db2777)",
  "from-rose-500 to-pink-500":     "linear-gradient(135deg, #f43f5e, #fb923c, #facc15)",
  "from-violet-500 to-purple-500": "linear-gradient(135deg, #8b5cf6, #ec4899, #f43f5e)",
  "from-emerald-500 to-teal-500":  "linear-gradient(135deg, #10b981, #06b6d4, #3b82f6)",
  "from-sky-500 to-blue-500":      "linear-gradient(135deg, #0ea5e9, #2563eb, #1d4ed8)",
};

const swipeThreshold = 50;

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const goTo = (next: number, dir: number) => { setDirection(dir); setIdx(next); };
  const prev = () => goTo(idx === 0 ? testimonials.length - 1 : idx - 1, -1);
  const next = () => goTo(idx === testimonials.length - 1 ? 0 : idx + 1, 1);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, idx]);

  const t = testimonials[idx];
  const gradient = avatarGradients[t.gradient] ?? "var(--gradient-brand)";

  const variants: Variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -50 : 50 }),
  };

  const slideTransition = { duration: 0.5, ease: "easeOut" as const };

  return (
    <section id="testimonials" className="section" style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden", contain: "paint" }}>
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "700px", height: "350px", background: "radial-gradient(ellipse, var(--glow-primary) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
        <ScrollReveal>
          <SectionHeading label="Client Love" title="What Our Clients" titleHighlight="Say" subtitle="Don't take our word for it — here's what our clients have to share." align="center" className="mb-14" />
        </ScrollReveal>

        <div style={{ maxWidth: "800px", margin: "0 auto" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div style={{ position: "relative", height: "460px", display: "flex", alignItems: "center" }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ ...slideTransition, boxShadow: { duration: 0.3 } }}
                data-theme="light"
                whileHover={{ y: -6, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "24px",
                  padding: "3rem",
                  textAlign: "center",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem",
                  userSelect: "none", willChange: "transform, opacity, box-shadow",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  inset: 0
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={(_, info) => setDragStart(info.point.x)}
                onDragEnd={(_, info) => {
                  if (dragStart !== null) {
                    const delta = info.point.x - dragStart;
                    if (delta < -swipeThreshold) next();
                    else if (delta > swipeThreshold) prev();
                    setDragStart(null);
                  }
                }}
              >
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--brand-glow-b)", border: "1px solid var(--border-accent)", color: "var(--brand-primary)" }}>
                  <Quote size={18} />
                </div>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={15} fill="#000000" color="#000000" />)}
                </div>
                <blockquote style={{ fontSize: "clamp(1rem, 2.2vw, 1.15rem)", fontWeight: 500, lineHeight: 1.75, color: "var(--text-primary)", fontStyle: "italic", margin: 0, maxWidth: "640px" }}>
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ position: "relative" }}>
                    {/* Colourful Ring Effect */}
                    <div style={{
                      position: "absolute",
                      inset: -3,
                      borderRadius: "50%",
                      background: gradient,
                      opacity: 0.4,
                      filter: "blur(6px)",
                    }} />
                    <div style={{ 
                      width: "56px", 
                      height: "56px", 
                      borderRadius: "50%", 
                      background: gradient, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      fontWeight: 800, 
                      fontSize: "1rem", 
                      color: "white", 
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      position: "relative",
                      zIndex: 1,
                      border: "2px solid rgba(255,255,255,0.8)"
                    }}>
                      {t.initials}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
            <motion.button onClick={prev} aria-label="Previous" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--border-subtle)", background: "var(--bg-card)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ChevronLeft size={16} />
            </motion.button>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {testimonials.map((_, i) => (
                <motion.button key={i} onClick={() => goTo(i, i > idx ? 1 : -1)} aria-label={`Go to ${i + 1}`} animate={{ width: i === idx ? 24 : 7, backgroundColor: i === idx ? "var(--brand-primary)" : "var(--border-subtle)" }} transition={{ duration: 0.3 }} style={{ height: 7, borderRadius: "4px", border: "none", cursor: "pointer" }} />
              ))}
            </div>
            <motion.button onClick={next} aria-label="Next" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--border-subtle)", background: "var(--bg-card)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
