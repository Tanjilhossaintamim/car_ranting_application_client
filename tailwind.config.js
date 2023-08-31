/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-green": "#00A966",
        "color-green-dark": "#00AB5D",
        "color-gray": "#B0B1B5",
        "color-gray-dark": "#817F91"
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        md: '50px'

      }
    }
  },
  plugins: [require("daisyui")],
}

