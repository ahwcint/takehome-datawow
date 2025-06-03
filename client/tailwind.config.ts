import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-1': '#1E1E2F',
      },
    },
  },
  plugins: [],
};
export default config;
