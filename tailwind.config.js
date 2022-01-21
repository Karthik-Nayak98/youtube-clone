module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        pdark: "#181818",
        sdark: "#212121",
        tdark: "#3d3d3d",
        light: "#aaaaaa",
        yred: "#FF0000",
        yblue: "#357dbb",
      },
      fontSize: {
        xxs: "0.65rem",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
