/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#1B4D89",
          "primary-content": "#FFFFFF",
          secondary: "#05B074",
          "secondary-content": "#FFFFFF",
          accent: "#FFB649",
          "accent-content": "#1A1A1A",
          neutral: "#2C3E50",
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",
          "base-200": "#F8FAFC",
          "base-300": "#E2E8F0",
          "base-content": "#1A1A1A",
          info: "#2196F3",
          success: "#05B074",
          warning: "#FFB649",
          error: "#DC3545",
          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
    },
  },
};
