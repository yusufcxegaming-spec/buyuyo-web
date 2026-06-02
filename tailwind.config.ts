import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          light: '#818CF8',
          dark: '#3730A3',
          50: '#EEF2FF',
          100: '#E0E7FF',
        },
        dark: {
          DEFAULT: '#1E1B4B',
          mid: '#312E81',
        },
        surface: '#F8F7FF',
        'surface-alt': '#EEF2FF',
        buyuyo: {
          yellow: '#FEF3C7',
          yellow_accent: '#F59E0B',
          purple: '#EDE9FE',
          pink: '#FCE7F3',
          pink_accent: '#EC4899',
          green: '#D1FAE5',
          green_accent: '#10B981',
          sky: '#38BDF8',
          peach: '#FB923C',
          mint: '#34D399',
        },
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(79, 70, 229, 0.08)',
        glow: '0 8px 32px rgba(79, 70, 229, 0.25)',
        'glow-pink': '0 8px 32px rgba(236, 72, 153, 0.25)',
        'glow-green': '0 8px 32px rgba(16, 185, 129, 0.2)',
        card: '0 2px 12px rgba(30, 27, 75, 0.06)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #4F46E5 0%, #312E81 50%, #1E1B4B 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(238,242,255,0.6) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
