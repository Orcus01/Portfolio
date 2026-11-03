import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";

const roles = ["Java developer", "Interface builder", "Cloud explorer"];

export function RoleNotebook() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduced || paused || !visible) return;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % roles.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [reduced, paused, visible]);
  return (
    <div className="role-notebook" ref={ref}>
      <span className="sr-only">Java developer, interface builder, and cloud explorer.</span>
      <div className="notebook-pages" aria-hidden="true">
        <div className="notebook-rings">{roles.map((role) => <i key={role} />)}</div>
        <AnimatePresence initial={false} mode="sync">
          <motion.span
            className="notebook-page"
            key={reduced ? "static" : index}
            initial={reduced ? false : { rotateX: -90, opacity: 0, zIndex: 2 }}
            animate={{ rotateX: 0, opacity: 1, zIndex: 2 }}
            exit={reduced ? {} : { rotateX: 95, opacity: 0, zIndex: 3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {roles[reduced ? 0 : index]}
          </motion.span>
        </AnimatePresence>
        <span className="notebook-index">0{(reduced ? 0 : index) + 1} / 03</span>
      </div>
      {!reduced && (
        <button className="notebook-pause" aria-label={paused ? "Play role animation" : "Pause role animation"} onClick={() => setPaused(!paused)}>
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </button>
      )}
    </div>
  );
}

export function WorkPortal() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const left = useTransform(scrollYProgress, [0.05, 0.78], [0, -105]);
  const right = useTransform(scrollYProgress, [0.05, 0.78], [0, 105]);
  const scale = useTransform(scrollYProgress, [0, 0.85], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.42, 0.82], [0.2, 0.65, 1]);
  return (
    <section className="work-portal" ref={ref} aria-labelledby="portal-title">
      <div className="portal-stage">
        <motion.div className="portal-destination" style={reduced ? {} : { scale, opacity }}>
          <span className="portal-kicker">FROM IDEAS TO IMPLEMENTATION</span>
          <h2 id="portal-title">Behind the<br /><em>build.</em></h2>
          <a href="#work" className="portal-enter">Explore selected work <ArrowUpRight size={20} /></a>
        </motion.div>
        <div className="portal-doors" aria-hidden="true">
          <motion.div className="portal-door door-left" style={reduced ? {} : { rotateY: left }}>
            <div className="door-inset"><span>01 / THE PRACTICE</span><strong>Thoughtful<br />interfaces.</strong><i className="door-handle" /></div>
            <span className="door-bottom">DESIGN WITH INTENT</span>
          </motion.div>
          <motion.div className="portal-door door-right" style={reduced ? {} : { rotateY: right }}>
            <div className="door-inset"><span>02 / THE FOUNDATION</span><strong>Dependable<br />systems.</strong><i className="door-handle" /></div>
            <span className="door-bottom">BUILD TO CONNECT</span>
          </motion.div>
        </div>
        <span className="portal-scroll" aria-hidden="true">SCROLL TO OPEN <ArrowDown size={14} /></span>
      </div>
    </section>
  );
}

export function ProjectMotion({ children }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shineX = useMotionValue("50%");
  const shineY = useMotionValue("50%");
  const rotateX = useSpring(x, { stiffness: 170, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 170, damping: 24 });
  function move(event) {
    if (reduced || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    shineX.set(`${(event.clientX - bounds.left) / bounds.width * 100}%`);
    shineY.set(`${(event.clientY - bounds.top) / bounds.height * 100}%`);
    x.set(-(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 7);
    y.set((event.clientX - bounds.left - bounds.width / 2) / bounds.width * 9);
  }
  function reset() { x.set(0); y.set(0); }
  return (
    <div className="project-depth" ref={ref} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
      <motion.div className="project-depth-plane" style={reduced ? {} : { rotateX, rotateY }}>
        {children}
        {!reduced && <motion.span className="project-sheen" aria-hidden="true" style={{ "--shine-x": shineX, "--shine-y": shineY }} />}
        <span className="project-view-cue" aria-hidden="true">VIEW CASE STUDY <ArrowUpRight size={17} /></span>
      </motion.div>
    </div>
  );
}


export function MagneticLink({ children, className, ...props }) {
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 20 });
  const y = useSpring(0, { stiffness: 260, damping: 20 });
  function move(event) {
    if (reduced || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left - box.width / 2) * 0.18);
    y.set((event.clientY - box.top - box.height / 2) * 0.18);
  }
  const reset = () => { x.set(0); y.set(0); };
  return <motion.a {...props} className={`magnetic-link ${className || ""}`} style={reduced ? {} : { x, y }} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset} onBlur={reset}>{children}</motion.a>;
}

export function ChapterTransition({ kind, eyebrow, title, accent, target }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });
  const left = useTransform(progress, [0.08, 0.9], ["0%", "-102%"]);
  const right = useTransform(progress, [0.08, 0.9], ["0%", "102%"]);
  const yearY = useTransform(progress, [0, 1], ["18%", "-25%"]);
  const yearScale = useTransform(progress, [0, 1], [0.85, 1.3]);
  const reveal = useTransform(progress, [0.05, 0.9], ["circle(5% at 50% 50%)", "circle(80% at 50% 50%)"]);
  const textY = useTransform(progress, [0.1, 0.85], [45, 0]);
  const lineScale = useTransform(progress, [0.08, 0.9], [0, 1]);
  return (
    <section className={`chapter-transition chapter-${kind}`} ref={ref} aria-label={eyebrow}>
      <div className="chapter-stage">
        {kind === "years" && <motion.span className="chapter-year" aria-hidden="true" style={reduced ? {} : { y: yearY, scale: yearScale }}>2026</motion.span>}
        <motion.div className="chapter-message" style={reduced ? {} : { y: textY }}>
          <span className="chapter-eyebrow">{eyebrow}</span>
          <h2>{title}<br /><em>{accent}</em></h2>
          <a href={`#${target}`} className="chapter-link">{target === "contact" ? "Say hello" : `Explore ${target}`} <ArrowDown size={18} /></a>
        </motion.div>
        {kind === "panels" && <div className="chapter-shutters" aria-hidden="true">
          <motion.div className="chapter-shutter shutter-left" style={reduced ? {} : { x: left }}><span>BEHIND</span><small>THE SOFTWARE</small></motion.div>
          <motion.div className="chapter-shutter shutter-right" style={reduced ? {} : { x: right }}><span>THE CODE.</span><small>THE PERSON</small></motion.div>
        </div>}
        {kind === "curtain" && <motion.div className="chapter-curtain-panel" aria-hidden="true" style={reduced ? {} : { y: left }}><span>BEYOND<br />THE DAY JOB.</span></motion.div>}
        {kind === "years" && <div className="chapter-time-axis" aria-hidden="true"><span>2023</span><i><motion.b style={reduced ? {} : { scaleX: lineScale }} /></i><span>NOW</span></div>}
        {kind === "iris" && <motion.div className="chapter-aperture" aria-hidden="true" style={reduced ? {} : { clipPath: reveal }}><span>HELLO.</span></motion.div>}
        <span className="chapter-scroll" aria-hidden="true">KEEP SCROLLING <ArrowDown size={13} /></span>
      </div>
    </section>
  );
}
