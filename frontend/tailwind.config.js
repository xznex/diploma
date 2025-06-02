/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'stepik-blue': '#0052CC',
        'stepik-gray': '#F7F8FA',
        'stepik-green': '#28A745',
      },
    },
  },
  plugins: [],
};