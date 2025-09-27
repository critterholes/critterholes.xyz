/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        'fredoka': ['"Fredoka One"', 'cursive'],
      },
      keyframes: {
        popup: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        'popup': 'popup 0.3s ease-out',
      }
    },
  },
  plugins: [],
}