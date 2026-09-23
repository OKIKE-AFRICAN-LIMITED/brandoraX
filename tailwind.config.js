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
          navy: '#000F38',
          'navy-dark': '#00081E',
          'navy-light': '#0A1B4B',
          blue: '#0040E9',
          'blue-hover': '#0035C2',
          'blue-light': '#EEF2FF',
          'blue-surface': '#F4F7FF',
          amber: '#FEC958',
          'amber-hover': '#E5B147',
          gray: {
            50: '#F8FAFC',
            100: '#EEF2F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Lexend Deca', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Lexend Deca', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['Plus Jakarta Sans', 'Lexend Deca', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 20px 40px -15px rgba(0, 15, 56, 0.08)',
        'brand-lg': '0 30px 60px -20px rgba(0, 64, 233, 0.15)',
        'glow': '0 0 25px rgba(0, 64, 233, 0.35)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
