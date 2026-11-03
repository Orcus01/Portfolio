import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import avatar from "./assets/japneet-balanced-avatar.png";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";
import "./design.css";
import "./responsive.css";
import "./motion.css";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

async function startPortfolio() {
  const image = new Image();
  image.src = avatar;
  const portraitReady = image.decode().catch(() => {});
  // A short introduction, capped so slow assets never block the portfolio.
  await Promise.race([
    Promise.all([portraitReady, document.fonts.ready, new Promise(resolve => setTimeout(resolve, 900))]),
    new Promise(resolve => setTimeout(resolve, 3000)),
  ]);
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ErrorBoundary><App /></ErrorBoundary>
    </React.StrictMode>,
  );
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const loader = document.getElementById("site-loader");
  document.documentElement.classList.remove("site-booting");
  if (loader && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    await loader.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, easing: "ease-out", fill: "forwards" }).finished.catch(() => {});
  }
  loader?.remove();
}
startPortfolio();
