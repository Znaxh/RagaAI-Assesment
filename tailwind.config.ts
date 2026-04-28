import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#0A0A0A",
        card: "#141414",
        surface: "#1A1A1A",
        border: {
          DEFAULT: "#2A2A2A",
          hover: "#3A3A3A",
          accent: "#3B6FD4",
        },
        accent: {
          blue: "#3B6FD4",
          amber: "#E8B84B",
          "amber-dark": "#C49A2A",
        },
        status: {
          active: "#22C55E",
          critical: "#EF4444",
          pending: "#E8B84B",
          discharged: "#6B7280",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "IBM Plex Mono", "Courier New", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        label: ["11px", { letterSpacing: "0.1em", textTransform: "uppercase" }],
        sublabel: ["10px", { letterSpacing: "0.15em", textTransform: "uppercase" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
