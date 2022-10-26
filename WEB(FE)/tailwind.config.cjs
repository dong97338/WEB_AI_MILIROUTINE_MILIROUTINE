/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      orange: '#F07644',
      red: '#F23D3D',
      yellow: '#F5B954',
      black: '#262626',
      white: {
        100: '#F5F5F5',
        200: '#F2F2F2',
      },
      gray: {
        300: '#D9D9D9',
        400: '#AAAAAA',
        500: '#777777',
      },
      blue: '#0066FF',
      green: '#5EC14E',
      beige: '#FAF7F2',
    },
    extend: {
      width: {
        420: '420px',
      },
      padding: {
        515: '515px',
      },
    },
  },
  plugins: [],
};
