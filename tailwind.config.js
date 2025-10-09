/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#E30613',
          'red-dark': '#B3050F',
          'red-light': '#FF1A28',
          yellow: '#FFD200',
          'yellow-dark': '#E6BC00',
          'yellow-light': '#FFE34D',
          DEFAULT: '#E30613'
        },
        soft: {
          red: '#F2828B',
          'red-light': '#FFB3BA',
          'red-lighter': '#FFE5E7',
          yellow: '#FFE999',
          'yellow-light': '#FFF4CC',
          'yellow-lighter': '#FFFAEB',
          green: '#A8C686'
        },
        basil: {
          green: '#2D5016',
          light: '#6B8E23'
        },
        cream: '#FFF5E6',
        'warm-cream': '#FFF9F0',
        wood: '#8B4513',
        charcoal: '#2C2C2C'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}