/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx, html}'],
  plugins: [require("daisyui")],
  daisyui: {
        themes: [
          {'light': {
            "primary": "#EEEEEE",
            "primary-focus": "#EEEEEE",
            "primary-content": "#ffffff",
            "secondary": "#EEEEEE",
            "secondary-focus": "#EEEEEE",
            "secondary-content": "#ffffff",
            "accent": "#EEEEEE",
            "accent-focus": "#EEEEEE",
            "accent-content": "#ffffff",
            "neutral": "#EEEEEE",
            "neutral-focus": "#EEEEEE",
            "neutral-content": "#ffffff",
            "base-100": "#E8E8E8",
            "base-200": "#EEEEEE",
            "base-300": "#EEEEEE",
            "base-content": "#EEEEEE",
            "info": "#EEEEEE",
            "success": "#87d039",
            "warning": "#e2d562",
            "error": "#ff6f6f"
          }},
          {'dark': {
            "primary": "#4b4b4c",
            "primary-focus": "#429be5",
            "primary-content": "#ffffff",
            "secondary": "#f000b8",
            "secondary-focus": "#bd0091",
            "secondary-content": "#ffffff",
            "accent": "#37cdbe",
            "accent-focus": "#2aa79b",
            "accent-content": "#ffffff",
            "neutral": "#4e4c4e",
            "neutral-focus": "#303030",
            "neutral-content": "#ffffff",
            "base-100": "#262627",
            "base-200": "#303030",
            "base-300": "#16181d",
            "base-content": "#ebecf0",
            "info": "#66c6ff",
            "success": "#87d039",
            "warning": "#e2d562",
            "error": "#ff6f6f"
          }}
        ],
        darkTheme: "dark",
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}


