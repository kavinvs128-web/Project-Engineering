/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        matrix: {
          green: '#00ff41',
          bg: '#0d0208',
          dark: '#003b00'
        }
      }
    },
  },
  plugins: [],
}
