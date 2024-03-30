/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  useTabs: false,
  singleQuote: true,
  jsxSingleQuote: true,
  importOrder: [
    '^react',
    '^~/lib/(.*)$',
    '^~/components/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^~/assets/(.*)$',
    '^[./]',
    '^~/types/(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
