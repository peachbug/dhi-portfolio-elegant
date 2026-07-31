import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  phase: number;
  speed: number;
};

const COLORS = [
  "150, 185, 255", // soft blue
  "120, 205, 215", // muted cyan
  "160, 145, 220", // dim violet
];

/**
 * Fixed, full-screen, non-interactive animated background.
 * Layer 1: dark base. Layer 2: slow blurred gradient blobs (CSS).
 * Layer 3: canvas particle network with gentle mouse reaction.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let last = performance.now();
    let t = 0;

    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = width < 768 ? 26000 : 16000;
      const count = Math.min(110, Math.max(28, Math.round((width * height) / density)));
      particles = Array.from({ length: count }, () => spawn());
    };

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: 0.7 + Math.random() * 2.1,
      hue: Math.floor(Math.random() * COLORS.length),
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.35,
    });

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const linkDist = width < 768 ? 90 : 130;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!running) return;

      const dt = Math.min(48, now - last) / 16.6667;
      last = now;
      t += dt;

      ctx.clearRect(0, 0, width, height);

      // connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDist * linkDist) continue;
          const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.07;
          ctx.strokeStyle = `rgba(150, 180, 230, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // particles
      for (const p of particles) {
        if (!reduceMotion) {
          p.phase += 0.004 * p.speed * dt;
          p.x += (p.vx + Math.cos(p.phase) * 0.05) * dt;
          p.y += (p.vy + Math.sin(p.phase * 0.8) * 0.05) * dt;
        }

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 140 && d > 0.001) {
            const f = (1 - d / 140) * 0.35;
            p.x += (dx / d) * f * dt;
            p.y += (dy / d) * f * dt;
          }
        }

        // wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const twinkle = 0.35 + 0.25 * Math.sin(t * 0.01 * p.speed + p.phase);
        const color = COLORS[p.hue];

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(${color}, ${twinkle * 0.55})`);
        g.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${color}, ${twinkle * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onVisibility = () => {
      running = !document.hidden;
      last = performance.now();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      {/* Layer 1 — base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #090B14 0%, #050816 60%, #04060F 100%)",
        }}
      />

      {/* Layer 2 — slow blurred gradient blobs */}
      <div className="absolute inset-0">
        <span className="ab-blob ab-blob-1" />
        <span className="ab-blob ab-blob-2" />
        <span className="ab-blob ab-blob-3" />
      </div>

      {/* Layer 3 — particle network */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <style>{`
        .ab-blob {
          position: absolute;
          display: block;
          border-radius: 9999px;
          filter: blur(90px);
          will-change: transform, opacity;
          transform: translateZ(0);
        }
        .ab-blob-1 {
          width: 46vw; height: 46vw; min-width: 380px; min-height: 380px;
          top: -12%; left: -8%;
          background: radial-gradient(circle, rgba(72,88,220,0.12) 0%, rgba(72,88,220,0) 70%);
          animation: ab-drift-1 34s ease-in-out infinite alternate;
        }
        .ab-blob-2 {
          width: 52vw; height: 52vw; min-width: 420px; min-height: 420px;
          bottom: -18%; right: -10%;
          background: radial-gradient(circle, rgba(138,110,205,0.10) 0%, rgba(138,110,205,0) 70%);
          animation: ab-drift-2 40s ease-in-out infinite alternate;
        }
        .ab-blob-3 {
          width: 38vw; height: 38vw; min-width: 320px; min-height: 320px;
          top: 35%; left: 45%;
          background: radial-gradient(circle, rgba(64,180,190,0.08) 0%, rgba(64,180,190,0) 70%);
          animation: ab-drift-3 27s ease-in-out infinite alternate;
        }
        @keyframes ab-drift-1 {
          0%   { transform: translate3d(0,0,0) scale(1); opacity: 0.9; }
          100% { transform: translate3d(6vw, 5vh, 0) scale(1.12); opacity: 0.6; }
        }
        @keyframes ab-drift-2 {
          0%   { transform: translate3d(0,0,0) scale(1.05); opacity: 0.75; }
          100% { transform: translate3d(-7vw, -4vh, 0) scale(0.95); opacity: 1; }
        }
        @keyframes ab-drift-3 {
          0%   { transform: translate3d(-3vw,2vh,0) scale(0.95); opacity: 0.6; }
          100% { transform: translate3d(4vw, -6vh, 0) scale(1.15); opacity: 0.95; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ab-blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
