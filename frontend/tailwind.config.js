/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5B4E80",
          bright: "#6E56CF",
          hover: "#4C4070",
          accent: "#9333EA",
          container: "#F0EBFA",
          light: "#F4F0FA",
        },
        dark: {
          sidebar: "#0F172A",
          surface: "#0F172A",
          card: "#1E293B",
          border: "#E5E7EB",
        },
        canvas: {
          DEFAULT: "#F9FAFC",
          light: "#FFFFFF",
          card: "#FFFFFF",
          subtle: "#F3F4F6",
        },
        indigo: {
          600: "#5B4E80",
          700: "#4C4070",
          50: "#F0EBFA",
          100: "#EAE5F5",
        }
      },
      fontFamily: {
        sans: ["Chillax", "Inter", "sans-serif"],
        display: ["Chillax", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.06)',
        'modal': '0 20px 40px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
