/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        green: {
          50: '#C3E4D3',
          100: '#D4EBE3',
          200: '#C2E6E6',
          300: '#D4E3DE',
          400: '#C3D6DA',
          500: '#39B55F',
          600: '#56BE8D',
          700: '#00A49B',
          800: '#4D8E7A',
          900: '#02505C',
        },
        green2: {
          50: '#87AAAE',
          100: '#8ACCA6',
          200: '#ABDBC5',
          300: '#88D0CC',
          400: '#A7C6BE',
          500: '#5FC287',
          600: '#88CBAC',
          700: '#4EC1B8',
          800: '#83B1A4',
          900: '#54858A',
        },
      },
      fontFamily: {
        lato: ['Lato', 'sans'],
      },
      borderRadius: {
        'px': '1px',
        '2px': '2px',
        '4px': '4px',
        '8px': '8px',
        '12px': '12px',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      textColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      borderColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      borderWidth: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    },
  },
  plugins: [],
};


