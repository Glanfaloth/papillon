//tailwind.config.js
module.exports = {
  purge: [], //remove this line
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx", "./public/**/*.html"], //add this line
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        rotate0: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '33%, 100%': {
            transform: 'rotate(360deg)',
          },
        },
        rotate1: {
          '0%, 33%': {
            transform: 'rotate(0deg)',
          },
          '67%, 100%': {
            transform: 'rotate(360deg)',
          },
        },
        rotate2: {
          '0%, 67%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          }
        }
      },
      animation: {
        rotate0: 'rotate0 3s infinite',
        rotate1: 'rotate1 3s infinite',
        rotate2: 'rotate2 3s infinite',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
