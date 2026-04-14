"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "A standard business or portfolio website typically takes 1 to 2 weeks. Custom web applications or highly interactive platforms can take 4 to 8 weeks depending on the features required."
  },
  {
    q: "Do you provide hosting and domain names?",
    a: "Yes! We can handle the entire deployment process. We offer premium, high-speed hosting solutions and can assist you in acquiring the perfect domain name for your brand."
  },
  {
    q: "Will my website look good on mobile phones?",
    a: "Absolutely. Every experience we build is 100% responsive, meaning it will look pixel-perfect and perform flawlessly on smartphones, tablets, and desktop computers alike."
  },
  {
    q: "What is the ₹2,999 starting price for?",
    a: "Our ₹2,999 package is designed for rapid deployment of a single-page, high-converting professional landing page. It's perfect for small businesses or portfolios looking to establish immediate, premium digital trust."
  },
  {
    q: "Do you offer post-launch support and maintenance?",
    a: "Yes, we build long-term relationships with our clients. We offer ongoing maintenance, optimizations, and technical support to ensure your product continues to perform at its absolute peak."
  }
];

function FAQItem({ faq, isOpen, onClick }: { faq: typeof faqs[0], isOpen: boolean, onClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-4"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 md:p-[1.75rem] text-left rounded-2xl cursor-pointer"
        style={{
          background: "var(--bg-card)",
          border: isOpen ? "1px solid var(--border-accent)" : "1px solid var(--border-subtle)",
          boxShadow: isOpen ? "var(--shadow-card)" : "none",
          transition: "all 0.3s ease"
        }}
      >
        <span style={{ fontSize: "1.05rem", fontWeight: 600, color: isOpen ? "var(--text-primary)" : "var(--text-secondary)", transition: "color 0.3s ease" }}>
          {faq.q}
        </span>
        <div 
          className="flex-shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full"
          style={{ 
            background: isOpen ? "var(--glow-primary)" : "var(--bg-input)",
            color: isOpen ? "var(--brand-primary)" : "var(--text-muted)",
            transition: "all 0.3s ease"
          }}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="p-5 md:px-[1.75rem] pt-0 mt-2">
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <section id="faq" style={{ background: "var(--bg-primary)", position: "relative", padding: "7rem 0 4rem", contain: "paint" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionHeading
            label="Got Questions?"
            title="Frequently Asked"
            titleHighlight="Questions"
            subtitle="Everything you need to know about our process, performance, and pricing."
            align="center"
          />
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <FAQItem 
              key={i} 
              faq={faq} 
              isOpen={openIndex === i} 
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
