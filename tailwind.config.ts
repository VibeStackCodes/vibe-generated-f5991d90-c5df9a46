import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#c7e0fd',
          300: '#a4c9fc',
          400: '#7aacf8',
          500: '#5a8ef5',
          600: '#3d6fe8',
          700: '#2d54d4',
          800: '#003d82',
          900: '#002d5f',
        },
        accent: {
          50: '#fff7f0',
          100: '#ffede0',
          200: '#ffd4b8',
          300: '#ffb890',
          400: '#ff9d68',
          500: '#ff8240',
          600: '#ff6b35',
          700: '#e85a2a',
          800: '#c9481f',
          900: '#a63a18',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
