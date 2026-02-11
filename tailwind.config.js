/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        kode: ["var(--font-kode)"],
        sans: ["var(--font-geist)", "system-ui", "sans-serif"]
      },
      colors: {
        green: {
          primary: "#0F3D2E",
          accent: "#1B5E3C",
          light: "#2E7D57",
          glow: "#00FF9C"
        },
        background: {
          dark: "#050B08",
          darker: "#020504"
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-center":
          "radial-gradient(ellipse at center, rgba(0, 255, 156, 0.15) 0%, transparent 70%)"
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "float": "float 6s ease-in-out infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" }
        }
      }
    }
  },
  plugins: []
}
