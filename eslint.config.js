// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      'linebreak-style': 'off',
      semi: ['error', 'always'],
      'prettier/prettier': ['error', { endOfLine: 'auto', semi: true }],
    },
  },
  // Enable Prettier as an ESLint rule and disable conflicting ESLint rules
  prettierRecommended,
  eslintConfigPrettier,
]);
