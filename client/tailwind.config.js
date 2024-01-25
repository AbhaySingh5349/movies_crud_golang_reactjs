/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#68cade',
          300: '#1d9cb5',
          500: '#2f8aa1',
          error: '#fa5c5c',
        },
      },
    },
  },
  plugins: [],
};
