// tailwind.config.js
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Cool-tinted dark scale: rich near-black (not navy, not flat #000).
        // 900/950 are page backgrounds; 800/700/600 step up as surfaces/borders.
        gray: {
          50: '#fafafa',
          100: '#f4f5f7',
          200: '#e4e6eb',
          300: '#cfd3db',
          400: '#a0a7b4',
          500: '#727a89',
          600: '#4a5160',
          700: '#2c323e',
          800: '#171b23',
          900: '#0b0d12',
          950: '#060709',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [typography],
  
};