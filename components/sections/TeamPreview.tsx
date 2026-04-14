"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Link2, Camera, Send, CircleCheck } from "lucide-react";
import { teamMembers } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

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

                <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--brand-primary)"; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "var(--text-secondary)"; }}>
                      <Link2 size={18} strokeWidth={1.5} />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "var(--text-secondary)"; }}>
                      <InstagramIcon size={18} />
                    </a>
                  )}
                  {member.social.portfolio && (
                    <a href={member.social.portfolio} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--brand-primary)"; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "var(--text-secondary)"; }}>
                      <Link2 size={18} strokeWidth={1.5} />
                    </a>
                  )}
                  {member.social.facebook && (
                    <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#1877F2"; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "var(--text-secondary)"; }}>
                      <CircleCheck size={18} strokeWidth={1.5} />
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
