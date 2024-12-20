/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      "0": "0",
      "0.5": ".5px",
      "2": "2px",
      "4": "4px"
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require("tw-elements/plugin.cjs"),
    require('@tailwindcss/typography'),
  ],
};
