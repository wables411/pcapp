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
        oil: {
          black: '#000000',
          dark: '#111111',
          gray: '#222222',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        mono: ['var(--font-gt-america-mono)', 'monospace'],
        brutal: ['var(--font-neuebit)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;

