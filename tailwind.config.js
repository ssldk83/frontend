/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0 0% 100%)",
        card: "hsl(0 0% 100%)",
        primary: { DEFAULT: "hsl(222.2 47.4% 11.2%)" },
        muted: { DEFAULT: "hsl(210 40% 96%)" }
      }
    },
  },
  plugins: [],
}
