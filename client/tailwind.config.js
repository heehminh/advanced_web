const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      minWidth: px0_1000,
      minHeight: px0_1000,
      maxWidth: px0_1000,
      maxHeight: px0_1000,
      width: px0_1000,
      height: px0_1000,
      borderRadius: px0_1000,
      fontSize: px0_1000,
      lineHeight: px0_1000,
      padding: px0_1000,
      margin: px0_1000,
      colors: {
        "gray-700": "#333333",
        "gray-600": "#666666",
        "gray-500": "#999999",
        "gray-400": "#CCCCCC",
        "gray-300": "#DDDDDD",
        "gray-200": "#EEEEEE",
        "gray-100": "#F8F8FA",
      },
    },
  },
  plugins: [],
};