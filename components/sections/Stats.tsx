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
        fontSize: "clamp(2rem, 5vw, 2.8rem)",
        lineHeight: 1,
        background: "linear-gradient(135deg, #7c3aed, #2563eb)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const chartsRef = useRef(null);
  const chartsInView = useInView(chartsRef, { once: true, margin: "-80px" });

  // Common Premium Options
  const premiumOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
      y: { display: false, grid: { display: false }, beginAtZero: true },
    },
    interaction: { mode: "index" as const, intersect: false },
  };

  // 1. Line: Growth
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Client Inflow",
      data: [2, 4, 5, 7, 8, 10, 13, 16, 20, 28, 38, 50],
      borderColor: "#7c3aed",
      backgroundColor: "rgba(124,58,237,0.1)",
      tension: 0.5,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 5,
      borderWidth: 2,
    }],
  };

  // 2. Bar: Revenue/Value Delivered
  const barData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [{
      label: "Value Generated (M)",
      data: [1.2, 2.4, 4.1, 7.5],
      backgroundColor: "#2563eb",
      borderRadius: 4,
      borderSkipped: false,
    }]
  };

  // 3. Doughnut: Satisfaction
  const donutData = {
    labels: ["Highly Satisfied", "Satisfied", "Neutral"],
    datasets: [{
      data: [85, 13, 2],
      backgroundColor: ["#7c3aed", "#38bdf8", "#e2e8f0"],
      borderWidth: 0,
      hoverOffset: 6,
    }],
  };

  // 4. Line: Performance Speed (ms)
  const speedData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    datasets: [{
      label: "Global Latency (ms)",
      data: [42, 45, 38, 52, 48, 41],
      borderColor: "#10b981",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      borderWidth: 2,
      borderDash: [5, 5],
    }]
  };

  // 5. Bar: Deployments (Horizontal visual)
  const deployData = {
    labels: ["E-commerce", "SaaS", "Portfolios", "Corporate"],
    datasets: [{
      label: "Deployments",
      data: [24, 18, 35, 12],
      backgroundColor: ["#f472b6", "#a78bfa", "#38bdf8", "#fbbf24"],
      borderRadius: 4,
    }]
  };
  
  const deployOptions = {
    ...premiumOptions,
    indexAxis: 'y' as const,
  };

  return (
    <section id="stats" className="section" style={{ background: "var(--bg-primary)", position: "relative", padding: "5rem 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        {/* Main Dashboard Grid */}
        <div ref={chartsRef} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          {/* Top Row - KPI Counters */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                data-theme="light"
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
                style={{
                  padding: "1.5rem",
                  background: "var(--bg-card)",
                  borderRadius: "16px",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                  willChange: "transform, box-shadow"
                }}
              >
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>{stat.label}</div>
                <CountUp target={stat.value} suffix={stat.suffix} />
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{stat.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Middle Row - Primary Graphs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              data-theme="light"
              style={{ padding: "1.5rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-subtle)", boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Active Growth Trajectory</h3>
                <span style={{ fontSize: "0.7rem", padding: "0.25rem 0.5rem", borderRadius: "100px", background: "rgba(124,58,237,0.1)", color: "#7c3aed", fontWeight: 700 }}>+24% YOY</span>
              </div>
              <div style={{ height: "180px", width: "100%" }}>
                {chartsInView && <Line data={lineData} options={premiumOptions} />}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              data-theme="light"
              style={{ padding: "1.5rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-subtle)", boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Quarterly Value (M)</h3>
                <span style={{ fontSize: "0.7rem", padding: "0.25rem 0.5rem", borderRadius: "100px", background: "rgba(37,99,235,0.1)", color: "#2563eb", fontWeight: 700 }}>Avg ROI 3.2x</span>
              </div>
              <div style={{ height: "180px", width: "100%" }}>
                {chartsInView && <Bar data={barData} options={premiumOptions} />}
              </div>
            </motion.div>
          </div>

          {/* Bottom Row - Tertiary Graphs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              data-theme="light"
              style={{ padding: "1.5rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 1rem", alignSelf: "flex-start" }}>Client Satisfaction</h3>
              <div style={{ height: "140px", width: "140px", position: "relative" }}>
                {chartsInView && <Doughnut data={donutData} options={{ ...premiumOptions, cutout: "75%" }} />}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.8rem", color: "var(--text-primary)", pointerEvents: "none" }}>
                  98%
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              data-theme="light"
              style={{ padding: "1.5rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>System Latency (ms)</h3>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
              </div>
              <div style={{ height: "140px", width: "100%" }}>
                {chartsInView && <Line data={speedData} options={premiumOptions} />}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              data-theme="light"
              style={{ padding: "1.5rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}
            >
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 1rem" }}>Projects by Sector</h3>
              <div style={{ height: "140px", width: "100%" }}>
                {chartsInView && <Bar data={deployData} options={deployOptions} />}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}