// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

const config = {
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  printWidth: 120,
  plugins: ['@shopify/prettier-plugin-liquid', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.liquid',
      options: {
        singleQuote: false,
      },
    },
  ],
};

export default config;
