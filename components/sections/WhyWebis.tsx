"use client";

import { motion } from "framer-motion";
import { Zap, Palette, Shield, Globe, MessageCircle, TrendingUp, ArrowRight } from "lucide-react";
import { whyWebis } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ElementType> = { Zap, Palette, Shield, Globe, MessageCircle, TrendingUp };

const palette = [
  { bg: "rgba(37, 99, 235, 0.1)", color: "#1e3a8a" }, // Deep Blue
  { bg: "rgba(14, 165, 233, 0.1)", color: "#0ea5e9" }, // Blue
  { bg: "rgba(30, 64, 175, 0.1)", color: "#1e40af" },  // Mid Blue
  { bg: "rgba(15, 23, 42, 0.1)", color: "#0f172a" },   // Obsidian
  { bg: "rgba(37, 99, 235, 0.1)", color: "#1e3a8a" },  // Deep Blue
  { bg: "rgba(14, 165, 233, 0.1)", color: "#0ea5e9" }, // Blue
];

export default function WhyWebis() {
  return (
    <section
      id="why"
      className="section"
      style={{
        background: "var(--bg-card)",
        position: "relative",
        contain: "paint",
      }}
    >
      {/* Decorative rings */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-180px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          border: "1px solid var(--border-subtle)",
        }}
      />

      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">

          {/* LEFT CONTENT */}
          <ScrollReveal direction="left">
            <div className="max-w-xl lg:max-w-[440px] mb-8 lg:mb-0">
              <SectionHeading
                label="Why Webis"
                title="Your Success is"
                titleHighlight="Our Metric"
                subtitle="We're not just a vendor. We're your digital growth partner, focused on measurable results and engineering excellence."
                align="left"
              />

              {/* KPI BOXES */}
              <div className="flex flex-col gap-4 mt-8">
                {[
                  { label: "2-hour", sub: "average reply time" },
                  { label: "95+", sub: "PageSpeed score on every site" },
                  { label: "100%", sub: "satisfaction or we fix it free" },
                ].map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -4, boxShadow: "var(--shadow-glow)" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                    style={{
                      background: "var(--bg-card)", 
                      border: "1px solid var(--border-subtle)",
                      boxShadow: "var(--shadow-card)",
                      borderRadius: "16px",
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                    }}
                  >
                    <span style={{ fontWeight: 900, fontSize: "1.6rem", color: "var(--text-primary)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
                      {kpi.label}
                    </span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem", fontWeight: 500, lineHeight: 1.3 }}>
                      {kpi.sub}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: "2rem" }}>
                <a 
                  href="/#contact" 
                  className="btn btn-white"
                  style={{ 
                    position: "relative",
                    overflow: "hidden",
                    color: "white",
                    fontWeight: 800
                  }}
                >
                  {/* Liquid Wave Effect */}
                  <motion.div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(circle at 50% 120%, rgba(255,255,255,0.2) 0%, transparent 60%)",
                    }}
                    animate={{
                      y: [0, -8, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    Build Your Digital Future <ArrowRight size={18} />
                  </span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {whyWebis.map((item, i) => {
              const Icon = iconMap[item.icon] || Zap;
              const c = palette[i % palette.length];

              return (
                <ScrollReveal key={item.title} delay={i * 0.05}>
                  <motion.div
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                      e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                    }}
                    whileHover={{ y: -6, boxShadow: "0 22px 60px rgba(0,0,0,0.18)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: "easeOut" as const }}
                    className="h-full p-6 lg:p-8 rounded-[24px] relative overflow-hidden group stable-gpu-surface"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      boxShadow: "var(--shadow-card)",
                    } as any}
                  >
                    {/* Spotlight */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(30, 58, 138, 0.08), transparent 80%)",
                        zIndex: 1
                      }}
                    />

                    <div style={{ position: "relative", zIndex: 2 }}>
                      <div
                        className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: c.bg,
                          color: c.color,
                        }}
                      >
                        <Icon size={20} strokeWidth={2.5} />
                      </div>

                      <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.625rem" }}>
                        {item.title}
                      </h3>

                      <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.7, fontWeight: 500 }}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}