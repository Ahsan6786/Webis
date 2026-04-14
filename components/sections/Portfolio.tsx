"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { projects } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const gradients: Record<string, string> = {
  "from-amber-400 to-orange-500": "var(--gradient-cta)",
  "from-rose-400 to-pink-500": "var(--gradient-brand)",
  "from-violet-400 to-indigo-500": "var(--gradient-text)",
  "from-emerald-400 to-cyan-500": "var(--gradient-cta)",
  "from-sky-400 to-blue-500": "var(--gradient-brand)",
  "from-fuchsia-400 to-rose-400": "var(--gradient-text)",
};

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="section"
      style={{
        background: "var(--bg-surface)",
        position: "relative",
        contain: "paint",
      }}
    >
      {/* Glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "5%",
          top: "20%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(ellipse, var(--glow-blue) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 1.5rem" }}>
        <ScrollReveal>
          <SectionHeading
            label="Our Work"
            title="Projects That"
            titleHighlight="Speak Results"
            subtitle="Every project tells a story of collaboration, craft, and measurable impact."
            align="center"
            className="mb-16"
          />
        </ScrollReveal>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {projects.map((project, i) => {
            const gradient =
              gradients[project.gradient] ?? "var(--gradient-brand)";

            return (
              <ScrollReveal key={project.slug} delay={i * 0.07} direction="up">
                <Link
                  href={`/portfolio/${project.slug}`}
                  style={{ display: "block", height: "100%" }}
                >
                  <motion.div
                    className="stable-gpu-surface"
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "20px",
                      overflow: "hidden",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      boxShadow: "var(--shadow-card)",
                      position: "relative",
                    } as any}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                      e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                    }}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 22px 60px rgba(0,0,0,0.18)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Spotlight */}
                    <div 
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "radial-gradient(350px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(124, 58, 237, 0.05), transparent 80%)",
                        pointerEvents: "none",
                        zIndex: 1
                      }}
                    />
                    {/* TOP HERO */}
                    {project.image ? (
                      <div
                        style={{
                          height: "190px",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "190px",
                          background: gradient,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {/* Background Art fallback */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage:
                              "radial-gradient(circle at 25% 55%, rgba(255,255,255,0.25) 0%, transparent 55%), radial-gradient(circle at 75% 25%, rgba(255,255,255,0.15) 0%, transparent 45%)",
                            zIndex: 1,
                          }}
                        />

                        <div
                          style={{
                            position: "absolute",
                            bottom: "-6px",
                            right: "14px",
                            fontSize: "7rem",
                            fontWeight: 900,
                            color: "rgba(255,255,255,0.08)",
                          }}
                        >
                          {project.title[0]}
                        </div>

                        <div style={{ position: "absolute", top: 14, left: 14, zIndex: 2 }}>
                          <span
                            style={{
                              padding: "0.3rem 0.75rem",
                              borderRadius: "100px",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              color: "white",
                              background: "rgba(0,0,0,0.35)",
                            }}
                          >
                            {project.category}
                          </span>
                        </div>

                        <div style={{ position: "absolute", bottom: 14, left: 14, zIndex: 2 }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem",
                              padding: "0.3rem 0.75rem",
                              borderRadius: "100px",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              color: "white",
                              background: "rgba(0,0,0,0.4)",
                            }}
                          >
                            <TrendingUp size={10} /> ↑{project.stats.increase}{" "}
                            {project.stats.metric}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* BODY */}
                    <div
                      style={{
                        padding: "1.4rem 1.6rem 1.6rem",
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <h3
                        style={{
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          color: "var(--text-primary)", 
                          marginBottom: "0.5rem",
                        }}
                      >
                        {project.title}
                      </h3>

                      <p
                        style={{
                          fontSize: "0.83rem",
                          color: "var(--text-secondary)", 
                          flex: 1,
                          marginBottom: "1rem",
                        }}
                      >
                        {project.description}
                      </p>

                      <div style={{ paddingBottom: "1.25rem" }} />

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        View Case Study <ArrowRight size={13} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.35}>
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <motion.a 
              href="/#contact" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{ color: "white", fontWeight: 800 }}
            >
              Start Your Project <ArrowRight size={16} />
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}