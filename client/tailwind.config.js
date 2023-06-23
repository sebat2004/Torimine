/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js, jsx}",
    "./components/*.{js, jsx}",
    "./routes/*.{js, jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

