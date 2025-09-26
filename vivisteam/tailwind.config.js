/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1f8a70',
          secondary: '#f5a6c7',
          surface: '#f5fbf9',
          ink: '#101828',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f2f4f7',
          200: '#e4e7ec',
          300: '#d0d5dd',
          400: '#98a2b3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1d2939',
          900: '#0f1728',
        },
        accent: {
          500: '#5b5bd6',
        },
      },
      fontFamily: {
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '64rem',
      },
      boxShadow: {
        soft: '0 20px 60px -30px rgba(15, 23, 42, 0.35)',
        brand: '0 20px 40px -15px rgba(31, 138, 112, 0.45)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top right, rgba(243, 93, 155, 0.15), transparent 60%), radial-gradient(circle at bottom left, rgba(31, 138, 112, 0.2), transparent 55%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.4))',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
