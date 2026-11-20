/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#070910",
          secondary: "#0D111B",
          surface: "rgba(18, 24, 39, 0.75)",
          card: "#121827",
          elevated: "#171E2C",
        },
        brand: {
          blue: "#3478F6",
          violet: "#8055F5",
          cyan: "#22D3EE",
          text: "#F8FAFC",
          muted: "#A1AAB8",
          border: "rgba(255, 255, 255, 0.08)",
        },
        devaccent: {
          blue: "#3478F6",
          violet: "#8055F5",
          cyan: "#22D3EE",
          gold: "#C9A44C",
          silver: "#AEB7C2",
          bronze: "#B8794B",
        },
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '"Geist"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          "system-ui",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          '"Fira Code"',
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(52, 120, 246, 0.35)",
        "glow-violet": "0 0 40px -10px rgba(128, 85, 245, 0.35)",
        "glow-cyan": "0 0 35px -8px rgba(34, 211, 238, 0.35)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        "card-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px -10px rgba(52, 120, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        glass: "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
