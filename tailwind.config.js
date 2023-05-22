/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#303549",
          2: "#2B2D3C",
        },
        secondary: {
          1: "#62677B",
          2: "#A8AAB4",
          3: "#EAEBEF",
        },
        pink: "rgba(183, 80, 160)",
        teal: "rgba(61, 180, 195)",
      },
      fontSize: {
        14: "14px",
        16: "16px",
        20: "20px",
        24: "24px",
        28: "28px",
        30: "30px",
      },
      fontWeight: {
        400: "400",
        500: "500",
        600: "600",
        700: "700",
      },
      boxShadow: {
        custom: "2px 4px 10px 1px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};

