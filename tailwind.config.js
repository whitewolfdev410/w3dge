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
    },
  },
  plugins: [],
};
