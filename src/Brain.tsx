import { useEffect, useRef } from "react";

type Pt = { x: number; y: number; h: number; ph: number; r: number };

// Cerveau vu de dessus, généré une seule fois : deux hémisphères en points, avec des « sillons ».
const PTS: Pt[] = (() => {
  const out: Pt[] = [];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (const h of [-1, 1]) {
    let n = 0;
    while (n < 520) {
      const a = rnd() * Math.PI * 2;
      const r = Math.sqrt(rnd());
      const ex = r * Math.cos(a);
      const ey = r * Math.sin(a);
      const y = ey * 0.96;
      const x = h * 0.43 + ex * 0.4 * (1 - 0.18 * Math.abs(ey));
      if (Math.sin(11 * y + 3 * Math.sin(7 * x) + h * 2) < -0.5) continue;
      out.push({ x, y, h, ph: rnd() * 6.28, r: 0.7 + rnd() * 1.1 });
      n++;
    }
  }
  return out;
})();

export type Side = "a" | "c" | null;

export default function Brain({ size, side = null }: { size: number; side?: Side }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const sideRef = useRef<Side>(side);
  sideRef.current = side;

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = size * dpr;
    c.height = size * dpr;
    ctx.scale(dpr, dpr);
    let raf = 0;
    const draw = (now: number) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, size, size);
      const k = (size / 2) * 0.92 * (1 + 0.015 * Math.sin(t * 1.2));
      for (const p of PTS) {
        const al = 0.3 + 0.7 * Math.abs(Math.sin(t * 1.4 + p.ph));
        const s = sideRef.current;
        ctx.fillStyle =
          s === "a" && p.h < 0
            ? `rgba(143,169,255,${al})`
            : s === "c" && p.h > 0
              ? `rgba(255,148,112,${al})`
              : `rgba(236,232,224,${al * (s ? 0.45 : 0.9)})`;
        ctx.beginPath();
        ctx.arc(size / 2 + p.x * k, size / 2 + p.y * k, p.r * (size / 360 + 0.35), 0, 6.283);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  const glow =
    side === "a" ? "rgba(47,91,255,.55)" : side === "c" ? "rgba(255,90,44,.5)" : "rgba(236,232,224,.22)";
  return (
    <canvas
      ref={ref}
      style={{ width: size, height: size, filter: `drop-shadow(0 0 ${size / 14}px ${glow})`, transition: "filter .4s" }}
    />
  );
}
