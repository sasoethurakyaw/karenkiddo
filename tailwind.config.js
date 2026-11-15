/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kiddo: {
          orange: '#FF8A00',
          yellow: '#FFD200',
          blue: '#1E88E5',
          sky: '#38BDF8',
          green: '#4CAF50',
          mint: '#2DD4BF',
          pink: '#EC4899',
          purple: '#8B5CF6',
          coral: '#FF6B6B',
          cream: '#FFF9E6',
        }
      },
      fontFamily: {
        kid: ['"Fredoka"', '"Comic Sans MS"', '"Pyidaungsu"', '"Padauk"', 'sans-serif'],
        myanmar: ['"Pyidaungsu"', '"Padauk"', '"Noto Sans Myanmar"', 'sans-serif'],
      },
      boxShadow: {
        'play-orange': '0 6px 0 #D97706',
        'play-blue': '0 6px 0 #1D4ED8',
        'play-green': '0 6px 0 #15803D',
        'play-pink': '0 6px 0 #BE185D',
        'play-purple': '0 6px 0 #6D28D9',
        'play-yellow': '0 6px 0 #B45309',
        'chunky': '0 8px 24px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'pop': 'pop 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 138, 0, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 138, 0, 0.8)' },
        },
      }
    },
  },
  plugins: [],
}
