"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services",  href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Pricing",   href: "/#pricing"  },
  { label: "Contact",   href: "/#contact"  },
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
                  overflow: "hidden", position: "relative",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/logo.png" 
                  alt="Webis Digital Agency - Premium Web Development Logo" 
                  style={{ width: "100%", height: "100%", objectFit: "contain" }} 
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, 
              width: "min(320px, 85vw)", 
              zIndex: 100,
              background: "var(--bg-card)",
              borderLeft: "1px solid var(--border-subtle)",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.1)",
              backdropFilter: "blur(24px)",
              overflow: "hidden", willChange: "transform, opacity",
              display: "flex", flexDirection: "column"
            }}
          >
            {/* Header / Brand */}
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <img src="/logo.png" alt="Webis Digital Agency Logo" style={{ width: "28px", height: "28px", objectFit: "contain" }} />
                <span style={{ fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>Webis</span>
              </div>
              <button 
                onClick={() => setMobileOpen(false)}
                style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--bg-input)", border: "none", color: "var(--text-primary)", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", padding: "1.5rem", gap: "0.5rem", flex: 1 }}>
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.label} 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ 
                    delay: 0.1 + i * 0.05, 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{ 
                      display: "flex", alignItems: "center", padding: "1rem", borderRadius: "100px", 
                      fontSize: "1.1rem", fontWeight: 700, 
                      color: "var(--text-primary)", 
                      textDecoration: "none", transition: "all 0.2s",
                      position: "relative", overflow: "hidden"
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            {/* Soft Branding Bottom */}
            <div style={{ padding: "1.5rem", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", opacity: 0.6 }}>
              © 2026 Webis Agency
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
