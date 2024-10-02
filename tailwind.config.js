/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        customColor1 : '#FFA500',
        customColor2 : '#FF9900',
        customColor3 : '#FEA948',
        customColor4 : '#F2AC29'
      }
    },
  },
  plugins: [],
}

