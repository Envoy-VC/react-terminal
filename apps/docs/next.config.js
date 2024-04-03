// @ts-expect-error err
import nextra from 'nextra';

await import('./src/env.js');

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['geist'],
  experimental: {
    esmExternals: 'loose',
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

export default withNextra(config);
