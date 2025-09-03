/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0c9488",
        "primary-dark": "#0d766e",
        secondary: "#f3f4f6",
        cardBorder: "#e5e7eb",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        lg: "0.75rem",
      },
    },
  },
  plugins: [],
}

