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
          1: "#2B2D3C",
          2: "#A8AAB4",
          3: "#EAEBEF",
        },
        pink: "rgba(183, 80, 160)",
        teal: "rgba(61, 180, 195)",
      },
      spacing: {
        15: "15px",
        40: "40px",
        80: "80px",
        "35vh": "35vh",
        "15vw": "15vw",
        500: "500px",
        400: "400px",
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

// font-normal	font-weight: 400;
// font-medium	font-weight: 500;
// font-semibold	font-weight: 600;
// font-bold	font-weight: 700;

// text-sm	font-size: 0.875rem; /* 14px */
// line-height: 1.25rem; /* 20px */

// text-lg	font-size: 1.125rem; /* 18px */
// line-height: 1.75rem; /* 28px */

// text-xl	font-size: 1.25rem; /* 20px */
// line-height: 1.75rem; /* 28px */

// text-2xl	font-size: 1.5rem; /* 24px */
// line-height: 2rem; /* 32px */

// text-3xl	font-size: 1.875rem; /* 30px */
// line-height: 2.25rem; /* 36px */

// <div class="bg-gradient-to-r from-pink-400 via-teal-400 to-transparent"></div>
