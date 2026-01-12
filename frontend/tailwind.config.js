/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neon: "#7C7CFF",
        glass: "rgba(255,255,255,0.08)"
      }
    }
  },
  plugins: []
};
