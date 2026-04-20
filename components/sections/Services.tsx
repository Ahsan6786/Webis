"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Code2, Layers, UtensilsCrossed, MessageCircle } from "lucide-react";
import { services } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ElementType> = { Building2, Layers, UtensilsCrossed, Code2, MessageCircle };

const cardAccents: Record<string, { from: string; to: string; hoverGlow: string }> = {
  business: { from: "#2563eb", to: "#1d4ed8", hoverGlow: "rgba(37, 99, 235, 0.25)" },
  portfolio: { from: "#7c3aed", to: "#6d28d9", hoverGlow: "rgba(124, 58, 237, 0.25)" },
  restaurant: { from: "#0ea5e9", to: "#0284c7", hoverGlow: "rgba(14, 165, 233, 0.25)" },
  webapp: { from: "#1e3a8a", to: "#1e40af", hoverGlow: "rgba(30, 58, 138, 0.25)" },
  chatbot: { from: "#3b82f6", to: "#6366f1", hoverGlow: "rgba(59, 130, 246, 0.25)" },
};

function TimelineCard({ service, i }: { service: typeof services[0]; i: number }) {
  const isLeftOnDesktop = i % 2 === 0;
  const acc = cardAccents[service.id as keyof typeof cardAccents];
  const Icon = iconMap[service.icon];

  return (
    <div className="relative flex items-center w-full mb-12 sm:mb-20 last:mb-0 justify-end">
      <div
        className={[
          "w-full flex items-center",
          "justify-end",
          isLeftOnDesktop
            ? "md:flex-row md:justify-between"
            : "md:flex-row-reverse md:justify-between",
        ].join(" ")}
      >
        {/* Timeline node */}
        <div
          className="absolute left-[1.5rem] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full z-10"
          style={{
            background: `linear-gradient(135deg, ${acc.from}, ${acc.to})`,
            boxShadow: `0 0 20px ${acc.hoverGlow}`,
            border: "4px solid var(--bg-primary)",
          }}
        >
          <Icon size={20} color="white" />
        </div>

        {/* ✅ PREMIUM CARD */}
        <motion.div
          initial={{ opacity: 0, x: isLeftOnDesktop ? -30 : 30, y: 15 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
            e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
          }}
          whileHover={{ y: -6, boxShadow: "0 22px 60px rgba(0,0,0,0.18)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3.5rem)] p-8 sm:p-10 rounded-[28px] relative overflow-hidden"
          style={{
            background: "var(--bg-card)", 
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            willChange: "transform, box-shadow",
            transform: "translateZ(0)",
          } as any}
        >
          {/* Spotlight Effect */}
          <div 
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(30, 64, 175, 0.05), transparent 80%)",
              pointerEvents: "none",
              zIndex: 1
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>


            <h3 style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--text-primary)", marginTop: "0.5rem", letterSpacing: "-0.02em" }}>
              {service.title}
            </h3>

            <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.75rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
              {service.description}
            </p>

            <motion.a
              href="/#contact"
              style={{ color: "var(--text-primary)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem" }}
              whileHover={{ x: 5 }}
            >
              Let’s talk <ArrowRight size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      style={{
        background: "var(--bg-primary)",
        padding: "7rem 0 4rem",
        position: "relative",
        contain: "paint",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          title="Services Designed to"
          titleHighlight="Convert"
          subtitle="Follow our proven process from business branding to full-scale web applications."
          align="center"
        />
        
        {/* Visually hidden SEO keywords for Google indexing */}
        <div style={{ 
          position: "absolute", 
          width: "1px", 
          height: "1px", 
          padding: "0", 
          margin: "-1px", 
          overflow: "hidden", 
          clip: "rect(0, 0, 0, 0)", 
          whiteSpace: "nowrap", 
          borderWidth: "0" 
        }}>
          Best web development agency in Pune, web development services India, top website maker Pune.
        </div>

        <div className="relative max-w-5xl mx-auto mt-16">
          {/* Timeline line */}
          <div
            className="absolute left-[1.5rem] md:left-1/2 top-0 bottom-0 w-[2px]"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />

          {services.map((svc, i) => (
            <TimelineCard key={svc.id} service={svc} i={i} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <a 
            href="/#contact" 
            className="btn btn-primary"
            style={{ 
              position: "relative",
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
                y: [0, -8, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.5rem", color: "white", fontWeight: 800 }}>
              Let’s talk <ArrowRight size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}