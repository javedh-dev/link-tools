/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,scss,css}"],
  darkMode: "class", // or 'media'
  theme: {
    extend: {},
  },
  plugins: ["tailwindcss", "autoprefixer"],
};
