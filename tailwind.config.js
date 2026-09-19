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
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'brand': '0 20px 40px -15px rgba(0, 15, 56, 0.08)',
        'brand-lg': '0 30px 60px -20px rgba(0, 64, 233, 0.15)',
        'glow': '0 0 25px rgba(0, 64, 233, 0.35)',
      }
    },
  },
  plugins: [],
}
