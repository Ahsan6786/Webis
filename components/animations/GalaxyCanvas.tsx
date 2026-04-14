"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  tint: number;
  layer: number; // 1: Far, 2: Mid, 3: Near
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
  active: boolean;
  angle: number;
  progress: number;
}

export default function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let stars: Star[] = [];
    const MAX_SHOOTERS = 3;
    const shooters: ShootingStar[] = [];
    const shootingTimers: ReturnType<typeof setTimeout>[] = [];
    let t = 0;
    let lastDtTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const isMobile = window.innerWidth < 768;
      const baseDensity = isMobile ? 5000 : 2800; // Even more stars
      const count = Math.min(isMobile ? 300 : 650, Math.floor((canvas.width * canvas.height) / baseDensity));
      
      stars = Array.from({ length: count }, () => {
        const tintRoll = Math.random();
        const layerRoll = Math.random();
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() > 0.93 ? (Math.random() > 0.5 ? 2 : 1.5) : 1, // More varied and larger stars
          baseOpacity: Math.random() * 0.7 + 0.4, // Brighter base opacity
          twinkleSpeed: Math.random() * 0.04 + 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          tint: tintRoll < 0.6 ? 0 : tintRoll < 0.85 ? 1 : 2,
          layer: layerRoll < 0.6 ? 1 : layerRoll < 0.9 ? 2 : 3,
        };
      });
    };

    const rTint = (tint: number) => {
      if (tint === 1) return [180, 140, 255]; // Purp-blue
      if (tint === 2) return [255, 120, 180]; // Pinkish
      return [240, 240, 255]; // Cool white
    };

    const spawnShootingStar = (): ShootingStar => ({
      x: Math.random() * canvas.width * 0.9,
      y: Math.random() * canvas.height * 0.5,
      len: 150 + Math.random() * 250,
      speed: 8 + Math.random() * 8,
      opacity: 0,
      active: true,
      angle: 200 + Math.random() * 30,
      progress: 0,
    });

    const scheduleShootingStar = (slot: number) => {
      const delay = 3000 + Math.random() * 5000;
      shootingTimers[slot] = setTimeout(() => {
        shooters[slot] = spawnShootingStar();
        scheduleShootingStar(slot);
      }, delay);
    };

    /* ── Nebula: deeper, richer shifting clouds ── */
    const drawNebula = () => {
      const shiftX = Math.sin(t * 0.0002) * 40;
      const shiftY = Math.cos(t * 0.00015) * 30;
      
      // Dynamic color shifts
      const hue1 = 280 + Math.sin(t * 0.0001) * 20; // Purple shift
      const hue2 = 330 + Math.cos(t * 0.00008) * 15; // Pink shift

      const g1 = ctx.createRadialGradient(
        canvas.width * 0.7 + shiftX, canvas.height * 0.2 + shiftY, 0, 
        canvas.width * 0.7 + shiftX, canvas.height * 0.2 + shiftY, 
        canvas.width * 0.7
      );
      g1.addColorStop(0, `hsla(${hue1}, 70%, 50%, 0.12)`);
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const g2 = ctx.createRadialGradient(
        canvas.width * 0.2 - shiftX, canvas.height * 0.8 - shiftY, 0,
        canvas.width * 0.2 - shiftX, canvas.height * 0.8 - shiftY,
        canvas.width * 0.5
      );
      g2.addColorStop(0, `hsla(${hue2}, 70%, 40%, 0.1)`);
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    /* ── Stars: Parallax-aware drawing ── */
    const drawStars = (speedMult: number) => {
      for (const star of stars) {
        // Subtle drift based on layer
        const drift = star.layer * 0.08 * speedMult;
        star.y += drift;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        const twinkle = (Math.sin(t * star.twinkleSpeed + star.twinklePhase) + 1) / 2;
        const alpha = star.baseOpacity * (0.45 + twinkle * 0.55); // Higher min visibility

        const x = Math.round(star.x);
        const y = Math.round(star.y);
        const [r, g, b] = rTint(star.tint);

        if (star.size === 1) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fillRect(x, y, 1, 1);
        } else {
          const a1 = alpha * 0.6;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a1})`;
          ctx.fillRect(x - 2, y, 5, 1);
          ctx.fillRect(x, y - 2, 1, 5);
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    };

    const drawShootingStar = (s: ShootingStar, speedMult: number) => {
      if (!s.active) return;
      s.progress += s.speed * speedMult;
      const totalLen = s.len + canvas.width * 0.2;
      const frac = s.progress / totalLen;

      if (frac < 0.1) s.opacity = frac / 0.1;
      else if (frac > 0.8) s.opacity = 1 - (frac - 0.8) / 0.2;
      else s.opacity = 1;

      if (frac >= 1) { s.active = false; return; }

      const rad = (s.angle * Math.PI) / 180;
      const tailLen = Math.min(s.progress, s.len);
      const ex = s.x + Math.cos(rad) * s.progress;
      const ey = s.y + Math.sin(rad) * s.progress;
      const sx = ex - Math.cos(rad) * tailLen;
      const sy = ey - Math.sin(rad) * tailLen;

      const grad = ctx.createLinearGradient(sx, sy, ex, ey);
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(0.5, `rgba(180, 140, 255, ${s.opacity * 0.6})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity * 0.9})`);

      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    };

    const draw = (now: number) => {
      const dt = (now - lastDtTime) / 1000;
      lastDtTime = now;
      const speedMult = Math.min(dt * 60, 2.0);
      t += speedMult;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNebula();
      drawStars(speedMult);
      for (const s of shooters) drawShootingStar(s, speedMult);

      raf = requestAnimationFrame(draw);
    };

    resize();

    for (let i = 0; i < MAX_SHOOTERS; i++) {
      shooters.push({ x: 0, y: 0, len: 0, speed: 0, opacity: 0, active: false, angle: 0, progress: 0 });
      setTimeout(() => scheduleShootingStar(i), i * 800);
    }

    raf = requestAnimationFrame((now) => {
      lastDtTime = now;
      draw(now);
    });

    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      for (const timer of shootingTimers) clearTimeout(timer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
        // Hint to browser to reduce anti-aliasing interpolation on pixel-snapped shapes
        imageRendering: "pixelated"
      }}
    />
  );
}
