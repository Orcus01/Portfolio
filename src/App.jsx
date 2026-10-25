import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Download,
  Search,
  X,
  Moon,
  Sun,
  Menu,
  Check,
  Copy,
  Command,
  ExternalLink,
  Plus,
} from "lucide-react";
import { AiFillGithub as Github } from "react-icons/ai";
import { BlurFade } from "./components/ui/blur-fade";
import { Button } from "./components/ui/button";
import BrandMark from "./components/BrandMark";
import ProjectVisual from "./components/ProjectVisual";
import { caseStudies } from "./data/caseStudies";
import {
  profile,
  projects,
  experience,
  skillGroups,
  recognition,
} from "./data/portfolio";
import repositories from "./data/github.json";
import avatar from "./assets/japneet-balanced-avatar.png";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionValue,
} from "motion/react";

const navigation = [
  ["work", "Work"],
  ["about", "About"],
  ["experience", "Experience"],
  ["contact", "Contact"],
];
const external = { target: "_blank", rel: "noopener noreferrer" };
function isBackdropClick(event) {
  if (event.target !== event.currentTarget) return false;
  const { left, right, top, bottom } =
    event.currentTarget.getBoundingClientRect();
  return (
    event.clientX < left ||
    event.clientX > right ||
    event.clientY < top ||
    event.clientY > bottom
  );
}
function RevealSection({ children, className = "", ...props }) {
  return (
    <section {...props} className={className}>
      {children}
    </section>
  );
}
function CareerTimeline({ children }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  return (
    <div className="timeline career-timeline" ref={ref}>
      <motion.span
        className="career-progress"
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : scaleY }}
      />
      {children}
    </div>
  );
}
function SectionLabel({ children, number }) {
  return (
    <div className="section-label">
      <span>
        {number} / {children}
      </span>
      <span className="label-line" />
    </div>
  );
}
function SystemDrawing() {
  const [layer, setLayer] = useState(0);
  const layers = [
    ["Interface", "React · Next.js · Angular"],
    ["Application", "Java · Spring Boot · REST"],
    ["Foundation", "MySQL · Cloud · Testing"],
  ];
  return (
    <div className="system-drawing">
      <div className="drawing-caption">
        <span>FIG. 01 — HOW I BUILD</span>
        <span>EXPLORE THE LAYERS ↘</span>
      </div>
      <svg
        viewBox="0 0 540 430"
        role="img"
        aria-label="An exploded engineering diagram of interface, application, and foundation layers"
      >
        <defs>
          <pattern
            id="dots"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.65" fill="currentColor" opacity=".22" />
          </pattern>
        </defs>
        <rect width="540" height="430" fill="url(#dots)" />
        <g
          className="diagram-lines"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
        >
          <path d="M110 140v145M270 60v145M430 140v145M270 220v145" />
        </g>
        {[2, 1, 0].map((i) => (
          <g
            key={i}
            className={`diagram-layer layer-${i} ${layer === i ? "selected" : ""}`}
            style={{ "--layer": i }}
          >
            <path
              d={`M110 ${140 + i * 65} L270 ${60 + i * 65} L430 ${140 + i * 65} L270 ${220 + i * 65} Z`}
            />
            <path
              className="layer-edge"
              d={`M110 ${140 + i * 65} v12 L270 ${232 + i * 65} L430 ${152 + i * 65} v-12 M270 ${220 + i * 65} v12`}
            />
            {i === 0 && (
              <g className="diagram-window" transform="translate(220 125)">
                <path d="M-40 0L50-45L115-12L25 33Z" />
                <path d="M-25 0L45-35M-10 10L60-25M5 19L75-16" />
              </g>
            )}
          </g>
        ))}
        <circle cx="270" cy="60" r="5" className="diagram-dot" />
        <text x="26" y="397">
          JS / SYSTEMS THAT CONNECT
        </text>
        <text x="455" y="397">
          2026
        </text>
      </svg>
      <div className="layer-controls" aria-label="Explore engineering layers">
        {layers.map(([title, tech], i) => (
          <button
            key={title}
            aria-pressed={layer === i}
            onClick={() => setLayer(i)}
          >
            <span>0{i + 1}</span>
            <strong>{title}</strong>
            <small>{tech}</small>
            <Plus size={14} />
          </button>
        ))}
      </div>
      <div className="layer-detail" aria-live="polite">
        <strong>{layers[layer][0]}</strong>
        <p>
          {(layer === 0
            ? skillGroups[1].slice(1)
            : layer === 1
              ? skillGroups[0].slice(1)
              : [...skillGroups[2].slice(1), ...skillGroups[3].slice(1)]
          ).join(" · ")}
        </p>
      </div>
    </div>
  );
}
function CursorCompanion() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-200),
    y = useMotionValue(-200);
  const smoothX = useSpring(x, { stiffness: 150, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 25 });
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(query.matches && !reduced);
    sync();
    query.addEventListener("change", sync);
    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setHovered(Boolean(event.target?.closest?.("a,button,input,summary")));
    };
    const leave = () => {
      x.set(-200);
      y.set(-200);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [reduced, x, y]);
  if (!enabled) return null;
  return (
    <div className="cursor-companion" aria-hidden="true">
      <motion.div
        className="cursor-orbit"
        style={{ left: smoothX, top: smoothY }}
        animate={{
          width: hovered ? 32 : 12,
          height: hovered ? 32 : 12,
          opacity: hovered ? 0.4 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
function PortraitExperience({ stage }) {
  const reduced = useReducedMotion();
  const [take, setTake] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 90, damping: 20 });
  const rotateX = useSpring(pointerY, { stiffness: 90, damping: 20 });
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 50]);
  const photoScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduced ? 1 : 1.1],
  );
  const driftX = useSpring(0, { stiffness: 70, damping: 22 });
  const driftY = useSpring(0, { stiffness: 70, damping: 22 });
  useEffect(() => {
    if (reduced) return;
    const move = (event) => {
      if (event.pointerType !== "mouse" || window.innerWidth < 900) return;
      const px = event.clientX / window.innerWidth - 0.5;
      const py = event.clientY / window.innerHeight - 0.5;
      pointerX.set(px * 12);
      pointerY.set(-py * 8);
      driftX.set(px * 28);
      driftY.set(py * 18);
    };
    const reset = () => {
      pointerX.set(0);
      pointerY.set(0);
      driftX.set(0);
      driftY.set(0);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [reduced, pointerX, pointerY, driftX, driftY]);
  return (
    <div className="hero-person portrait-experience mode-avatar">
      <motion.div
        className="portrait-parallax"
        style={{ y: photoY, scale: photoScale }}
      >
        <motion.div
          className="portrait-tilt"
          style={reduced ? {} : { rotateX, rotateY, x: driftX, y: driftY }}
        >
          <motion.div
            key={take}
            className="portrait-exposure"
            initial={
              reduced
                ? false
                : { opacity: 0, y: 35, scale: 1.06, filter: "blur(7px)" }
            }
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: reduced ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={avatar}
              alt="Illustrated Japneet Singh with a navy turban, full beard, glowing orange glasses and crossed arms"
              width="1142"
              height="1377"
              fetchpriority="high"
            />
            {!reduced && (
              <>
                <motion.span
                  className="portrait-shutter shutter-top"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.span
                  className="portrait-shutter shutter-bottom"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.span
                  className="camera-focus"
                  initial={{ opacity: 0, scale: 1.3 }}
                  animate={{ opacity: [0, 0.8, 0], scale: [1.3, 1, 1] }}
                  transition={{ duration: 1.6, times: [0, 0.35, 1] }}
                  aria-hidden="true"
                >
                  <i />
                  <i />
                  <i />
                  <i />
                </motion.span>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="portrait-controls" aria-label="Avatar animation">
        <button
          className="replay-photo"
          aria-label="Replay portrait reveal"
          onClick={() => setTake((t) => t + 1)}
        >
          ↺
        </button>
      </div>
    </div>
  );
}
function PersonalHero() {
  const stage = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: transitionProgress } = useScroll({
    target: stage,
    offset: ["start start", "end end"],
  });
  const heroDim = useTransform(
    transitionProgress,
    [0, 0.55, 1],
    [1, 0.85, 0.3],
  );
  const [note, setNote] = useState(null);
  const notes = [
    {
      id: "mind",
      label: "The mindset",
      title: "Curiosity first.\nThen, good questions.",
      detail:
        "I like understanding how the pieces fit before deciding what to build. From banking platforms to plant diagnosis, every project starts with a problem worth understanding.",
    },
  ];
  return (
    <div ref={stage} className="hero-scroll-scene">
      <motion.section
        className="hero personal-hero"
        aria-labelledby="hero-title"
        style={reduced ? {} : { opacity: heroDim }}
      >
        <div className="hero-meta">
          <span>
            <i className="status-dot" /> SOFTWARE ENGINEER / INDIA
          </span>
          <span>A LITTLE LOGIC. A LOT OF CURIOSITY.</span>
        </div>
        <h1 id="hero-title" className="sliding-name" aria-label="Japneet Singh">
          {["JAPNEET", "SINGH"].map((word, i) => (
            <span className="name-window" key={word} aria-hidden="true">
              <motion.span
                initial={reduced ? false : { y: "110%", rotate: 3 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.12 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
                {i === 1 && <span className="name-period">.</span>}
              </motion.span>
            </span>
          ))}
        </h1>
        <div className="portrait-stage">
          <p className="mobile-role-line">
            Java full-stack developer · Web & cloud
          </p>
          <div className="portrait-halo" aria-hidden="true" />
          <PortraitExperience stage={stage} />
          <div className="hero-introduction">
            <BlurFade delay={0.25}>
              <span className="current-role">
                <i /> Currently at <strong>Cognizant</strong>
              </span>
              <h2>
                Software that works.
                <br />
                <em>From screen to system.</em>
              </h2>
              <p>
                I build Java backends, web interfaces, and the cloud
                infrastructure that connects them.
              </p>
              <div className="hero-actions">
                <Button asChild className="primary-button">
                  <a href="#work">
                    View my work <ArrowDown size={16} />
                  </a>
                </Button>
                <a
                  className="secondary-button"
                  href={profile.resume}
                  {...external}
                >
                  Resume <ArrowUpRight size={16} />
                </a>
              </div>
            </BlurFade>
          </div>
          <div className="personal-notes">
            {notes.map((n, i) => (
              <motion.div
                key={n.id}
                className={`personal-note note-${n.id}`}
                initial={
                  reduced ? false : { opacity: 0, x: i === 0 ? -28 : 28 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.7 + i * 0.1 }}
              >
                <svg
                  className="sketch-arrow"
                  viewBox="0 0 170 65"
                  aria-hidden="true"
                >
                  <path
                    d={
                      i === 0
                        ? "M5 50 Q65 -5 155 30 M141 20 L156 30 L140 37"
                        : "M165 55 Q90 -5 10 25 M25 14 L9 25 L27 32"
                    }
                  />
                </svg>
                <button
                  aria-expanded={note === n.id}
                  aria-controls={`note-${n.id}`}
                  onClick={() => setNote(note === n.id ? null : n.id)}
                >
                  <small>
                    {n.label} <Plus size={12} />
                  </small>
                  <span>{n.title}</span>
                </button>
                {note === n.id && (
                  <p id={`note-${n.id}`} className="note-detail">
                    {n.detail}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="hero-bottom">
          <span>JAVA / SPRING / REACT / CLOUD</span>
          <span>ENGINEERING WITH A HUMAN SIDE.</span>
          <a href="#work">
            SCROLL TO DISCOVER <ArrowDown size={12} />
          </a>
        </div>
      </motion.section>
    </div>
  );
}
export default function App() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [menu, setMenu] = useState(false);
  const [command, setCommand] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const menuTrigger = useRef(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme-v2") === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });
  const [active, setActive] = useState("work");
  const detail = useRef(null);
  const palette = useRef(null);
  const copyTimer = useRef();
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme-v2", theme);
    } catch {}
  }, [theme]);
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && menu) {
        setMenu(false);
        menuTrigger.current?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommand((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menu]);
  useEffect(() => {
    const dialog = detail.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
    else if (!selected && dialog?.open) dialog.close();
  }, [selected]);
  useEffect(() => {
    const dialog = palette.current;
    if (command && dialog && !dialog.open) dialog.showModal();
    else if (!command && dialog?.open) dialog.close();
  }, [command]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -60% 0px" },
    );
    [...navigation, ["recognition"], ["github"]].forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenu(false);
    };
    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow =
      selected || command || menu ? "hidden" : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected, command, menu]);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyFailed(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }
  const normalizedQuery = query.trim().toLowerCase();
  const searched = projects.filter((p) =>
    [p.title, p.subtitle, p.description, ...p.stack, ...p.highlights]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );
  const visible = searched.filter(
    (p) => filter === "All" || p.category === filter,
  );
  const jump = (id) => {
    setMenu(false);
    setCommand(false);
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      }),
    );
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <CursorCompanion />
      <motion.div className="reading-progress" style={{ scaleX: progress }} />
      <header className="header">
        <a href="#" className="wordmark" aria-label="Japneet Singh home">
          <BrandMark />
          <span className="brand-name">
            Japneet Singh<small>SOFTWARE ENGINEER</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          {navigation.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <button
            className="icon-button command-trigger"
            aria-label="Open quick navigation"
            onClick={() => setCommand(true)}
          >
            <Command size={16} />
            <span>K</span>
          </button>
          <button
            className="icon-button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <a className="resume-link" href={profile.resume} {...external}>
            Resume <ArrowUpRight size={15} />
          </a>
          <button
            className="icon-button menu-trigger"
            aria-label={menu ? "Close menu" : "Open menu"}
            ref={menuTrigger}
            aria-controls="mobile-navigation"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {menu && (
        <nav
          id="mobile-navigation"
          className="mobile-menu"
          aria-label="Mobile navigation"
        >
          {navigation.map(([id, label], i) => (
            <button key={id} onClick={() => jump(id)}>
              <small>0{i + 1}</small>
              {label}
              <ArrowUpRight />
            </button>
          ))}
          <a href={profile.resume} {...external}>
            View resume <Download size={18} />
          </a>
        </nav>
      )}
      <main id="main">
        <PersonalHero />
        <section id="work" className="section work-section">
          <SectionLabel number="01">SELECTED WORK</SectionLabel>
          <div className="section-heading">
            <h2>
              Selected work<span className="heading-count">04</span>
            </h2>
            <p>
              Web, mobile, and backend projects. Explore the product, my
              contribution, and the engineering behind it.
            </p>
          </div>
          <div className="project-toolbar">
            <div className="filters" aria-label="Filter projects">
              {["All", "Full stack", "Backend", "Mobile & AI"].map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                  {f === "All" && (
                    <sup>{String(searched.length).padStart(2, "0")}</sup>
                  )}
                </button>
              ))}
            </div>
            <label className="project-search">
              <Search size={16} />
              <span className="sr-only">Search projects</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search projects"
                placeholder="Find a project or technology"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search">
                  <X size={15} />
                </button>
              )}
            </label>
          </div>
          <div className="project-grid">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                className="project-chapter"
                initial={reducedMotion ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <article className="project">
                  <button
                    className="project-open"
                    aria-label={`Read about ${p.title}`}
                    onClick={() => setSelected(p)}
                  >
                    <ProjectVisual project={p} />
                    <div className="project-story">
                      <span className="eyebrow">
                        0{projects.indexOf(p) + 1} / {p.category} / {p.year}
                      </span>
                      <div className="project-title">
                        <h3>{p.title}</h3>
                      </div>
                      <p className="project-summary">
                        {caseStudies[p.id].summary}
                      </p>
                      <p className="project-role">{caseStudies[p.id].role}</p>
                      <p className="project-evidence">
                        {caseStudies[p.id].evidence}
                      </p>
                      <div className="project-stack">
                        {p.stack.slice(0, 4).map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                      <span className="case-link">
                        View case study{" "}
                        <span className="project-arrow">
                          <ArrowUpRight size={19} />
                        </span>
                      </span>
                    </div>
                  </button>
                </article>
              </motion.div>
            ))}
          </div>
          {visible.length === 0 && (
            <div className="empty-state">
              <h3>No matching projects.</h3>
              <p>Try Java, Flutter, React, or a different category.</p>
              <Button
                className="primary-button"
                onClick={() => {
                  setQuery("");
                  setFilter("All");
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </section>
        <section id="about" className="section about-section">
          <SectionLabel number="02">THE PERSON BEHIND THE CODE</SectionLabel>
          <div className="about-capabilities">
            <div className="about-copy">
              <div className="about-identity">
                <img
                  src={avatar}
                  width="1142"
                  height="1377"
                  alt="Japneet Singh avatar"
                  loading="lazy"
                />
                <div>
                  <span className="eyebrow">JAPNEET SINGH</span>
                  <h2>Built with curiosity.</h2>
                </div>
              </div>
              <p>
                I’m a software developer at Cognizant, working across Java, web
                interfaces, banking platforms, and cloud infrastructure.
              </p>
              <p>
                Outside work, I’ve built mobile applications, contributed to
                published plant-disease research, and helped organise IEEE
                communities.
              </p>
              <a className="text-link" href={profile.resume} {...external}>
                Read my resume <Download size={17} />
              </a>
              <div className="education-note">
                <small>EDUCATION / 2021–2025</small>
                <strong>Chandigarh University</strong>
                <span>
                  B.E. Computer Science & Engineering · 8.02 / 10 CGPA
                </span>
              </div>
            </div>
            <div className="capability-panel">
              <h3>How I build</h3>
              <p className="capability-intro">
                Select a layer to explore the tools I work with.
              </p>
              <SystemDrawing />
            </div>
          </div>
        </section>
        <RevealSection id="experience" className="section experience-section">
          <SectionLabel number="03">EXPERIENCE & DIRECTION</SectionLabel>
          <div className="section-heading">
            <h2>Experience</h2>
            <p>
              From mobile development to enterprise platforms — a practice
              shaped by hands-on work.
            </p>
          </div>
          <CareerTimeline>
            {experience.map((e, i) => (
              <motion.article
                key={e.company}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.55 }}
              >
                <div className="timeline-date">
                  <span className="timeline-dot" />
                  {e.period}
                  <small>{e.location}</small>
                </div>
                <div className="timeline-body">
                  <span className="eyebrow">{e.role}</span>
                  <h3>
                    {e.company}
                    <sup>0{i + 1}</sup>
                  </h3>
                  <p>{e.description}</p>
                  <details>
                    <summary>
                      What I work on <Plus size={16} />
                    </summary>
                    <ul>
                      {e.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              </motion.article>
            ))}
          </CareerTimeline>
          <div className="credentials">
            <span className="eyebrow">CERTIFIED TO KEEP LEARNING</span>
            <div>
              <span>
                Microsoft Certified: Azure Fundamentals <small>AZ-900</small>
              </span>
              <span>GitHub Copilot Certification</span>
            </div>
          </div>
        </RevealSection>
        <RevealSection className="section recognition-section" id="recognition">
          <SectionLabel number="04">BEYOND THE DAY JOB</SectionLabel>
          <div className="section-heading">
            <h2>Beyond the code</h2>
          </div>
          <div className="recognition-list">
            {recognition.map(([n, title, result, context]) => (
              <motion.div
                className="recognition-row"
                key={n}
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{result}</p>
                <small>{context}</small>
              </motion.div>
            ))}
          </div>
          <div className="beyond-grid">
            <article>
              <span className="eyebrow">RESEARCH / IEEE SSITCON 2024</span>
              <h3>Kissan Konnect</h3>
              <p>
                Kissan Konnect: AI-Powered Plant Disease Control System.
                Research on CNN-based diagnosis, connected to a mobile
                experience for growers.
              </p>
              <a
                className="text-link"
                href="https://doi.org/10.1109/SSITCON62437.2024.10796969"
                {...external}
              >
                Read the publication <ArrowUpRight size={17} />
              </a>
            </article>
            <article>
              <span className="eyebrow">LEADERSHIP / COMMUNITY</span>
              <ul>
                <li>
                  <strong>Vice Chairperson</strong>
                  <span>IEEE PES CUSB · 2024–2025</span>
                </li>
                <li>
                  <strong>Secretary</strong>
                  <span>IEEE Computer Society CUSB · 2023–2024</span>
                </li>
                <li>
                  <strong>Technical Volunteer</strong>
                  <span>GDG Cloud Chandigarh · 2024</span>
                </li>
                <li>
                  <strong>Web Developer & Scholarship Reviewer</strong>
                  <span>IEEE Photonics CUSB / Richard E Merwin · 2023</span>
                </li>
              </ul>
            </article>
          </div>
          <div className="github-compact" id="github">
            <div className="github-intro">
              <Github size={24} />
              <div>
                <h3>More on GitHub</h3>
                <p>Experiments, practice, and public source.</p>
              </div>
              <a className="text-link" href={profile.github} {...external}>
                View profile <ArrowUpRight size={17} />
              </a>
            </div>
            <details className="repo-disclosure">
              <summary>
                Browse {repositories.length} public repositories{" "}
                <Plus size={18} />
              </summary>
              <div className="repo-list">
                {repositories.map((r) => (
                  <a key={r.name} href={r.html_url} {...external}>
                    <Github size={18} />
                    <strong>{r.name}</strong>
                    <span>{r.language || "Repository"}</span>
                    <small>
                      {new Date(r.updated_at).toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}
                    </small>
                    <ArrowUpRight size={18} />
                  </a>
                ))}
              </div>
            </details>
          </div>
        </RevealSection>
        <RevealSection id="contact" className="contact-section">
          <div className="contact-top">
            <span className="eyebrow">05 / GET IN TOUCH</span>
            <span>GOOD THINGS START WITH A HELLO.</span>
          </div>
          <h2>
            <span className="contact-line">Let’s build</span>
            <em className="contact-line">something good.</em>
          </h2>
          <a className="contact-cta" href={`mailto:${profile.email}`}>
            Email me <ArrowUpRight size={22} />
          </a>
          <div className="contact-bottom">
            <div>
              <a className="email-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <button className="copy-email" onClick={copyEmail}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span aria-live="polite">
                  {copied ? "Email copied" : "Copy email"}
                </span>
              </button>
              {copyFailed && (
                <p className="copy-feedback" role="status">
                  Copy unavailable. Select and copy the email address above.
                </p>
              )}
            </div>
            <div className="social-links">
              <a href={profile.github} {...external}>
                GitHub <ArrowUpRight size={17} />
              </a>
              <a href={profile.linkedin} {...external}>
                LinkedIn <ArrowUpRight size={17} />
              </a>
              <a href={profile.resume} download>
                Resume <Download size={17} />
              </a>
            </div>
          </div>
        </RevealSection>
      </main>
      <footer>
        <a className="wordmark" href="#">
          <BrandMark />
          <span className="brand-name">
            Japneet Singh<small>SOFTWARE ENGINEER</small>
          </span>
        </a>
        <span>BUILT WITH INTENTION. ALWAYS IN PROGRESS.</span>
        <a href="#">BACK TO TOP ↑</a>
        <span>© {new Date().getFullYear()} JAPNEET SINGH</span>
      </footer>
      <dialog
        ref={detail}
        className="project-dialog"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (isBackdropClick(e)) setSelected(null);
        }}
        aria-labelledby="detail-title"
      >
        {selected && (
          <>
            <button
              className="dialog-close icon-button"
              onClick={() => setSelected(null)}
              aria-label="Close project details"
            >
              <X />
            </button>
            <div className="dialog-content">
              <span className="eyebrow">
                {selected.type} / {selected.year}
              </span>
              <h2 id="detail-title">{selected.title}</h2>
              <p className="dialog-intro">{caseStudies[selected.id].summary}</p>
              <ProjectVisual project={selected} />
              <div className="case-meta">
                <div>
                  <span>MY ROLE</span>
                  <strong>{caseStudies[selected.id].role}</strong>
                </div>
                <div>
                  <span>BUILT WITH</span>
                  <strong>{selected.stack.join(" · ")}</strong>
                </div>
              </div>
              <div className="case-narrative">
                <section>
                  <h3>The problem</h3>
                  <p>{caseStudies[selected.id].problem}</p>
                </section>
                <section>
                  <h3>My contribution</h3>
                  <p>{caseStudies[selected.id].contribution}</p>
                </section>
                <section>
                  <h3>Engineering decisions</h3>
                  <ul>
                    {selected.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3>What it delivers</h3>
                  <p>{caseStudies[selected.id].outcome}</p>
                </section>
              </div>
              {selected.sourceNote && (
                <p className="source-note">{selected.sourceNote}</p>
              )}
              <div className="dialog-links">
                {selected.live && (
                  <a href={selected.live} {...external}>
                    Visit site <ExternalLink size={16} />
                  </a>
                )}
                {selected.github && (
                  <a href={selected.github} {...external}>
                    {selected.id === "seats"
                      ? "Public storefront"
                      : "View source"}{" "}
                    <Github size={16} />
                  </a>
                )}
                {selected.paper && (
                  <a href={selected.paper} {...external}>
                    Research paper <ArrowUpRight size={16} />
                  </a>
                )}
                {!selected.live && !selected.github && !selected.paper && (
                  <span>
                    Training project · Source code is not publicly listed.
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </dialog>
      <dialog
        ref={palette}
        className="command-dialog"
        onCancel={() => setCommand(false)}
        onClose={() => setCommand(false)}
        onClick={(e) => {
          if (isBackdropClick(e)) setCommand(false);
        }}
        aria-labelledby="command-title"
      >
        <div className="command-header">
          <h2 id="command-title">Where would you like to go?</h2>
          <button
            className="icon-button"
            onClick={() => setCommand(false)}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>
        {[
          ...navigation,
          ["recognition", "Recognition"],
          ["github", "GitHub repositories"],
        ].map(([id, label]) => (
          <button key={id} onClick={() => jump(id)}>
            <ArrowRight size={16} />
            {label}
            <ArrowUpRight size={16} />
          </button>
        ))}
        <a href={profile.resume} {...external}>
          Download / view resume <Download size={16} />
        </a>
        <small>⌘ / Ctrl + K to open · Esc to close</small>
      </dialog>
    </>
  );
}
