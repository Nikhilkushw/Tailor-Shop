/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // 👈 ab aap font-poppins use kar sakte ho
      },
    },
  },
  plugins: [],
};
