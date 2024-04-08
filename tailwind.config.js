/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "grapefruit": {
          "50": 'rgb(253 237 236 / <alpha-value>)',
          "100": 'rgb(252 220 217 / <alpha-value>)',
          "200": 'rgb(249 185 180 / <alpha-value>)',
          "300": 'rgb(245 149 142 / <alpha-value>)',
          "400": 'rgb(242 114 105 / <alpha-value>)',
          "500": 'rgb(239 79 67 / <alpha-value>)',
          "600": 'rgb(215 71 60 / <alpha-value>)',
          "700": 'rgb(191 63 54 / <alpha-value>)',
          "800": 'rgb(167 55 47 / <alpha-value>)',
          "900": 'rgb(143 47 40 / <alpha-value>)',
          "950": 'rgb(72 24 20 / <alpha-value>)',
        }
      }
    },
    fontFamily: {
      Pretendard: ["Pretendard", 'sans-serif']
    }
  },
  plugins: [
    function({ addUtilities }) {
      const newUtils = {
        '.number-appearance-none': {
          '-moz-appearance': 'textfield',
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            'margin': '0',
          },
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            'margin': '0',
          },
        },
        '.color-appearance-none': {
          'appearance': 'none',
          '-webkit-appearance': 'none',
          '-moz-appearance': 'none',
          "background-color": 'transparent'
        }
      };

      addUtilities(newUtils, ['responsive']);
    },
  ],
}