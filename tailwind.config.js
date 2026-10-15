/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#FFF1F4',
        rose: {
          50: '#fff1f4', 100: '#ffe0e8', 200: '#ffc2d2', 300: '#ff94b2',
          400: '#f95f8e', 500: '#e8336f', 600: '#c8205a',
        },
        ink: '#1a1216',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 28s linear infinite' },
    },
  },
  plugins: [],
}
