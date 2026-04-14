"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send, MessageCircle, Mail, Phone,
  User, ChevronDown, CheckCircle, Search
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

/* ── Constants ─────────────────────────────────────── */
const WA_NUMBER = "919162248786"; // +91 9162248786
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

const serviceOptions = [
  "Business Website",
  "Portfolio Website",
  "Restaurant Website",
  "Custom Web App",
  "E-Commerce Store",
  "Other / Not Sure",
];

/* ── Types ──────────────────────────────────────────── */
interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const e: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) e.name = "Please enter your name";
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
  if (!data.phone.trim()) {
    e.phone = "Phone / WhatsApp number is required";
  } else if (!data.phone.match(/^[\d\s\-\+\(\)]{7,15}$/)) {
    e.phone = "Enter a valid phone number";
  }
  if (!data.service) e.service = "Please select a service";
  if (!data.message.trim() || data.message.trim().length < 10)
    e.message = "Please describe your project (min 10 chars)";
  return e;
}

/* ── Build WhatsApp message ─────────────────────────── */
function buildWAMessage(f: FormData) {
  return encodeURIComponent(
    `👋 Hi Webis!\n\n` +
    `*Name:* ${f.name}\n` +
    `*Email:* ${f.email}\n` +
    `*Phone:* ${f.phone}\n` +
    `*Service:* ${f.service}\n\n` +
    `*Project Details:*\n${f.message}\n\n` +
    `_Sent via webis.in contact form_`
  );
}

/* ── Shared input style ─────────────────────────────── */
const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "1rem",
  fontSize: "1rem",
  borderRadius: "14px",
  outline: "none",
  color: "var(--text-primary)",
  background: "var(--bg-input)",
  border: "1px solid var(--border-input)",
  transition: "all 0.2s",
};
const inputError: React.CSSProperties = {
  ...inputBase,
  border: "1px solid rgba(239,68,68,0.55)",
};

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);

    const waUrl = `${WA_BASE}?text=${buildWAMessage(form)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="section"
      style={{ background: "var(--bg-primary)", position: "relative", padding: "6rem 0", contain: "paint" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "100px",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--brand-primary)",
                marginBottom: "1rem",
                background: "rgba(30, 58, 138, 0.05)",
                border: "1px solid rgba(30, 58, 138, 0.2)"
              }}
            >
              <span style={{ width: "6px", height: "6px", background: "var(--brand-primary)", borderRadius: "50%", boxShadow: "0 0 10px var(--brand-primary)" }} />
              Pune Based Design Agency
            </motion.div>
            <h2
              className="font-black tracking-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--text-primary)", lineHeight: 1 }}
            >
              The <span style={{ background: "var(--gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hyper Dev</span> Team is Ready
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto" }}>
              Ready to Win? We deliver performance at the speed of light. Average response: 1 hour.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>

          {/* Left Side: Info Chips */}
          <ScrollReveal direction="left">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { label: "WhatsApp Chat", value: "+91 9162248786", icon: MessageCircle, color: "#25D366", href: WA_BASE }, // WhatsApp Green
                { label: "Direct Support", value: "mitraai0001@gmail.com", icon: Mail, color: "#3B82F6", href: "mailto:mitraai0001@gmail.com" }, // Email Blue
                { label: "Phone Line", value: "+91 9162248786", icon: Phone, color: "#8B5CF6", href: "tel:+919162248786" } // Phone Purple
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  className="group"
                  data-theme="light"
                  style={{
                    padding: "1.5rem",
                    background: "var(--bg-card)",
                    borderRadius: "20px",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
                >
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px", 
                    background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                    display: "flex", alignItems: "center", justifyContent: "center", color: item.color,
                    boxShadow: `0 4px 12px ${item.color}15`,
                  }}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>{item.value}</div>
                  </div>
                </motion.a>
              ))}

              <div className="luminous-border" style={{ borderRadius: "24px", marginTop: "1rem" }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                  }}
                  style={{
                    padding: "2rem",
                    background: "var(--bg-card)",
                    borderRadius: "24px",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid var(--border-subtle)",
                    transition: "transform 0.1s ease-out",
                  } as any}
                  className="group relative"
                >
                  {/* Spotlight Effect */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(30, 58, 138, 0.08), transparent 80%)",
                      pointerEvents: "none",
                      zIndex: 1
                    }}
                  />

                  <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.05, zIndex: 0 }}>
                    <CheckCircle size={140} />
                  </div>

                  <div style={{ position: "relative", zIndex: 2 }}>
                    <h4 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "1rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                      Why Choose Webis?
                    </h4>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: 0, listStyle: "none" }}>
                      {[
                        { text: "Fast 2-Hour Response", color: "#22c55e" }, // Green
                        { text: "Conversion Focused Design", color: "#3b82f6" }, // Blue
                        { text: "Transparent Pricing", color: "#8b5cf6" } // Purple
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                          style={{ fontSize: "0.95rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-secondary)" }}
                        >
                          <div style={{ padding: "4px", borderRadius: "6px", background: `${item.color}15` }}>
                            <CheckCircle size={16} color={item.color} />
                          </div>
                          {item.text}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Glass Reflection */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
                    pointerEvents: "none"
                  }} />
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Side: Modern Form */}
          <ScrollReveal direction="right">
            <div
              data-theme="light"
              className="contact-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: "24px",
                border: "1px solid var(--border-subtle)",
                padding: "clamp(1.25rem, 5vw, 2.5rem)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden"
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 0", textAlign: "center", gap: "1rem" }}
                >
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}>
                    <CheckCircle size={28} color="#22c55e" />
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--text-primary)", margin: 0 }}>
                    Opening WhatsApp…
                  </h3>
                  <p style={{ color: "var(--text-secondary)", maxWidth: "340px" }}>
                    Thanks {form.name.split(' ')[0]}! Your message has been prepared. If WhatsApp didn&apos;t open automatically, click below.
                  </p>
                  <a
                    href={`${WA_BASE}?text=${buildWAMessage(form)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ marginTop: "1rem", padding: "1rem 2rem" }}
                  >
                    Launch WhatsApp Again
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="grid-cols-1 sm:grid-cols-2">
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Full Name</label>
                      <input
                        name="name" value={form.name} onChange={handleChange}
                        placeholder="e.g. Ahsan Khan"
                        style={errors.name ? inputError : { ...inputBase, background: "#f8f9fa" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Email Address</label>
                      <input
                        name="email" value={form.email} onChange={handleChange}
                        placeholder="hello@company.com"
                        style={errors.email ? inputError : { ...inputBase, background: "#f8f9fa" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="grid-cols-1 sm:grid-cols-2">
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Phone / WhatsApp</label>
                      <input
                        name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+91"
                        style={errors.phone ? inputError : { ...inputBase, background: "#f8f9fa" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Service Interest</label>
                      <div style={{ position: "relative" }}>
                        <select
                          name="service" value={form.service} onChange={handleChange}
                          style={{ ...(errors.service ? inputError : inputBase), paddingRight: "2.5rem", background: "#f8f9fa", appearance: "none" }}
                        >
                          <option value="" disabled>Select project type…</option>
                          {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={16} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.5 }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Project Details</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} rows={4}
                      placeholder="Briefly describe your goals..."
                      style={{ ...(errors.message ? inputError : inputBase), background: "#f8f9fa", resize: "none" }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="btn btn-white"
                    style={{
                      position: "relative",
                      width: "100%",
                      overflow: "hidden",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      color: "white",
                    } as any}
                    whileHover={{ scale: 1.02, y: -2, boxShadow: "0 15px 40px var(--glow-primary)" }}
                    whileTap={{ scale: 0.98 }}
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

                    <span style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                      {loading ? (
                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%" }}
                          />
                          Preparing WhatsApp...
                        </span>
                      ) : (
                        <>
                          Let’s talk <Send size={18} />
                        </>
                      )}
                    </span>
                  </motion.button>

                  <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-primary)", fontWeight: 600, marginTop: "0.75rem" }}>
                    ⚡ One-click WhatsApp connect. No spam. Only results.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
