/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  mode: "jit",
  darkMode: "class", // or 'media' or 'class'
  // purge: [
  //   "./src/app/**/*.{js,ts,jsx,tsx}",
  //   "./src/components/**/*.{js,ts,jsx,tsx}"
  // ],
  theme: {
    extend: {
      fontFamily: {
        kode: ["var(--font-kode)"]
      }
    }
  },
  plugins: []
}
