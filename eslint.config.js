import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node, // esbuild.config.js
        Theme: 'readonly',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-var': 'error',
    },
  },
  {
    ignores: ['node_modules/**', 'assets/**', '.shopify/**', '*.min.js'],
  },
];
