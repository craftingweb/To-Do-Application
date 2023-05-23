/** @type {import('tailwindcss').Config} */
module.exports = {
  type: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          xs: "525px",
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
        padding: {
          xs: "2.5rem",
          sm: "2rem",
          md: "1.75rem",
          lg: "1.5rem",
          xl: "1.25rem",
          "2xl": "1rem",
        },
      },
      borderRadius: {
        sm: "5px",
        md: "8px",
        lg: "12px",
        xl: "15px",
      },
    },
    colors: {
      primary: "#647dff",
      secondary: "#242631",
      tertiary: "#323644",
      font: "#7d8194",
      heading: "#f1f1f1",
    },
  },
  plugins: [],
};
