module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/*.{js,ts,jsx,tsx}",
    "./src/Components/Elements/**/*.{js,ts,jsx,tsx}",
    "./src/**/*",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
