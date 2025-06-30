/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        // Dark theme colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#66FCF1', // Bright Cyan
          600: '#45A29E', // Teal
          700: '#0891b2',
          800: '#0e7490',
          900: '#164e63',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#C5C6C7', // Light Gray
          600: '#64748b',
          700: '#475569',
          800: '#334155',
          900: '#1e293b',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#45A29E', // Teal
          600: '#66FCF1', // Bright Cyan
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#1F2833', // Dark Blue Gray
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0B0C10', // Very Dark
        },
        // Light theme colors
        light: {
          50: '#CDCBD6',
          100: '#1D96846',
          200: '#596235',
          300: '#2F3020',
          400: '#000000',
          500: '#ffffff',
          600: '#f5f5f5',
          700: '#e5e5e5',
          800: '#d4d4d4',
          900: '#a3a3a3',
        },
        // Logo/icon container color
        logo: {
          500: '#EFBC75',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'marble': 'marble 20s ease-in-out infinite',
        'aurora': 'aurora 15s ease infinite',
        'sparkle': 'sparkle 3s ease-in-out infinite',
        'fireworks': 'fireworks 1s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(102, 252, 241, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(69, 162, 158, 0.8)' },
        },
        marble: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        fireworks: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'scale(1) rotate(180deg)', opacity: 0 },
        },
      },
      backgroundImage: {
        'aurora': 'linear-gradient(45deg, #66FCF1 0%, #45A29E 25%, #C5C6C7 50%, #1F2833 75%, #0B0C10 100%)',
        'marble': 'radial-gradient(circle at 20% 50%, #66FCF1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #45A29E 0%, transparent 50%), radial-gradient(circle at 40% 80%, #C5C6C7 0%, transparent 50%)',
        'game-gradient': 'linear-gradient(135deg, #66FCF1 0%, #45A29E 100%)',
        'chat-gradient': 'linear-gradient(135deg, #45A29E 0%, #66FCF1 100%)',
        'play-gradient': 'linear-gradient(135deg, #66FCF1 0%, #C5C6C7 100%)',
        'create-gradient': 'linear-gradient(135deg, #C5C6C7 0%, #66FCF1 100%)',
        'multiverse': 'radial-gradient(circle at 20% 50%, #66FCF1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #45A29E 0%, transparent 50%), radial-gradient(circle at 40% 80%, #C5C6C7 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};