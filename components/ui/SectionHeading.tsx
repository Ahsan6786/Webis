"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  children?: ReactNode;
}

export default function SectionHeading({ label, title, titleHighlight, subtitle, align = "center", className, children }: SectionHeadingProps) {
  const alignClass = { left: "items-start text-left", center: "items-center text-center", right: "items-end text-right" }[align];

  return (
    <div className={cn("flex flex-col gap-4", alignClass, className)}>
      {label && (
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.4rem 1rem", borderRadius: "100px", background: "rgba(0,0,0,0.05)", color: "#000000", border: "1px solid rgba(0,0,0,0.1)", width: "fit-content" }}>
          {label}
        </span>
      )}
      <h2 style={{ fontWeight: 800, fontSize: "clamp(1.9rem, 5vw, 3rem)", lineHeight: 1.14, letterSpacing: "-0.025em", color: "var(--text-primary)", margin: 0 }}>
        {title}{" "}
        {titleHighlight && (
          <span style={{ background: "var(--gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {titleHighlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p style={{ maxWidth: "560px", lineHeight: 1.7, color: "var(--text-secondary)", fontSize: "1rem", margin: align === "center" ? "0 auto" : 0 }}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
