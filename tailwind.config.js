/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B2A41',
          light: '#2F3E55',
          dark: '#121D2E',
        },
        interactive: {
          DEFAULT: '#9B6B9E',
          light: '#B388B6',
          dark: '#7D5680',
        },
        highlight: {
          DEFAULT: '#E9D2F4',
          light: '#F4E9F9',
          dark: '#D8B8E7',
        },
        accent: {
          DEFAULT: '#FFA07A',
          light: '#FFB899',
          dark: '#FF8C61',
        },
        text: {
          DEFAULT: '#F8F9FA',
          secondary: '#CCD0D5',
          muted: '#A0A7AF',
        },
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        background: {
          DEFAULT: '#121820',
          lighter: '#1E2630',
          card: '#242F3F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Quicksand', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-purple': '0 0 15px rgba(155, 107, 158, 0.5)',
        'glow-accent': '0 0 15px rgba(255, 160, 122, 0.5)',
      },
    },
  },
  plugins: [],
};