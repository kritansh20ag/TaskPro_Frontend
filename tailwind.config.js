/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    maxWidth: {
      980: "980px",
      800: "800px",
      500: "500px",
    },
    minWidth: {
      980: "980px",
      800: "800px",
      600:"600px",
      500: "500px",
    },
    width :{
      980: "980px",
      800: "800px",
      600:"600px",
      250: "250px",
      500: "500px",
      128: "128px",
      50: "50px",
      full:"100%",
    },
    absoluteTop: {
      15: "15px",
    },
  },

  plugins: [],
};
