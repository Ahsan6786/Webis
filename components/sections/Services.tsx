"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Code2, Layers, UtensilsCrossed } from "lucide-react";
import { services } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ElementType> = { Building2, Layers, UtensilsCrossed, Code2 };

const cardAccents: Record<string, { from: string; to: string; hoverGlow: string }> = {
  business:   { from: "#e879f9", to: "#a78bfa", hoverGlow: "rgba(232, 121, 249, 0.15)" },
  portfolio:  { from: "#f472b6", to: "#e879f9", hoverGlow: "rgba(244, 114, 182, 0.15)" },
  restaurant: { from: "#c084fc", to: "#f472b6", hoverGlow: "rgba(192, 132, 252, 0.15)" },
  webapp:     { from: "#d946ef", to: "#a855f7", hoverGlow: "rgba(217, 70, 239, 0.15)" },
};

function TimelineCard({ service, i }: { service: typeof services[0]; i: number }) {
  const isLeftOnDesktop = i % 2 === 0;
  const acc = cardAccents[service.id as keyof typeof cardAccents];
  const Icon = iconMap[service.icon];

  return (
    <div className="relative flex items-center w-full mb-12 sm:mb-20 last:mb-0 justify-end">
      {/* Inner row — mobile: left-aligned, desktop: alternating */}
      <div
        className={[
          "w-full flex items-center",
          // mobile: always push card to the right of the left-rail node
          "justify-end",
          // desktop: alternate row direction
          isLeftOnDesktop
            ? "md:flex-row md:justify-between"
            : "md:flex-row-reverse md:justify-between",
        ].join(" ")}
      >
        {/* Timeline node */}
        <div
          className="absolute left-[1.5rem] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full z-10 flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${acc.from}, ${acc.to})`,
            boxShadow: `0 0 20px ${acc.hoverGlow}, inset 0 2px 4px rgba(255,255,255,0.4)`,
            border: "4px solid var(--bg-primary)",
          }}
        >
          <Icon size={20} color="white" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }} />
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: isLeftOnDesktop ? -30 : 30, y: 15 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3.5rem)] p-8 sm:p-10 rounded-[32px] overflow-hidden"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            position: "relative",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent pointer-events-none opacity-20" />

          <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "0.08em" }}>
            PHASE 0{i + 1}
          </span>
          <h3 style={{ fontWeight: 700, fontSize: "1.45rem", color: "var(--text-primary)", marginTop: "0.5rem", marginBottom: "1rem", lineHeight: 1.3 }}>
            {service.title}
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem" }}>
            {service.description}
          </p>

          <motion.a
            href="/#contact"
            className="inline-flex items-center gap-2 text-[0.9rem] font-semibold tracking-wide w-fit border border-transparent pb-1"
            style={{ color: acc.from }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Start this phase <ArrowRight size={15} />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" style={{ background: "var(--bg-primary)", position: "relative", padding: "7rem 0 4rem", overflow: "hidden" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <SectionHeading
            label="Roadmap"
            title="Services Designed to"
            titleHighlight="Convert"
            subtitle="Follow our proven roadmap from business branding to full-scale web applications."
            align="center"
          />
        </div>

        {/* Roadmap Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[1.5rem] md:left-1/2 top-4 bottom-0 w-[2px] -translate-x-1/2 rounded-full overflow-hidden"
            style={{ background: "var(--border-subtle)" }}
          >
            <motion.div
              className="w-full absolute top-0 left-0"
              style={{
                height: "250px",
                background: "linear-gradient(to bottom, transparent, var(--brand-purple), var(--brand-blue), transparent)",
                opacity: 0.8,
              }}
              animate={{ y: ["-100%", "800%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className="relative z-10 flex flex-col">
            {services.map((svc, i) => (
              <TimelineCard key={svc.id} service={svc} i={i} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ textAlign: "center", marginTop: "5rem" }}
        >
          <motion.a
            href="/#contact"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.9rem 2.25rem",
              borderRadius: "100px", fontSize: "0.95rem", fontWeight: 600, gap: "0.5rem",
              background: "var(--bg-card)", color: "var(--text-primary)",
              border: "1px solid var(--border-accent)", textDecoration: "none",
              boxShadow: "var(--shadow-btn)",
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Ready to start your journey? Let&apos;s talk <ArrowRight size={17} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
