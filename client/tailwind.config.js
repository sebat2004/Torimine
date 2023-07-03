/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx, html}'],
  plugins: [require("daisyui")],
  daisyui: {
        themes: [
          {'dark': {
            "primary": "#2163B8",
            "primary-focus": "#317CDB",
            "primary-content": "#ffffff",
            "secondary": "#E9860E",
            "secondary-focus": "#B86B0B",
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


