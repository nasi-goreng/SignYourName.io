/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,ts,js,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        'custom-purple': '#8953CD',
      },
    },
  },
  plugins: [],
}

