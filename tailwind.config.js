/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: "#000000",
      fontFamily: {
        GBold: "Glacial_Indifference_Bold",
        GRegular: "Glacial_Indifference_Regular",
      },
      colors: {
        primary: {
          main: "#00B649",
        },
        white: "#FFF",
        grey: {
          grey1: "#949596",
        },
        dark: {
          main: "#1A1A1A",
        },
      },
      width: (() => {
        const widths = {};
        for (let i = 1; i <= 100; i++) {
          widths[`[${i}%]`] = `${i}%`; // Generates classes from w-1 to w-100 (as 1% to 100%)
        }
        return widths;
      })(),
    },
  },
  plugins: [],
};
