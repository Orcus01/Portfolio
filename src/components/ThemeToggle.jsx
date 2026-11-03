import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export default function ThemeToggle({ theme, onChange }) {
  const reduced = useReducedMotion();
  const pull = useMotionValue(0);
  const cord = useSpring(pull, { stiffness: 360, damping: 14, mass: 0.55 });
  const gripY = useTransform(cord, value => 62 + value);
  const ropePath = useTransform(cord, value => `M22 0 C22 20 ${22 + value * 0.08} ${35 + value * 0.5} 22 ${56 + value}`);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const returnTimer = useRef(null);
  const [pulling, setPulling] = useState(false);
  function press(event) {
    if (running.current || (event.pointerType === "mouse" && event.button !== 0)) return;
    clearTimeout(returnTimer.current);
    suppressClick.current = false;
    gesture.current = { id: event.pointerId, y: event.clientY, distance: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    setPulling(true);
  }
  function move(event) {
    if (gesture.current?.id !== event.pointerId) return;
    const distance = Math.max(0, Math.min(70, event.clientY - gesture.current.y));
    gesture.current.distance = distance;
    pull.set(reduced ? 0 : distance);
  }
  function release(event, cancelled = false) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    setPulling(false);
    pull.set(0);
    suppressClick.current = current.distance > 5 || cancelled;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!cancelled && current.distance >= 24) switchTheme(event);
  }
  function click(event) {
    if (event.detail !== 0 && suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    if (!running.current && !reduced) {
      pull.set(26);
      clearTimeout(returnTimer.current);
      returnTimer.current = setTimeout(() => pull.set(0), 140);
    }
    switchTheme(event);
  }
  const running = useRef(false);
  const transitionRef = useRef(null);
  const mounted = useRef(true);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(returnTimer.current);
      transitionRef.current?.skipTransition();
      document.documentElement.classList.remove("theme-revealing");
    };
  }, []);

  async function switchTheme(event) {
    if (running.current) return;
    const root = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      flushSync(() => onChange(next));
    };
    if (reduced || !document.startViewTransition) {
      apply();
      return;
    }
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = Math.min(innerHeight, box.top + 94);
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-radius", `${radius}px`);
    running.current = true;
    setBusy(true);
    root.classList.add("theme-revealing");
    try {
      const transition = document.startViewTransition(apply);
      transitionRef.current = transition;
      // Skipped/unsupported snapshots must never leave a rejected promise behind.
      await transition.finished;
    } catch {
      if (mounted.current) apply();
    } finally {
      transitionRef.current = null;
      root.classList.remove("theme-revealing");
      running.current = false;
      if (mounted.current) setBusy(false);
    }
  }

  return (
    <span className="pull-switch" data-pulling={pulling}>
    <button
      className="theme-toggle pull-switch-button"
      data-mode={theme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      aria-busy={busy}
      title="Pull the cord to change the light"
      onPointerDown={press}
      onPointerMove={move}
      onPointerUp={event => release(event)}
      onPointerCancel={event => release(event, true)}
      onLostPointerCapture={event => release(event, true)}
      onClick={click}
    >
      <span className="theme-orbit" aria-hidden="true"><Sun className="theme-sun" size={18} /><Moon className="theme-moon" size={18} /></span>
      <motion.svg className="pull-cord" viewBox="0 0 44 160" aria-hidden="true">
        <motion.path d={ropePath} className="cord-shadow" />
        <motion.path d={ropePath} className="cord-thread" />
        <motion.g style={{ y: gripY }}>
          <rect x="16" y="-7" width="12" height="23" rx="6" className="cord-grip" />
          <path d="M19 0h6M19 4h6M19 8h6" className="grip-grooves" />
        </motion.g>
      </motion.svg>
    </button>
    <span className="pull-hint" aria-hidden="true">PULL</span>
    </span>
  );
}
