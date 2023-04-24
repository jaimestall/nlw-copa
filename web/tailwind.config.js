/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // aumenta a configuração padrão do tailwind, incrementando novos e melhores padrões para estilização
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
      colors: {
        ignite: {
          500: '#129E57'
        },
        yellow: {
          500: '#F7DD43',
          700: '#E5CD3D'
        },
        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#323238',
          800: '#202024',
          900: '#121214'
        }
      },
      backgroundImage: {
        app: 'url(/app-bg.png)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
