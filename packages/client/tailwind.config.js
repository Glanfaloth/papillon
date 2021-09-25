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
          },
        },
        weakPing: {
          '75%, 100%': {
            transform: 'scale(1.5)',
            opacity: '0',
          },
        },
        weakerPing: {
          '75%, 100%': {
            transform: 'scaleX(1.03125) scaleY(1.125)',
            opacity: '0',
          },
        },
        diminishX: {
          '0%': {
            width: '1'
          },
          '100%': {
            width: '0'
          },
        },
      },
      animation: {
        rotate0: 'rotate0 2.5s infinite',
        rotate1: 'rotate1 2.5s infinite',
        rotate2: 'rotate2 2.5s infinite',
        weakPing: 'weakPing 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        weakerPing: 'weakerPing 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        diminishX: 'diminishX 15s cubic-bezier(0, 0, 1, 1)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
