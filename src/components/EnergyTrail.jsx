import { useEffect, useRef } from "react";

// A small procedural ribbon renderer: no images, tracking, or animation library.
export default function EnergyTrail() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(pointer: fine)");
    let frame = 0,
      width = 0,
      height = 0,
      active = false,
      entered = false;
    let targetX = 0,
      targetY = 0,
      x = 0,
      y = 0,
      lastTime = 0,
      phase = 0;
    let trail = [];
    let heroOnscreen = true;
    const wake = () => {
      if (active && !frame) {
        lastTime = 0;
        frame = requestAnimationFrame(draw);
      }
    };
    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!entered) {
        x = targetX = width * 0.18;
        y = targetY = height * 0.58;
      }
      trail = Array.from({ length: 32 }, () => ({ x, y }));
      wake();
    };
    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      entered = true;
      targetX = event.clientX;
      targetY = event.clientY;
      wake();
    };
    const leave = () => {
      entered = false;
    };
    const stroke = (points, color, lineWidth, glow) => {
      ctx.beginPath();
      points.forEach(([px, py], i) =>
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py),
      );
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.shadowColor = "#ff4b05";
      ctx.shadowBlur = glow;
      ctx.stroke();
    };
    const draw = (time) => {
      frame = 0;
      if (!active) return;
      const interval = fine.matches && width >= 900 ? 1000 / 60 : 1000 / 30;
      if (lastTime && time - lastTime < interval - 1) {
        frame = requestAnimationFrame(draw);
        return;
      }
      // Time-based animation retains the same speed on high-refresh displays.
      const dt = Math.min((time - (lastTime || time)) / 1000, 0.04);
      lastTime = time;
      phase += dt;
      ctx.clearRect(0, 0, width, height);
      const desktop = fine.matches && width >= 900;
      if ((!entered || !desktop) && !heroOnscreen) return;
      if (!entered || !desktop) {
        targetX =
          width * (desktop ? 0.18 : 0.14) +
          Math.sin(phase * 0.4) * (desktop ? 60 : 10);
        targetY = height * (desktop ? 0.48 : 0.66) + Math.cos(phase * 0.55) * 36;
      }
      const follow = 1 - Math.exp(-dt * 12);
      x += (targetX - x) * follow;
      y += (targetY - y) * follow;
      trail[0] = { x, y };
      for (let i = 1; i < trail.length; i++) {
        const ease = 1 - Math.exp(-dt * 22);
        trail[i].x += (trail[i - 1].x - trail[i].x) * ease;
        trail[i].y += (trail[i - 1].y - trail[i].y) * ease;
      }
      const radius = desktop ? 47 : 24;
      const lightTheme = document.documentElement.dataset.theme === "light";
      const halo = ctx.createRadialGradient(x, y, 0, x, y, radius * 4);
      halo.addColorStop(
        0,
        lightTheme ? "rgba(235,74,12,.13)" : "rgba(255,69,0,.20)",
      );
      halo.addColorStop(0.4, "rgba(255,64,0,.065)");
      halo.addColorStop(1, "rgba(255,64,0,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(x - radius * 4, y - radius * 4, radius * 8, radius * 8);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (desktop) {
        for (let strand = 0; strand < 3; strand++) {
          const points = trail
            .slice()
            .reverse()
            .map((p, i) => {
              const taper = i / (trail.length - 1);
              return [
                p.x + Math.sin(phase * 4 + i * 0.22 + strand * 2) * 10 * taper,
                p.y + Math.cos(phase * 3 + i * 0.19 + strand * 2) * 10 * taper,
              ];
            });
          stroke(points, "rgba(255,68,0,.2)", 2, 9);
          stroke(points, "rgba(255,139,33,.5)", 0.6, 0);
        }
      }
      // Rotating torus-knot strands give the light its folded, three-dimensional shape.
      for (let strand = 0; strand < 4; strand++) {
        const points = [];
        for (let step = 0; step <= 96; step++) {
          const t = (step / 96) * Math.PI * 2;
          const twist = phase * 1.4 + strand * 0.24;
          const ring = radius * (0.66 + 0.28 * Math.cos(3 * t + twist));
          const px = ring * Math.cos(2 * t + twist);
          const py = ring * Math.sin(2 * t + twist);
          const pz = radius * 0.64 * Math.sin(3 * t + twist);
          const yaw = phase * 0.65;
          const rx = px * Math.cos(yaw) + pz * Math.sin(yaw);
          const rz = -px * Math.sin(yaw) + pz * Math.cos(yaw);
          const perspective = 260 / (260 - rz);
          points.push([
            x + rx * perspective,
            y + (py * 0.55 + rz * 0.55) * perspective,
          ]);
        }
        stroke(
          points,
          lightTheme ? "rgba(235,66,0,.4)" : "rgba(255,54,0,.48)",
          3,
          desktop ? 15 : 8,
        );
        stroke(
          points,
          strand % 2 ? "rgba(255,232,151,.95)" : "rgba(255,111,24,.95)",
          0.85,
          0,
        );
      }
      ctx.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      active = !reduced.matches && !document.hidden;
      canvas.hidden = reduced.matches;
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      ctx.clearRect(0, 0, width, height);
      if (active) frame = requestAnimationFrame(draw);
    };
    const hero = document.querySelector(".hero-scroll-scene");
    const visibility = new IntersectionObserver(([entry]) => {
      heroOnscreen = entry.isIntersecting;
      if (heroOnscreen) wake();
    });
    if (hero) visibility.observe(hero);
    resize();
    sync();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    fine.addEventListener("change", resize);
    return () => {
      active = false;
      visibility.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      fine.removeEventListener("change", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="energy-trail" aria-hidden="true" />;
}
