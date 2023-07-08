/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx, html}'],
  plugins: [require("daisyui")],
  daisyui: {
        themes: [
          {
            light: {
              "primary": "#f6f5f3",
              "secondary": "#f6d860",
              "accent": "#37cdbe",
              "neutral": "#787d9b",
              "base-100": "#e0e1e0",
            },
          }
        ],
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}


