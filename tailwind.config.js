/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./admin.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7f4',
          100: '#dcece5',
          200: '#bdd9cd',
          300: '#92bdab',
          400: '#649b84',
          500: '#125133', // Verde Principal
          600: '#0e422a',
          700: '#0b3422',
          800: '#08271a',
          900: '#051b12',
        },
        cta: {
          400: '#fb9f4b',
          500: '#F18825', // Laranja CTA
          600: '#d16e11',
          DEFAULT: '#F18825',
          hover: '#d16e11',
          light: '#fb9f4b'
        },
        dark: {
          900: '#0A0F0D',
          800: '#141D19',
          700: '#1E2B25'
        }
      },
    },
  },
  plugins: [],
}
