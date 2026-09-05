import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#08060c",
          dark: "#0b0914",
          surface: "#110e1c",
          card: "#151224",
          border: "rgba(168, 85, 247, 0.18)",
          glow: "#a855f7",
          neon: "#c084fc",
          indigo: "#7c3aed"
        },
        primary: "#ddb7ff",
        secondary: "#fbabff",
        tertiary: "#4cd7f6"
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      }
    }
  },
  plugins: [
    forms,
    containerQueries
  ]
};
