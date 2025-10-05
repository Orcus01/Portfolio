import Particles from "react-tsparticles";

export default function BackgroundParticles() {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: "transparent", // ✅ keep your theme background
        },
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true, area: 800 } },
          color: { value: "#00f5d4" }, // ✅ neon cyan
          links: {
            enable: true,
            color: "#00f5d4",
            distance: 150,
            opacity: 0.4,
            width: 1,
          },
          move: { enable: true, speed: 1, outModes: { default: "out" } },
          opacity: { value: 0.6 },
          size: { value: { min: 2, max: 4 } },
        },
        interactivity: {
          detectsOn: "window", // ✅ detect mouse/touch without blocking UI
          events: {
            onHover: { enable: true, mode: "repulse" }, // particles move away on hover/touch
            resize: true,
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,            // ✅ behind your content
        pointerEvents: "none" // ✅ buttons/links stay clickable
      }}
    />
  );
}
