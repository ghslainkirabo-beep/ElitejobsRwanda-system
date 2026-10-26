/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#714b67',
          dark: '#1b1e24',
          lightBg: '#f4f6f9',
          card: '#ffffff'
        }
      }
    },
  },
  plugins: [],
}
