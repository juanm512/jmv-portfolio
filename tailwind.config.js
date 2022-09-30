/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  darkMode: "class", // or 'media' or 'class'
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        palette: {
          500: '#630606',
          400: '#890F0D',
          300: '#E83A14',
          200: '#D9CE3F',
          100: '#ffffff'
        }
      },
      animation: {
        fadeIn: "fadeIn 1s  0.2s ease-in forwards 1",
        Entering: "Entering 1s 0.1s ease-in forwards 1",
        Leaving: "Leaving 1s 0.1s ease-out forwards 1",
        EnteringBG: "EnteringBG 1s 0.1s ease-in forwards 1",
        LeavingBG: "LeavingBG 1s 0.1s ease-out forwards 1",
        CardZoom: "CardZoom 0.3s 0.2s ease-out forwards 1",
        CardZoomOut: "CardZoomOut 0.5s 0s ease-out forwards 1",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        Entering: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        Leaving: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(10px)" }
        },
        EnteringBG: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 0.25, transform: "translateY(0)" }
        },
        LeavingBG: {
          "0%": { opacity: 0.25, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(10px)" }
        },
        CardZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.3)", opacity: 0, zIndex: -1 }
        },
        CardZoomOut: {
          "0%": { transform: "scale(1.3)", opacity: 0, zIndex: -1 },
          "100%": { transform: "scale(1)", opacity: 0.5, zIndex: 1 }
        },
      },
      variants: {
        animation: ["motion-safe"]
      }
    },
  },
  plugins: [],
}
