"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { pricingTiers } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Pricing() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="pricing"
      className="section"
      style={{
        background: "var(--bg-surface)",
        position: "relative",
        overflow: "hidden",
        contain: "paint",
      }}
    >
      {/* Subtle Monochrome Glows */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-80px",
          right: "10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(0, 0, 0, 0.03) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "12%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(0, 0, 0, 0.02) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <ScrollReveal>
          <SectionHeading
            label="Pricing"
            title="Transparent Pricing."
            titleHighlight="No Surprises."
            subtitle="Every plan delivers premium value. Starting at ₹2,999 — because great web design shouldn't be a luxury."
            align="center"
            className="mb-16"
          />
        </ScrollReveal>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {pricingTiers.map((tier, i) => (
            <ScrollReveal key={tier.id} delay={i * 0.1} direction="up">
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.005,
                  boxShadow: "0 20px 48px rgba(0,0,0,0.18)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="stable-gpu-surface"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "var(--bg-card)",
                  border: tier.popular
                    ? "1px solid var(--brand-primary)"
                    : "1px solid var(--border-subtle)",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
                  position: "relative",
                } as any}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                  e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                }}
              >
                {/* Spotlight Effect */}
                <div 
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(30, 58, 138, 0.05), transparent 85%)",
                    pointerEvents: "none",
                    zIndex: 1
                  }}
                />
                {/* Popular ribbon */}
                {tier.popular && (
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #ff4d00, #ff8700, #ff4d00)",
                      padding: "0.6rem",
                      textAlign: "center",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    <Sparkles size={11} /> Most Popular <Sparkles size={11} />
                  </div>
                )}

                <div
                  className="p-5 md:p-8"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  {/* Name */}
                  <h3
                    className="text-lg md:text-xl"
                    style={{
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      zIndex: 2,
                    }}
                  >
                    {tier.name}
                  </h3>

                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", zIndex: 2 }}>
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="my-4 md:my-6" style={{ zIndex: 2 }}>
                    <span
                      className="text-4xl md:text-5xl lg:text-[2.8rem]"
                      style={{
                        fontWeight: 900,
                        color: "var(--text-primary)",
                      }}
                    >
                      {tier.price}
                    </span>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {tier.period}
                    </p>
                  </div>

                  <div
                    style={{
                      height: "1px",
                      background: "var(--border-subtle)",
                      marginBottom: "1.5rem",
                      zIndex: 2,
                    }}
                  />

                  {/* Features */}
                  <ul style={{ flex: 1, zIndex: 2 }}>
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          gap: "0.6rem",
                          fontSize: "0.85rem",
                          color: "var(--text-primary)",
                          marginBottom: "0.6rem",
                        }}
                      >
                        <Check size={14} color="var(--brand-primary)" /> {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="/#contact"
                    className="btn btn-primary"
                    style={{ 
                      position: "relative",
                      marginTop: "1.5rem", 
                      width: "100%",
                      overflow: "hidden",
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
                        y: [0, -6, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span style={{ position: "relative", zIndex: 1 }}>
                      {tier.cta} <ArrowRight size={14} />
                    </span>
                  </a>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.8rem",
              color: "#777",
              marginTop: "2rem",
            }}
          >
            All prices are one-time unless noted.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}