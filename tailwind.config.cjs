/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        "ui-primary": { DEFAULT: "hsl(var(--ui-primary))", foreground: "hsl(var(--ui-primary-foreground))" },
        "ui-secondary": { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--foreground))" },
        destructive: { DEFAULT: "hsl(0 72% 51%)", foreground: "hsl(0 0% 100%)" },
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [require("tailwindcss-animate")],
};