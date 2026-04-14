"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Link2 } from "lucide-react";
import { teamMembers } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TeamPreview() {
  return (
    <section id="our-team" className="section" style={{ background: "var(--bg-secondary)", overflow: "hidden" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 1.5rem" }}>
        <ScrollReveal>
          <SectionHeading
            label="The Dream Team"
            title="Meet the Minds Behind"
            titleHighlight="Webis"
            subtitle="A dedicated collective of full-stack innovators, design visionaries, and growth strategists committed to your success."
            align="center"
            className="mb-14"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, i) => (
            <ScrollReveal key={member.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "24px",
                  padding: "2rem",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
                }}
              >
                {/* Background Glow */}
                <div style={{
                  position: "absolute",
                  top: "-20%", left: "-20%",
                  width: "140%", height: "140%",
                  background: "radial-gradient(circle at center, var(--glow-primary) 0%, transparent 60%)",
                  opacity: 0.05,
                  pointerEvents: "none"
                }} />

                <div style={{
                  width: "110px", height: "110px",
                  borderRadius: "50%",
                  margin: "0 auto 1.5rem",
                  border: "3px solid var(--border-accent)",
                  padding: "4px",
                  background: "var(--gradient-brand)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: "#f0f0f0", position: "relative" }}>
                    <Image 
                      src={member.photo} 
                      alt={member.name} 
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="110px"
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.25rem" }}>{member.name}</h3>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--brand-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>{member.role}</p>

                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {member.bio.split(". ")[0]}.
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem" }}>
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, transition: "opacity 0.2s", position: "relative", width: "20px", height: "20px" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}>
                      <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, transition: "opacity 0.2s", position: "relative", width: "20px", height: "20px" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}>
                      <Image src="/insta.png" alt="Instagram" width={20} height={20} />
                    </a>
                  )}
                  {member.social.portfolio && (
                    <a href={member.social.portfolio} target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, transition: "opacity 0.2s", position: "relative", width: "20px", height: "20px" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}>
                      <Image src="/portfolio.png" alt="Portfolio" width={20} height={20} />
                    </a>
                  )}
                  {member.social.facebook && (
                    <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, transition: "opacity 0.2s", position: "relative", width: "20px", height: "20px" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}>
                      <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
                    </a>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <Link href="/team" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 2.5rem",
                borderRadius: "100px",
                background: "var(--bg-card)",
                border: "1.5px solid var(--border-subtle)",
                color: "var(--text-primary)",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
              }}
            >
              Learn More About Our Team <ArrowRight size={18} />
            </motion.div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
