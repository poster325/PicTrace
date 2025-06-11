/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        'accent-home': '#EC87C0',
        'accent-study': '#58B1F5',
        'accent-reports': '#F5624D',
        'accent-participants': '#A6D785',
        'accent-settings': '#FFCA3A',
        'accent-analysis': '#B490E3',
      },
    },
  },
  plugins: [],
} 