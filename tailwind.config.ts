import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest:   "#2D6A2D",
        growth:   "#3E8B3E",
        mist:     "#EAF3DE",
        carbon:   "#1A1A1A",
        eggshell: "#F8F6F1",
        graphite: "#4A4A4A",
        slate:    "#4A5059",
        smoke:    "#E8E9EB",
        iron:     "#23272E",
        cream:    "#F0EDE6",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        "dm-serif": ["var(--font-dm-serif)", "serif"],
      },
      spacing: {
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "25": "6.25rem",
        "30": "7.5rem",
        "35": "8.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
