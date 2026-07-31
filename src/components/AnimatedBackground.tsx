import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  depth: number; // 0 = far, 1 = near
  tone: number;
  phase: number;
  activation: number; // 0..1 transient brightness
};

type Edge = { a: number; b: number; len: number };

type Pulse = { edge: number; t: number; speed: number; dir: 1 | -1; life: number };

// Muted, desaturated accents — indigo, violet, teal, cyan.
const TONES = [
  "120, 134, 214", // muted indigo
  "138, 116, 196", // deep violet
  "96, 168, 176", // teal
  "108, 176, 196", // soft cyan
];

/**
 * Ambient computational-graph background.
 * Layer 1: near-black base wash.
 * Layer 2: slow aurora color fields (CSS, GPU-composited).
 * Layer 3: canvas — sparse graph, faint edges, traveling pulses, drifting
 *          rounded-rect "data packet" nodes across three depth planes.
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
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let running = true;
    let last = performance.now();
    let t = 0;
    let linkDist = 190;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    const build = () => {
      const density = width < 768 ? 44000 : 30000;
      const count = Math.min(64, Math.max(16, Math.round((width * height) / density)));

      nodes = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.035 * (0.35 + depth),
          vy: (Math.random() - 0.5) * 0.035 * (0.35 + depth),
          size: 1.4 + depth * 2.6,
          depth,
          tone: Math.floor(Math.random() * TONES.length),
          phase: Math.random() * Math.PI * 2,
          activation: 0,
        };
      });

      linkDist = width < 768 ? 150 : 210;
      rewire();
      pulses = [];
    };

    const rewire = () => {
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        let degree = 0;
        for (let j = i + 1; j < nodes.length; j++) {
          if (degree >= 3) break;
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > linkDist) continue;
          edges.push({ a: i, b: j, len: d });
          degree++;
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    // rounded-rect "packet" glyph
    const packet = (x: number, y: number, s: number, rot: number, fill: string) => {
      const r = s * 0.34;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.moveTo(-s + r, -s);
      ctx.lineTo(s - r, -s);
      ctx.quadraticCurveTo(s, -s, s, -s + r);
      ctx.lineTo(s, s - r);
      ctx.quadraticCurveTo(s, s, s - r, s);
      ctx.lineTo(-s + r, s);
      ctx.quadraticCurveTo(-s, s, -s, s - r);
      ctx.lineTo(-s, -s + r);
      ctx.quadraticCurveTo(-s, -s, -s, -s + r);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.restore();
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!running) return;

      const dt = Math.min(48, now - last) / 16.6667;
      last = now;
      t += dt;

      // easing pointer for a calm parallax
      pointer.x += (pointer.tx - pointer.x) * 0.02 * dt;
      pointer.y += (pointer.ty - pointer.y) * 0.02 * dt;

      ctx.clearRect(0, 0, width, height);

      // rewire slowly so the topology evolves without popping every frame
      if (Math.floor(t) % 240 === 0) rewire();

      // spawn a pulse occasionally
      if (!reduceMotion && edges.length && Math.random() < 0.012 * dt) {
        const edge = Math.floor(Math.random() * edges.length);
        pulses.push({
          edge,
          t: 0,
          speed: 0.0022 + Math.random() * 0.0026,
          dir: Math.random() < 0.5 ? 1 : -1,
          life: 1,
        });
        if (pulses.length > 14) pulses.shift();
      }

      // ---- edges
      ctx.lineWidth = 0.7;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d > linkDist) continue;
        const depth = (a.depth + b.depth) * 0.5;
        const alpha = (1 - d / linkDist) * (0.035 + depth * 0.045);
        ctx.strokeStyle = `rgba(132, 150, 196, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // ---- pulses along edges
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const e = edges[p.edge];
        if (!e) {
          pulses.splice(i, 1);
          continue;
        }
        p.t += p.speed * dt * 16.6667 * 0.06;
        if (p.t >= 1) {
          const target = p.dir === 1 ? nodes[e.b] : nodes[e.a];
          if (target) target.activation = 1;
          pulses.splice(i, 1);
          continue;
        }
        const from = p.dir === 1 ? nodes[e.a] : nodes[e.b];
        const to = p.dir === 1 ? nodes[e.b] : nodes[e.a];
        if (!from || !to) {
          pulses.splice(i, 1);
          continue;
        }
        const ease = p.t;
        const px = from.x + (to.x - from.x) * ease;
        const py = from.y + (to.y - from.y) * ease;
        const fade = Math.sin(Math.PI * p.t);

        // short comet trail along the edge
        const trail = 0.12;
        const bx = from.x + (to.x - from.x) * Math.max(0, ease - trail);
        const by = from.y + (to.y - from.y) * Math.max(0, ease - trail);
        const grad = ctx.createLinearGradient(bx, by, px, py);
        grad.addColorStop(0, "rgba(120, 176, 196, 0)");
        grad.addColorStop(1, `rgba(140, 190, 205, ${0.28 * fade})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      // ---- nodes
      for (const n of nodes) {
        if (!reduceMotion) {
          n.phase += 0.0016 * dt;
          n.x += n.vx * dt;
          n.y += n.vy * dt;
        }
        if (n.activation > 0) n.activation = Math.max(0, n.activation - 0.006 * dt);

        // parallax offset (deeper layers move less)
        const ox = pointer.active ? ((pointer.x - width / 2) / width) * -18 * n.depth : 0;
        const oy = pointer.active ? ((pointer.y - height / 2) / height) * -18 * n.depth : 0;

        if (n.x < -30) n.x = width + 30;
        if (n.x > width + 30) n.x = -30;
        if (n.y < -30) n.y = height + 30;
        if (n.y > height + 30) n.y = -30;

        const breathe = 0.28 + 0.14 * Math.sin(n.phase * 2.1);
        const a = Math.min(0.72, breathe + n.activation * 0.5);
        const tone = TONES[n.tone];
        const x = n.x + ox;
        const y = n.y + oy;
        const s = n.size * (1 + n.activation * 0.25);

        // soft halo only when activated — keeps the field flat and non-starry
        if (n.activation > 0.02) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, s * 7);
          g.addColorStop(0, `rgba(${tone}, ${0.16 * n.activation})`);
          g.addColorStop(1, `rgba(${tone}, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, s * 7, 0, Math.PI * 2);
          ctx.fill();
        }

        packet(x, y, s, n.phase * 0.25, `rgba(${tone}, ${a * 0.55})`);
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
            "radial-gradient(130% 100% at 50% -10%, #0B0E1A 0%, #090B14 45%, #050816 100%)",
        }}
      />

      {/* Layer 2 — slow aurora color fields */}
      <div className="absolute inset-0">
        <span className="ab-aurora ab-aurora-1" />
        <span className="ab-aurora ab-aurora-2" />
        <span className="ab-aurora ab-aurora-3" />
      </div>

      {/* Layer 3 — computational graph */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Layer 4 — glass sheen + faint grid, tightens the whole field */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,160,200,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(140,160,200,0.028) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage: "radial-gradient(90% 70% at 50% 30%, #000 0%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-0 backdrop-blur-[0.5px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.014) 0%, rgba(255,255,255,0) 30%, rgba(5,8,22,0.35) 100%)",
        }}
      />

      <style>{`
        .ab-aurora {
          position: absolute;
          display: block;
          border-radius: 9999px;
          filter: blur(110px);
          will-change: transform, opacity;
          transform: translateZ(0);
        }
        .ab-aurora-1 {
          width: 62vw; height: 46vw; min-width: 460px; min-height: 340px;
          top: -16%; left: -12%;
          background: radial-gradient(circle, rgba(78,92,168,0.13) 0%, rgba(78,92,168,0) 70%);
          animation: ab-drift-1 46s ease-in-out infinite alternate;
        }
        .ab-aurora-2 {
          width: 66vw; height: 52vw; min-width: 480px; min-height: 380px;
          bottom: -22%; right: -14%;
          background: radial-gradient(circle, rgba(112,92,160,0.11) 0%, rgba(112,92,160,0) 70%);
          animation: ab-drift-2 58s ease-in-out infinite alternate;
        }
        .ab-aurora-3 {
          width: 48vw; height: 40vw; min-width: 360px; min-height: 300px;
          top: 38%; left: 44%;
          background: radial-gradient(circle, rgba(58,132,142,0.09) 0%, rgba(58,132,142,0) 70%);
          animation: ab-drift-3 52s ease-in-out infinite alternate;
        }
        @keyframes ab-drift-1 {
          0%   { transform: translate3d(0,0,0) scale(1); opacity: 0.85; }
          100% { transform: translate3d(5vw, 4vh, 0) scale(1.14); opacity: 0.55; }
        }
        @keyframes ab-drift-2 {
          0%   { transform: translate3d(0,0,0) scale(1.06); opacity: 0.7; }
          100% { transform: translate3d(-6vw, -3vh, 0) scale(0.94); opacity: 1; }
        }
        @keyframes ab-drift-3 {
          0%   { transform: translate3d(-3vw,2vh,0) scale(0.94); opacity: 0.5; }
          100% { transform: translate3d(3vw, -5vh, 0) scale(1.16); opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ab-aurora { animation: none; }
        }
      `}</style>
    </div>
  );
}
