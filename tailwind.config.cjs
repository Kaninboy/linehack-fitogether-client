/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        blueDark: "#0F044C",
        blueLight: "#37C9EF",
        greyMain: "#A6A6A6",
        greyLight: "#F4F4F4",
        muiBlue: "#1976d2",
        lineGreen: "#06C755"
      },
      fontFamily: {
        line : ["LINE", "Roboto", "Helvetica", "Arial", "sans-serif"]
      }
    },
  },
  plugins: [],
};
