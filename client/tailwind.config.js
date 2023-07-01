/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require("daisyui")],
  daisyui: {
        themes: [
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
          }},
          'light',
        ]
    },
}


