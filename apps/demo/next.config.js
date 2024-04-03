await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: 'https://react-terminal-docs.vercel.app',
      },
      {
        source: '/docs/:slug*',
        destination: 'https://react-terminal-docs.vercel.app/:slug*',
      },
    ];
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

export default config;
