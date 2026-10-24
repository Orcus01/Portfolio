import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio render failed", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="error-fallback">
        <h1>Something didn’t load correctly.</h1>
        <p>Reload the portfolio, or contact me directly.</p>
        <button onClick={() => window.location.reload()}>
          Reload portfolio
        </button>
        <a href="mailto:japneet.singh2024@gmail.com">Email Japneet</a>
      </main>
    );
  }
}
