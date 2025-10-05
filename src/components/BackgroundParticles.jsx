// src/components/BackgroundParticles.jsx
import React from "react";

/**
 * Non-intrusive background beams.
 * - absolute & pointer-events-none so it doesn't affect layout or clicks
 * - z-0 so it sits below content that you mark z-10
 */
const BackgroundParticles = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* soft blurred glow layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-slate-900 to-black opacity-60 blur-3xl" />

      {/* animated beams */}
      <div className="absolute inset-0">
        <div className="absolute left-[-50%] w-[200%] top-[22%] h-[2px] bg-gradient-to-r from-pink-400 to-indigo-500 opacity-40 animate-slide-6s" />
        <div className="absolute left-[-50%] w-[200%] top-[50%] h-[2px] bg-gradient-to-r from-violet-400 to-pink-400 opacity-30 animate-slide-10s" />
        <div className="absolute left-[-50%] w-[200%] top-[78%] h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 animate-slide-14s" />
      </div>
    </div>
  );
};

export default BackgroundParticles;
