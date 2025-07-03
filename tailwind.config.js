/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode based on a class applied to the HTML tag
  darkMode: 'class',

  // Specify the files where Tailwind should look for classes
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Define and extend the default theme
  theme: {
    extend: {
      // Custom color palette
      colors: {
        // Dark mode colors
        'dark-bg': '#1a202c', // A deep, dark blue-gray for backgrounds
        'dark-surface': '#2d3748', // A slightly lighter surface color
        'dark-text': '#e2e8f0', // A soft white for text
        'dark-accent': '#38b2ac', // A vibrant teal for accents
        'dark-accent-hover': '#319795', // A darker teal for hover states

        // Light mode colors
        'light-bg': '#f7fafc', // A very light gray for backgrounds
        'light-surface': '#ffffff', // Pure white for surfaces like cards
        'light-text': '#1a202c', // The dark background color now used for text
        'light-accent': '#2b6cb0', // A professional blue for accents
        'light-accent-hover': '#2c5282', // A darker blue for hover states
      },
      // Custom font families
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Custom animations and keyframes
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },

  // Add any Tailwind plugins here
  plugins: [],
};
