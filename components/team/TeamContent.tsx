"use client";

import { motion } from "framer-motion";
import { teamMembers } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const qualities = [
  {
    title: "Uncompromising Reliability",
    desc: "We don't just deliver projects; we build partnerships based on trust and consistent high-quality execution."
  },
  {
    title: "Full-Stack Innovation",
    desc: "From complex database architectures to pixel-perfect frontends, we handle the entire ecosystem."
  },
  {
    title: "Hyper-Speed Execution",
    desc: "We respect your time. Our workflow is engineered for rapid turnarounds without sacrificing quality."
  }
];

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default function TeamContent() {
  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "8rem" }}>
      
      {/* Header Section */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--brand-primary)", fontWeight: 700, marginBottom: "2rem", fontSize: "0.9rem" }}>
              <ArrowRight style={{ transform: "rotate(180deg)" }} size={16} /> Back to Home
            </Link>
            <h4 style={{ color: "var(--brand-primary)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              Meet the Visionaries
            </h4>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "2rem" }}>
              We Architect the Digital <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Future</span>
            </h1>
            <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Webis is more than an agency—it&apos;s a collective of passionate builders and strategists. <strong>Book a free consultation</strong> today to discuss your next big idea.
            </p>
            <Link href="/#contact" style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "inline-flex",
                  padding: "1.2rem 3.5rem",
                  borderRadius: "100px",
                  background: "var(--brand-primary)",
                  color: "white",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 40px var(--brand-glow-a)"
                }}
              >
                Book Free Consultation
              </motion.div>
            </Link>
          </motion.div>
        </ScrollReveal>
      </section>

      {/* Qualities Grid */}
      <section className="mb-24 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {qualities.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div style={{
                  padding: "2.5rem",
                  borderRadius: "24px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}>
                  <div style={{ padding: "0.5rem", borderRadius: "8px", background: "var(--brand-glow-b)", width: "fit-content" }}>
                    <CheckCircle2 size={24} style={{ color: "var(--brand-primary)" }} />
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Main Team Showcase — Vertical Professional Cards */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {teamMembers.map((member, i) => (
            <ScrollReveal key={member.id} delay={i * 0.1}>
              <div style={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
              }}>
                {/* Photo Section */}
                <div style={{ 
                  position: "relative",
                  width: "100%",
                  maxWidth: "340px",
                  marginBottom: "2rem"
                }}>
                  <div style={{
                    position: "absolute",
                    inset: -15,
                    background: "var(--gradient-brand)",
                    opacity: 0.1,
                    filter: "blur(40px)",
                    borderRadius: "50%"
                  }} />
                  <div style={{
                    aspectRatio: "1/1",
                    borderRadius: "32px",
                    overflow: "hidden",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-card)",
                    position: "relative",
                    zIndex: 1,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
                  }}>
                    <Image 
                      src={member.photo} 
                      alt={member.name} 
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="340px"
                    />
                  </div>
                </div>

                {/* Member Name & Role — Just below photo for zero confusion */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>
                    {member.name}
                  </h2>
                  <h4 style={{ color: "var(--brand-primary)", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {member.role}
                  </h4>
                </div>

                {/* Bio & Qualities */}
                <div style={{ maxWidth: "340px" }}>
                  <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {member.bio}
                  </p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                    {member.qualities.map((q) => (
                      <div key={q} style={{ 
                        padding: "0.25rem 0.75rem",
                        borderRadius: "100px",
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-secondary)", 
                        fontWeight: 600, 
                        fontSize: "0.8rem" 
                      }}>
                        {q}
                      </div>
                    ))}
                  </div>

                   <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem" }}>
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--brand-primary)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
                        <div style={{ position: "relative", width: "18px", height: "18px" }}>
                          <Image src="/linkedin.png" alt="LinkedIn" fill style={{ objectFit: "contain" }} />
                        </div>
                      </a>
                    )}
                    {member.social.instagram && (
                      <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
                        <div style={{ position: "relative", width: "18px", height: "18px" }}>
                          <Image src="/insta.png" alt="Instagram" fill style={{ objectFit: "contain" }} />
                        </div>
                      </a>
                    )}
                    {member.social.portfolio && (
                      <a href={member.social.portfolio} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#000"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
                        <div style={{ position: "relative", width: "18px", height: "18px" }}>
                          <Image src="/portfolio.png" alt="Portfolio" fill style={{ objectFit: "contain" }} />
                        </div>
                      </a>
                    )}
                    {member.social.facebook && (
                      <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#1877F2"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
                        <div style={{ position: "relative", width: "18px", height: "18px" }}>
                          <Image src="/facebook.png" alt="Facebook" fill style={{ objectFit: "contain" }} />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-24 text-center">
        <ScrollReveal>
          <div style={{
            padding: "4rem 2rem",
            borderRadius: "40px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            position: "relative",
            overflow: "hidden"
          }}>
             <div style={{ 
              position: "absolute", 
              top: "50%", left: "50%", 
              transform: "translate(-50%, -50%)",
              width: "100%", height: "200%",
              background: "radial-gradient(circle, var(--glow-primary) 0%, transparent 60%)",
              opacity: 0.1,
              pointerEvents: "none"
            }} />
            
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
              Ready to Discuss Your Idea?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
              <strong>Book a free consultation</strong> about your next idea. Our team is ready to transform your vision into a high-performance digital reality.
            </p>
            <Link href="/#contact" style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "inline-flex",
                  padding: "1.2rem 3.5rem",
                  borderRadius: "100px",
                  background: "var(--brand-primary)",
                  color: "white",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 40px var(--brand-glow-a)"
                }}
              >
                Book Free Consultation
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
