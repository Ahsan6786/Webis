"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Palette,
  UtensilsCrossed,
  Code2,
  MessageCircle,
  Sparkles,
  Star,
  Rocket,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle2,
  Clock,
  Users
} from "lucide-react";

interface ServiceTheme {
  primary: string;
  bg: string;
  gradient: string;
}

interface ServiceStat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface Service {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  benefits: string[];
  stats: ServiceStat[];
  icon: React.ReactNode;
  theme: ServiceTheme;
}

const SERVICES: Service[] = [
  {
    id: "business",
    name: "Business",
    title: "Business Growth Engines",
    subtitle: "From First Click to Lasting Loyalty",
    description: "We architect high-performance digital hubs designed to establish your brand's authority.",
    longDescription: "In a digital-first world, your website is your hardest-working salesperson. We build experiences that drive measurable results through SEO optimization and conversion-focused design.",
    benefits: ["SEO Engineered", "UX Architecture", "Blazing Speeds", "Mobile-First"],
    stats: [
      { label: "Conversion", value: "+312%", icon: <TrendingUp size={18} /> },
      { label: "Load Time", value: "-68%", icon: <Zap size={18} /> }
    ],
    icon: <Globe size={28} />,
    theme: {
      primary: "#6366f1", // Indigo
      bg: "#eef2ff",
      gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)"
    }
  },
  {
    id: "portfolio",
    name: "Portfolio",
    title: "Creative Showcase Platforms",
    subtitle: "Where Vision Meets Virtuosity",
    description: "Your work deserves a stage that's as visionary as you are.",
    longDescription: "We create immersive digital galleries that elevate your creative work. Every animation is carefully choreographed to create an unforgettable journey.",
    benefits: ["Retina Visuals", "Brand Storytelling", "Interactive Layouts", "Video Optimization"],
    stats: [
      { label: "Engagement", value: "+245%", icon: <Star size={18} /> },
      { label: "Retention", value: "3.2x", icon: <Clock size={18} /> }
    ],
    icon: <Palette size={28} />,
    theme: {
      primary: "#ec4899", // Pink
      bg: "#fdf2f8",
      gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)"
    }
  },
  {
    id: "webapp",
    name: "Web Apps",
    title: "Tailored Business Logic",
    subtitle: "Software That Scales With You",
    description: "Robust, scalable applications tailored to your unique workflows.",
    longDescription: "We build custom applications designed around your exact business processes. From internal dashboards to customer portals, we bring logic to life.",
    benefits: ["Cloud Architecture", "Secure APIs", "Performant Backend", "Real-time Data"],
    stats: [
      { label: "Efficiency", value: "+156%", icon: <Rocket size={18} /> },
      { label: "Cost Saving", value: "-43%", icon: <Shield size={18} /> }
    ],
    icon: <Code2 size={28} />,
    theme: {
      primary: "#10b981", // Emerald
      bg: "#ecfdf5",
      gradient: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)"
    }
  },
  {
    id: "seo",
    name: "SEO",
    title: "Search Engine Dominance",
    subtitle: "Visibility That Drives Growth",
    description: "We ensure your brand stands out where it matters most.",
    longDescription: "Rank higher, drive organic traffic, and outshine competitors. Our SEO strategies are built on data, technical excellence, and user intent to turn searchers into customers.",
    benefits: ["Keyword Mastery", "Technical SEO", "Backlink Strategy", "Analytics Dashboard"],
    stats: [
      { label: "Organic Reach", value: "+420%", icon: <TrendingUp size={18} /> },
      { label: "CPA", value: "-35%", icon: <Zap size={18} /> }
    ],
    icon: <TrendingUp size={28} />,
    theme: {
      primary: "#f59e0b", // Amber
      bg: "#fffbeb",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)"
    }
  },
  {
    id: "content",
    name: "Content",
    title: "Strategic Content Creation",
    subtitle: "Stories That Sell 24/7",
    description: "High-conversion copy and visuals that resonate with your audience.",
    longDescription: "Content is the fuel for your digital growth. From high-converting landing page copy to engaging blog posts, we craft messages that build trust and drive action.",
    benefits: ["Copywriting", "Video Content", "Social Strategy", "Brand Voice"],
    stats: [
      { label: "Engagement", value: "+280%", icon: <Users size={18} /> },
      { label: "CTR", value: "+120%", icon: <Star size={18} /> }
    ],
    icon: <MessageCircle size={28} />,
    theme: {
      primary: "#8b5cf6", // Violet
      bg: "#f5f3ff",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)"
    }
  }
];

interface ServiceCardProps {
  service: Service;
  index: number;
  onInView: (service: Service) => void;
}

function ServiceCard({ service, index, onInView }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) onInView(service);
  }, [isInView, service, onInView]);

  return (
    <div ref={ref} className="py-24 px-6" id={service.id}>
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono font-bold tracking-widest text-sm mb-4 block" style={{ color: service.theme.primary }}>
            CHAPTER 0{index + 1}
          </span>
          <h2 className="text-[36px] lg:text-[54px] font-black text-slate-900 mb-4 leading-tight tracking-tight">
            {service.title}
          </h2>
          <p className="text-lg font-semibold mb-4" style={{ color: service.theme.primary }}>
            {service.subtitle}
          </p>
          <p className="text-slate-600 text-base mb-6 leading-relaxed max-w-lg">
            {service.longDescription}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {service.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 size={18} style={{ color: service.theme.primary }} />
                {b}
              </div>
            ))}
          </div>
          <button
            className="px-7 py-3.5 rounded-full text-white font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg text-sm"
            style={{ background: service.theme.gradient }}
          >
            Start Your Story
          </button>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-3xl p-1 bg-white/40 shadow-xl backdrop-blur-sm overflow-hidden flex items-center justify-center">
            <div className="grid grid-cols-1 gap-4 w-full p-6">
              {service.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 5 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${service.theme.primary}15`, color: service.theme.primary }}>
                      {stat.icon}
                    </div>
                    <span className="font-bold text-slate-500 text-sm">{stat.label}</span>
                  </div>
                  <span className="text-2xl font-black" style={{ color: service.theme.primary }}>{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ServicesStorytelling() {
  const [activeService, setActiveService] = useState<Service>(SERVICES[0]);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setShowNav(v > 0.12 && v < 0.98);
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: activeService.theme.bg }}
    >
      {/* Background Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 z-[100] origin-left"
        style={{ scaleX: scaleProgress, background: activeService.theme.gradient }}
      />

      {/* Intro Hero */}
      <div className="py-32 md:py-48 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-sm font-bold mb-8"
        >
          <Sparkles size={16} className="text-yellow-500" />
          The Story of Your Growth
        </motion.div>
        <h1 className="text-[42px] md:text-[80px] font-black text-slate-900 mb-6 tracking-tighter leading-[1.1]">
          Services that <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">
            Actually Convert.
          </span>
        </h1>
        <p className="max-w-xl text-lg text-slate-600 leading-relaxed">
          Scroll down to explore how we transform digital presence into business performance through strategic storytelling.
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Scroll</span>
          <div className="w-1 h-12 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              animate={{ y: [-50, 50] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-1/2 bg-slate-900"
            />
          </div>
        </motion.div>
      </div>

      {/* Service Content */}
      <div className="relative z-10">
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            onInView={setActiveService}
          />
        ))}
      </div>

      {/* Floating Navigation Navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.nav 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6"
          >
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                className="group relative flex items-center justify-end"
              >
                <span className={`mr-4 text-xs font-bold transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${activeService.id === s.id ? 'opacity-100' : ''}`}
                  style={{ color: activeService.id === s.id ? s.theme.primary : '#64748b' }}>
                  {s.name}
                </span>
                <div
                  className={`h-2 transition-all duration-500 rounded-full ${activeService.id === s.id ? 'w-10' : 'w-2 bg-slate-300'}`}
                  style={{ backgroundColor: activeService.id === s.id ? s.theme.primary : '' }}
                />
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Background Decorative Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: activeService.id === 'business' ? -100 : 100,
            y: activeService.id === 'portfolio' ? -100 : 100,
          }}
          transition={{ duration: 2, ease: "anticipate" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: activeService.theme.primary }}
        />
      </div>
    </section>
  );
}