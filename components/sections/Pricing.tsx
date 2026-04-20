"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { pricingTiers } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Pricing() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pricingTiers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % pricingTiers.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + pricingTiers.length) % pricingTiers.length);

  return (
    <section
      id="pricing"
      className="section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        background: "var(--bg-surface)",
        position: "relative",
        overflow: "hidden",
        padding: "5rem 0"
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
        <ScrollReveal>
          <SectionHeading
            label="Pricing"
            title="Premium Value."
            titleHighlight="Simple Plans."
            subtitle="Compact, transparent plans designed for rapid growth and digital excellence."
            align="center"
            className="mb-8"
          />
        </ScrollReveal>

        <div style={{ position: "relative", maxWidth: "420px", margin: "0 auto" }}>
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide} 
            style={{ 
              position: "absolute", 
              left: "-15px", // Overlayed on mobile, further out on desktop
              top: "50%", 
              transform: "translateY(-50%)", 
              zIndex: 10, 
              width: "40px", 
              height: "40px", 
              borderRadius: "50%", 
              background: "var(--bg-card)", 
              border: "1px solid var(--border-subtle)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              cursor: "pointer", 
              color: "var(--text-primary)", 
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              backdropFilter: "blur(8px)"
            }}
            className="md:-left-20" // Move out on desktop
          >
            <ArrowRight style={{ transform: "rotate(180deg)" }} size={18} />
          </button>
          <button 
            onClick={nextSlide} 
            style={{ 
              position: "absolute", 
              right: "-15px", 
              top: "50%", 
              transform: "translateY(-50%)", 
              zIndex: 10, 
              width: "40px", 
              height: "40px", 
              borderRadius: "50%", 
              background: "var(--bg-card)", 
              border: "1px solid var(--border-subtle)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              cursor: "pointer", 
              color: "var(--text-primary)", 
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              backdropFilter: "blur(8px)"
            }}
            className="md:-right-20"
          >
            <ArrowRight size={18} />
          </button>

          <div style={{ overflow: "hidden", borderRadius: "28px", padding: "8px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                {pricingTiers.map((tier, i) => i === currentIndex && (
                  <motion.div
                    key={tier.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "28px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      borderTop: "6px solid var(--brand-primary)", // Added bold top border
                      boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
                      position: "relative",
                      height: "600px", // Fixed uniform height
                      overflow: "hidden"
                    } as any}
                  >
                    {tier.popular && (
                      <div style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--brand-purple))", padding: "0.5rem", textAlign: "center", fontSize: "0.65rem", fontWeight: 900, color: "white", textTransform: "uppercase", letterSpacing: "0.05em", position: "absolute", top: 0, left: 0, right: 0, zIndex: 2 }}>
                        <Sparkles size={10} /> Most Popular
                      </div>
                    )}

                    <div style={{ padding: "2rem 1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 style={{ fontWeight: 900, fontSize: "1.75rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>{tier.name}</h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: 1.4 }}>{tier.description}</p>

                      <div style={{ marginBottom: "1.5rem" }}>
                        <span style={{ fontWeight: 950, fontSize: "2.75rem", color: "var(--text-primary)", letterSpacing: "-0.04em" }}>{tier.price}</span>
                        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginLeft: "0.4rem" }}>/ {tier.period}</span>
                      </div>

                      <div style={{ height: "1px", background: "var(--border-subtle)", marginBottom: "1.25rem" }} />

                      <ul style={{ flex: 1, listStyle: "none", padding: 0, margin: 0 }}>
                        {tier.features.map((f) => (
                          <li key={f} style={{ display: "flex", gap: "0.6rem", fontSize: "0.85rem", color: "var(--text-primary)", marginBottom: "0.6rem", alignItems: "flex-start" }}>
                            <Check size={14} color="var(--brand-primary)" style={{ marginTop: "2px", flexShrink: 0 }} /> <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <a href="/#contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", padding: "1rem", borderRadius: "14px", background: tier.popular ? "var(--brand-primary)" : "var(--bg-secondary)", color: tier.popular ? "white" : "var(--text-primary)", fontWeight: 800, textDecoration: "none", marginTop: "1.5rem", border: tier.popular ? "none" : "1px solid var(--border-subtle)" }}>
                        {tier.cta} <ArrowRight size={16} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
            {pricingTiers.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)} style={{ width: currentIndex === idx ? "24px" : "8px", height: "8px", borderRadius: "100px", background: currentIndex === idx ? "var(--brand-primary)" : "var(--border-accent)", border: "none", cursor: "pointer", transition: "all 0.3s ease" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}