/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.{html,js,pug}"],
  theme: {
    extend: {
      colors: {
        'c-purple': '#edd5f0',
        'c-grey-dark': '#f2f2f2',
        'c-grey-light': '#f4f4f4',
        'c-text-med': '#1d1d1d',
        'c-text-dark': '#232323',
        'c-text-light': '#6c6b6c',
        'c-border-color': '#eeefee',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'], // Default font for sans-serif
      },
    },
  },
  plugins: [],
}

