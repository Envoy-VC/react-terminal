/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--terminal-background)',
        foreground: 'var(--terminal-foreground)',
        border: 'var(--terminal-border)',
      },
      animation: {
        blink: 'blink 0.95s steps(1) infinite',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
