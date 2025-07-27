/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '75': '300px',
      },
      margin: {
        '38': '152px',
      },
    },
  },
  plugins: [],
}