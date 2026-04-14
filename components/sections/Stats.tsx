"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  LineElement, PointElement, LinearScale, CategoryScale, Filler, BarElement
} from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { stats } from "@/lib/data";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, Filler, BarElement);

function CountUp({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let frame = 0, steps = Math.round(duration / 16);

    const timer = setInterval(() => {
      frame++;
      const p = frame / steps;
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));

      if (frame >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span
      ref={ref}
      style={{
        fontWeight: 900,
        fontSize: "clamp(1.5rem, 5vw, 2.8rem)", // Reduced lower bound for mobile
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
        color: "var(--text-primary)", 
        display: "inline-block",
        minWidth: "1ch"
      }}
    >
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const chartsRef = useRef(null);
  const chartsInView = useInView(chartsRef, { once: true, margin: "-80px" });
  const [jitter, setJitter] = useState(0);

  // Live Heartbeat Effect: Simulates real-time data flow
  useEffect(() => {
    const interval = setInterval(() => {
      setJitter(prev => (prev + 1) % 100);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Common Premium Options
  const premiumOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeOutQuart" as const,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111111",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        titleColor: "#ffffff",
        bodyColor: "rgba(255,255,255,0.7)",
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false }, beginAtZero: false },
    },
    interaction: { mode: "index" as const, intersect: false },
  };

  // 1. Line: Growth (Add subtle jitter to the last few points)
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Client Inflow",
      data: [2, 4, 5, 7, 8, 10, 13, 16, 20, 28 + (jitter % 2), 38 - (jitter % 3), 50 + (jitter % 5)],
      borderColor: "#2563eb", // Royal Blue
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      tension: 0.5,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 5,
      borderWidth: 3,
    }],
  };

  // 2. Bar: Revenue/Value Delivered
  const barData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [{
      label: "Value Generated (M)",
      data: [1.2, 2.4, 4.1, 7.5 + (jitter % 0.4)],
      backgroundColor: "#0ea5e9", // Sky Blue
      borderRadius: 6,
      borderSkipped: false,
    }]
  };

  // 3. Doughnut: Satisfaction
  const donutData = {
    labels: ["Highly Satisfied", "Satisfied", "Neutral"],
    datasets: [{
      data: [85 + (jitter % 2), 13 - (jitter % 1), 2],
      backgroundColor: ["#2563eb", "#7c3aed", "#1e293b"], // Blue, Purple, Dark Slate
      borderWidth: 0,
      hoverOffset: 6,
    }],
  };

  // 4. Line: Performance Speed (ms)
  const speedData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    datasets: [{
      label: "Global Latency (ms)",
      data: [42 + (jitter % 4), 45 - (jitter % 3), 38 + (jitter % 5), 52 - (jitter % 2), 48 + (jitter % 4), 41],
      borderColor: "#10b981", // Emerald Green
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      borderWidth: 2,
    }]
  };

  // 4b. New: Conversion Rate
  const conversionData = {
    labels: ["Pre-Launch", "Launch", "Month 1", "Month 2", "Month 3"],
    datasets: [{
      label: "Conversion Rate (%)",
      data: [2.1, 4.5, 6.8, 12.2 + (jitter % 1.5), 18.5 + (jitter % 2)],
      borderColor: "#db2777", // Pink
      backgroundColor: "rgba(219, 39, 119, 0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: "#db2777",
      borderWidth: 3,
    }]
  };

  // 5. Bar: Sectors (Horizontal visual)
  const sectorData = {
    labels: ["E-commerce", "SaaS", "Portfolios", "Corporate"],
    datasets: [{
      label: "Deployments",
      data: [24, 18 + (jitter % 2), 35 - (jitter % 3), 12],
      backgroundColor: ["#2563eb", "#3b82f6", "#0ea5e9", "#1e40af"],
      borderRadius: 6,
    }]
  };

  // 6. New: Uptime (Simple Sparkline)
  const uptimeData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [{
      label: "Service Uptime (%)",
      data: [99.9, 99.92, 99.88, 99.95, 99.99, 99.97 + (jitter % 0.02), 99.94, 99.98, 99.99, 100],
      borderColor: "#22c55e", // Green
      backgroundColor: "transparent",
      tension: 0.1,
      pointRadius: 0,
      borderWidth: 2,
    }]
  };
  
  const sectorOptions = {
    ...premiumOptions,
    indexAxis: 'y' as const,
  };

  return (
    <section id="stats" className="section" style={{ background: "var(--bg-primary)", position: "relative", padding: "5rem 0", contain: "paint" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        {/* Main Dashboard Grid */}
        <div ref={chartsRef} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          {/* Top Row - KPI Counters */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-5" // 2 cols on mobile
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
                data-theme="light"
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
                style={{
                  padding: "1rem", // Reduced padding for mobile fit
                  background: "var(--bg-card)",
                  borderRadius: "16px",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                  willChange: "transform, box-shadow"
                }}
              >
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>{stat.label}</div>
                <div style={{ fontVariantNumeric: "tabular-nums", minHeight: "2.4rem", display: "flex", alignItems: "center" }}>
                   <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{stat.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Middle Row - Primary Graphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6, boxShadow: "0 22px 60px rgba(0,0,0,0.18)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
              data-theme="light"
              style={{ 
                padding: "0.85rem", 
                background: "var(--bg-card)", 
                borderRadius: "16px", 
                border: "1px solid var(--border-subtle)", 
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)" 
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.2 }}>Active Growth</h3>
                <span style={{ width: "fit-content", fontSize: "0.6rem", padding: "0.2rem 0.4rem", borderRadius: "100px", background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", fontWeight: 700 }}>+24% YOY</span>
              </div>
              <div style={{ height: "180px", width: "100%" }}>
                {chartsInView && <Line data={lineData} options={premiumOptions} />}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" as const }}
              data-theme="light"
              style={{ 
                padding: "0.85rem", 
                background: "var(--bg-card)", 
                borderRadius: "16px", 
                border: "1px solid var(--border-subtle)", 
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)" 
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.2 }}>Conversion Rate</h3>
                <span style={{ width: "fit-content", fontSize: "0.6rem", padding: "0.2rem 0.4rem", borderRadius: "100px", background: "rgba(219, 39, 119, 0.1)", color: "#db2777", fontWeight: 700 }}>Peak 18.5%</span>
              </div>
              <div style={{ height: "180px", width: "100%" }}>
                {chartsInView && <Line data={conversionData} options={premiumOptions} />}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
              data-theme="light"
              style={{ 
                padding: "0.85rem", 
                background: "var(--bg-card)", 
                borderRadius: "16px", 
                border: "1px solid var(--border-subtle)", 
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)" 
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.2 }}>Quarterly Value</h3>
                <span style={{ width: "fit-content", fontSize: "0.6rem", padding: "0.2rem 0.4rem", borderRadius: "100px", background: "rgba(14, 165, 233, 0.1)", color: "#0ea5e9", fontWeight: 700 }}>Avg ROI 3.2x</span>
              </div>
              <div style={{ height: "180px", width: "100%" }}>
                {chartsInView && <Bar data={barData} options={premiumOptions} />}
              </div>
            </motion.div>
          </div>

          {/* Bottom Row - Tertiary Graphs */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
              data-theme="light"
              style={{ padding: "0.85rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <h3 style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.75rem", alignSelf: "flex-start", lineHeight: 1.2 }}>Client Satisfaction</h3>
              <div style={{ height: "100px", width: "100px", position: "relative" }}>
                {chartsInView && <Doughnut data={donutData} options={{ ...premiumOptions, cutout: "75%" }} />}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)", pointerEvents: "none" }}>
                  98%
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" as const }}
              data-theme="light"
              style={{ padding: "0.85rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <h3 style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.2 }}>Latency</h3>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
              </div>
              <div style={{ height: "100px", width: "100%" }}>
                {chartsInView && <Line data={speedData} options={premiumOptions} />}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
              data-theme="light"
              style={{ padding: "0.85rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}
            >
              <h3 style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.75rem", lineHeight: 1.2 }}>Sectors</h3>
              <div style={{ height: "100px", width: "100%" }}>
                {chartsInView && <Bar data={sectorData} options={sectorOptions} />}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" as const }}
              data-theme="light"
              style={{ padding: "0.85rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <h3 style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.2 }}>Network Uptime</h3>
                <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#22c55e" }}>Live</span>
              </div>
              <div style={{ height: "100px", width: "100%" }}>
                {chartsInView && <Line data={uptimeData} options={premiumOptions} />}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}