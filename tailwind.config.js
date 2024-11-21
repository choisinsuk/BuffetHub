/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customColor1: '#FF7E5F', // HEATWAVE
        customColor2: '#FEB47B', // LIQUID SUNSET
        customColor3: '#F7D6BC',
        customColor4: '#F5AB99', // TROPICAL PINK
        customColor5: '#FFE7D7', // 텍스트 박스 타입에 쓰임
        fontColor: '#181B46' // INDIGO
      },
    },
  },
  plugins: [],
}
