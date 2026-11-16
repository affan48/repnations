/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#121212',
          darkCard: '#1A1A1A',
          graphite: '#242424',
          gray: '#737373',
          lightgray: '#F5F5F3',
          border: '#E5E5E5',
          red: '#E53235',
          redHover: '#cc2225',
          pureWhite: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Barlow Condensed"', 'sans-serif'],
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '16/7': '16 / 7',
        '21/9': '21 / 9',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out forwards',
        slideInRight: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideInLeft: 'slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideUp: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        marquee: 'marquee 25s linear infinite',
        pulseSubtle: 'pulseSubtle 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
