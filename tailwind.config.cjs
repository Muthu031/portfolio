// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0d1117",
        surface: "#161b22",
        surfaceAlt: "#1c2128",
        surfaceHighlight: "#21262d",
        text: "#e6edf3",
        textSecondary: "#8b949e",
        border: "#30363d",
        borderHighlight: "#484f58",
        accent: {
          teal: "#00d4aa",
          orange: "#f0883e",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "ui-sans-serif", "system-ui"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular"],
        display: ["'Rajdhani'", "ui-sans-serif", "system-ui"],
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        40: "10rem",
        48: "12rem",
        56: "14rem",
        64: "16rem",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        "cut": "0.25rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0, 212, 170, 0)" },
          "50%": { boxShadow: "0 0 12px 2px rgba(0, 212, 170, 0.25)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(1.08)" },
          "70%": { transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "toast-enter": {
          "0%": { opacity: "0", transform: "translateY(12px) scale(1.05)" },
          "60%": { transform: "translateY(-2px) scale(0.99)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "press": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.96)" },
          "100%": { transform: "scale(1)" },
        },
        "flash": {
          "0%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.25)" },
          "100%": { filter: "brightness(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-in": "slide-in 0.4s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pop-in": "pop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "toast-enter": "toast-enter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "press": "press 0.15s ease-out",
        "flash": "flash 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
