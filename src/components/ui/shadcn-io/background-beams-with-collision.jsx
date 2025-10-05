import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const BackgroundBeamsWithCollision = ({ className = "", children }) => {
  const containerRef = useRef(null);
  const [beams, setBeams] = useState([]);
  const [particles, setParticles] = useState([]);

  // Spawn beams
  useEffect(() => {
    const spawnBeam = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 0.4;
      const color = `hsl(${260 + Math.random() * 40}, 80%, 60%)`;
      setBeams((prev) => [
        ...prev,
        {
          id: Math.random(),
          x: 50,
          y: 50,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color,
        },
      ]);
    };
    const interval = setInterval(spawnBeam, 500);
    return () => clearInterval(interval);
  }, []);

  // Animate beams + detect collisions
  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      setBeams((prevBeams) =>
        prevBeams.flatMap((beam) => {
          let { x, y, dx, dy, color } = beam;
          x += dx;
          y += dy;

          let collided = false;
          if (x < 0 || x > 100) {
            dx *= -1;
            collided = true;
          }
          if (y < 0 || y > 100) {
            dy *= -1;
            collided = true;
          }

          if (collided) {
            spawnExplosion(x, y, color);
          }

          return { ...beam, x, y, dx, dy };
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Particle explosion
  const spawnExplosion = (x, y, color) => {
    const newParticles = Array.from({ length: 20 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.7;
      return {
        id: Math.random(),
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        color,
        opacity: 1,
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
  };

  // Move and fade particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.dx,
            y: p.y + p.dy,
            opacity: p.opacity - 0.03,
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 ${className}`}
      style={{
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Beams */}
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute h-[2px] w-[10%] rounded-full"
          style={{
            left: `${beam.x}%`,
            top: `${beam.y}%`,
            background: beam.color,
            boxShadow: `0 0 10px ${beam.color}`,
          }}
        />
      ))}

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-[2px] h-[2px] rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Optional children */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundBeamsWithCollision;
