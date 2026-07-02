/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#050B14', // very dark blue/black
          800: '#0B1423', // slightly lighter
          700: '#14233A', // lighter again
        },
        primary: {
          500: '#3B82F6', // modern blue
          400: '#60A5FA', 
        },
        accent: {
          purple: '#8B5CF6',
          green: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
