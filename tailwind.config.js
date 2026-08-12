/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cream: {
          50: '#fdfcf8',
          100: '#f9f5ec',
          200: '#f2ead6',
          300: '#e8dbb8',
        },
        graphite: {
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#222222',
          500: '#2e2e2e',
          400: '#3d3d3d',
          300: '#555555',
          200: '#888888',
          100: '#aaaaaa',
        },
        gold: {
          300: '#d4af7a',
          400: '#c9a05a',
          500: '#b8862a',
          600: '#9a6e1a',
        },
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['7.5rem', { lineHeight: '1' }],
        '10xl': ['9rem', { lineHeight: '0.95' }],
      },
    },
  },
  plugins: [],
}
