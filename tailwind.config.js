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
        // PRIMARY COLORS - Based on logo's most prominent colors
        primary: {
          red: '#C41E1A',        // Logo's main burgundy red (dominant)
          'red-dark': '#8B1A1D', // Logo's darker border red
          'red-light': '#D63933', // Lighter variation for hover states
          yellow: '#E6D5B3',     // Logo's cream/beige banner (dominant)
          'yellow-dark': '#D4C4A0', // Darker cream for depth
          'yellow-light': '#F4E4C1', // Lighter cream for highlights
          DEFAULT: '#C41E1A'
        },
        // SECONDARY COLORS - Logo's accent colors
        accent: {
          gold: '#D4AF37',       // Logo's metallic gold trim (medium prominence)
          'gold-dark': '#B8941F',
          'gold-light': '#E6C44D',
          green: '#009246',      // Italian flag green (accent)
          'green-light': '#00A651'
        },
        // SOFT VARIATIONS - For backgrounds and subtle elements
        soft: {
          red: '#E8857A',        // Softer version of burgundy
          'red-light': '#F5ABA3',
          'red-lighter': '#FDE9E7',
          yellow: '#F9F3E6',     // Very soft cream
          'yellow-light': '#FDF9F0',
          'yellow-lighter': '#FEFCF8',
          green: '#A8C686'       // Soft green for vegetarian
        },
        // SUPPORTING COLORS
        basil: {
          green: '#2D5016',
          light: '#6B8E23'
        },
        cream: '#F4E4C1',        // Updated to match logo cream
        'warm-cream': '#FDF9F0', // Lighter cream for backgrounds
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