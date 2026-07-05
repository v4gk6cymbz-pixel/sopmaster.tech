/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyan: { 400: "#00FFFF", 500: "#00FFFF", 600: "#00CCCC" },
      },
      borderRadius: { DEFAULT: "2px" },
      fontFamily: { mono: ['JetBrains Mono', 'monospace'] },
    },
  },
  plugins: [],
}
