/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a', // Deep, brutalist black
        foreground: '#f5f5f5', // Crisp off-white for text
      }
    },
  },
  plugins: [],
}