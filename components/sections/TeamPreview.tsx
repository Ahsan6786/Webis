"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Link2, Camera, Send, CircleCheck } from "lucide-react";
import { teamMembers } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TeamPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  return (
    <section 
      id="our-team" 
      className="section" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ background: "var(--bg-secondary)", overflow: "hidden", padding: "5rem 0" }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 1.5rem" }}>
        <ScrollReveal>
          <SectionHeading label="The Dream Team" title="Meet the Minds Behind" titleHighlight="Webis" subtitle="A dedicated collective of full-stack innovators, design visionaries, and growth strategists." align="center" className="mb-10" />
        </ScrollReveal>

        <div style={{ position: "relative", maxWidth: "420px", margin: "0 auto" }}>
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide} 
            style={{ 
              position: "absolute", 
              left: "-15px", 
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
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              backdropFilter: "blur(8px)"
            }}
            className="md:-left-20"
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
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              backdropFilter: "blur(8px)"
            }}
            className="md:-right-20"
          >
            <ArrowRight size={18} />
          </button>

          <div style={{ overflow: "hidden", padding: "10px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                {teamMembers.map((member, i) => i === currentIndex && (
                  <motion.div
                    key={member.id}
                    whileHover={{ y: -8 }}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "28px",
                      padding: "2.5rem 1.5rem",
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
                    }}
                  >
                    <div style={{ width: "110px", height: "110px", borderRadius: "50%", margin: "0 auto 1.25rem", border: "3px solid var(--border-accent)", padding: "4px", background: "var(--gradient-brand)" }}>
                      <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: "#f0f0f0", position: "relative" }}>
                        <Image src={member.photo} alt={member.name} fill style={{ objectFit: "cover" }} sizes="110px" />
                      </div>
                    </div>

                    <h3 style={{ fontSize: "1.25rem", fontWeight: 950, color: "var(--text-primary)", marginBottom: "0.25rem" }}>{member.name}</h3>
                    <p style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--brand-primary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>{member.role}</p>

                    <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>{member.bio}</p>

                    <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(0,0,0,0.05)", border: "1px solid var(--border-subtle)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--brand-primary)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.05)"; }}>
                          <div style={{ position: "relative", width: "16px", height: "16px" }}>
                            <Image src="/linkedin.png" alt="LinkedIn" fill style={{ objectFit: "contain" }} />
                          </div>
                        </a>
                      )}
                      {member.social.instagram && (
                        <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(0,0,0,0.05)", border: "1px solid var(--border-subtle)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.05)"; }}>
                          <div style={{ position: "relative", width: "16px", height: "16px" }}>
                            <Image src="/insta.png" alt="Instagram" fill style={{ objectFit: "contain" }} />
                          </div>
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
            {teamMembers.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)} style={{ width: currentIndex === idx ? "20px" : "8px", height: "8px", borderRadius: "100px", background: currentIndex === idx ? "var(--brand-primary)" : "var(--border-accent)", border: "none", cursor: "pointer", transition: "all 0.3s ease" }} />
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.4}>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/team" style={{ textDecoration: "none" }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.85rem 2rem", borderRadius: "100px", background: "var(--brand-primary)", color: "white", fontWeight: 800, fontSize: "0.95rem", boxShadow: "0 10px 25px var(--brand-glow-a)" }}>
                View Full Story <ArrowRight size={16} />
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
