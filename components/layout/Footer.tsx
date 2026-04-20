"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Send, Link2, GitBranch, ArrowUpRight, Heart, Globe } from "lucide-react";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const footerLinks = {
  Services: [
    { label: "Business Websites", href: "/#services" },
    { label: "Portfolio Websites", href: "/#services" },
    { label: "Restaurant Websites", href: "/#services" },
    { label: "Custom Web Apps",  href: "/#services" },
  ],
  Company: [
    { label: "Portfolio",    href: "/#portfolio" },
    { label: "Pricing",     href: "/#pricing"   },
    { label: "Refer & Earn", href: "/referral"  },
    { label: "Why Webis",   href: "/#why"       },
  ],
  Contact: [
    { label: "Get a Quote",    href: "/#contact" },
    { label: "WhatsApp us",   href: "https://wa.me/919162248786", external: true },
    { label: "mitraai0001@gmail.com",href: "mailto:mitraai0001@gmail.com", external: true },
  ],
};

const socials = [
  { icon: "/insta.png",     href: "https://www.instagram.com/webis001?igsh=MWcwMnhoaTk0bXF0dA%3D%3D&utm_source=qr", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#000000", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", color: "#ffffff" }}>
      {/* Galaxy top line */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #333333 35%, #666666 50%, #333333 70%, transparent)", opacity: 0.6 }} />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "4.5rem 1.5rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
            gap: "2.5rem 2rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none", width: "fit-content" }}>
              <div style={{ width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/logo.png?v=2" 
                  alt="Webis Digital Agency - Premium Web Development" 
                  style={{ width: "100%", height: "100%", objectFit: "contain" }} 
                />
              </div>
              <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#ffffff" }}>Webis</span>
            </Link>

            <p style={{ fontSize: "0.83rem", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", maxWidth: "280px", margin: 0 }}>
              We don&apos;t build websites. We build experiences. Premium digital agency for the age of the internet.
            </p>

            <div style={{ display: "flex", gap: "1rem" }}>
              <motion.a 
                href="https://www.instagram.com/webis001" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                style={{ 
                  color: "#ffffff", 
                  width: "40px", height: "40px", 
                  background: "rgba(255,255,255,0.05)", 
                  borderRadius: "12px", 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{ position: "relative", width: "18px", height: "18px" }}>
                  <Image src="/insta.png" alt="Instagram" fill style={{ objectFit: "contain" }} />
                </div>
              </motion.a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h3 style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: 0 }}>{group}</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem", listStyle: "none", padding: 0, margin: 0 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.83rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}>
                        {link.label}<ArrowUpRight size={11} style={{ opacity: 0.5 }} />
                      </a>
                    ) : (
                      <Link href={link.href} style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", paddingTop: "1.75rem" }}>
          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}>
            © {new Date().getFullYear()} Webis. Made with <Heart size={12} color="#ffffff" fill="#ffffff" /> in Pune, India.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
          </div>
        </div>
      </div>
    </footer>
  );
}
