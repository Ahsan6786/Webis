"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Magnetic from "@/components/animations/Magnetic";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, Briefcase, Users, CreditCard, MessageSquare, Link2, Camera, Send, Mail, ArrowRight } from "lucide-react";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const navLinks = [
  { label: "Services",  href: "/#services",  icon: LayoutDashboard },
  { label: "Portfolio", href: "/#portfolio", icon: Briefcase },
  { label: "Team",      href: "/team",       icon: Users },
  { label: "Pricing",   href: "/#pricing",    icon: CreditCard },
  { label: "Contact",   href: "/#contact",    icon: MessageSquare },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", fn, { passive: true });
    fn(); // Initial check
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: scrolled ? 0 : -100, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
          e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
        }}
        style={{
          position: "fixed", 
          top: scrolled ? "1.25rem" : "0", 
          left: 0, 
          right: 0, 
          zIndex: 50,
          margin: "0 auto",
          maxWidth: "1100px",
          width: scrolled ? "calc(100% - 2.5rem)" : "100%",
          padding: scrolled ? "0.2rem 0" : "0.5rem 0",
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.04)" : "transparent",
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid transparent",
          borderTop: scrolled ? "1.5px solid rgba(255, 255, 255, 0.25)" : "1px solid transparent", // Diamond edge
          borderRadius: scrolled ? "100px" : "0",
          boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,0.15), inset 0 0 12px rgba(255,255,255,0.02)" : "none",
          backdropFilter: "blur(32px) saturate(210%)",
          WebkitBackdropFilter: "blur(32px) saturate(210%)",
          opacity: 1,
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.6s ease",
        } as any}
      >
        {/* Physical Refraction Glint — Solidified opacity-based render */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255, 255, 255, 0.12), transparent 80%)",
            pointerEvents: "none",
            zIndex: 0,
            borderRadius: "100px",
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.6s ease"
          }}
        />
        <div className="mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} style={{ display: "flex", alignItems: "center", gap: "0.625rem", willChange: "transform" }}>
                <div
                  style={{
                    width: "36px", height: "36px", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Image 
                    src="/logo.png" 
                    alt="Webis Digital Agency Logo" 
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: scrolled ? "var(--text-primary)" : "#fff", letterSpacing: "-0.02em" }}>Webis</span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1.5" style={{ background: scrolled ? "transparent" : "rgba(255,255,255,0.03)", padding: scrolled ? "0.25rem" : "0", borderRadius: "100px" }}>
            {navLinks.map((link) => (
              <motion.div
                key={link.label}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href={link.href}
                  style={{ 
                    position: "relative", padding: "0.5rem 1rem", fontSize: "0.85rem", fontWeight: 600, 
                    color: scrolled ? "var(--text-secondary)" : "rgba(255, 255, 255, 0.85)", textDecoration: "none", borderRadius: "100px",
                    letterSpacing: "0.01em", transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = scrolled ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = scrolled ? "var(--text-primary)" : "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = scrolled ? "var(--text-secondary)" : "rgba(255, 255, 255, 0.85)";
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            {/* Hamburger */}
            <motion.button
              className="md:hidden"
              style={{
                width: "36px", height: "36px", borderRadius: "100px", 
                border: scrolled ? "1px solid var(--border-subtle)" : "1px solid rgba(255, 255, 255, 0.15)",
                background: scrolled ? "var(--bg-card)" : "rgba(255,255,255,0.05)", 
                color: scrolled ? "var(--text-primary)" : "rgba(255, 255, 255, 0.9)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: "flex" }}><X size={17} /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: "flex" }}><Menu size={17} /></motion.span>}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
                zIndex: 90
              }}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0, 
                width: "min(380px, 90vw)", 
                zIndex: 100,
                background: "var(--bg-card)",
                borderLeft: "1px solid var(--border-subtle)",
                boxShadow: "-10px 0 60px rgba(0,0,0,0.3)",
                backdropFilter: "blur(40px) saturate(180%)",
                overflow: "hidden", 
                display: "flex", flexDirection: "column"
              }}
            >
              {/* Premium Background Mesh */}
              <div style={{ position: "absolute", inset: 0, zIndex: -1, opacity: 0.4 }}>
                <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "70%", height: "40%", background: "radial-gradient(circle, var(--brand-purple) 0%, transparent 70%)", filter: "blur(60px)" }} />
                <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: "60%", height: "40%", background: "radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)", filter: "blur(60px)" }} />
              </div>

              {/* Header */}
              <div style={{ padding: "1.75rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ position: "relative", width: "32px", height: "32px" }}>
                    <Image src="/logo.png" alt="Logo" fill style={{ objectFit: "contain" }} priority />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.03em", color: "var(--text-primary)" }}>Webis</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  style={{ width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "100px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)", cursor: "pointer" }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav style={{ display: "flex", flexDirection: "column", padding: "2rem 1.5rem", gap: "0.75rem", flex: 1 }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase", paddingLeft: "1rem", marginBottom: "0.5rem" }}>
                  Navigation
                </div>
                {navLinks.map((link, i) => (
                  <motion.div 
                    key={link.label} 
                    initial={{ opacity: 0, x: 30, rotateX: -15 }} 
                    animate={{ opacity: 1, x: 0, rotateX: 0 }} 
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      style={{ 
                        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 1.25rem", borderRadius: "16px", 
                        fontSize: "1.15rem", fontWeight: 600, 
                        color: "var(--text-primary)", textDecoration: "none", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.transform = "translateX(8px)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.03)";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
                          <link.icon size={20} strokeWidth={1.5} />
                        </div>
                        {link.label}
                      </div>
                      <ArrowRight size={16} style={{ opacity: 0.3 }} />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              {/* Footer Section: Socials & Contact */}
              <div style={{ padding: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                  {[Link2, InstagramIcon, Send, Mail].map((Icon, idx) => (
                    <motion.a 
                      key={idx}
                      href="#"
                      whileHover={{ y: -5, background: "rgba(255,255,255,0.1)" }}
                      style={{ width: "45px", height: "45px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)", transition: "all 0.3s" }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", opacity: 0.4 }}>
                  © 2026 Webis Agency • Premium Digital Solutions
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
