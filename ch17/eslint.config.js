module.exports = [
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly'
      }
    },
    plugins: {
      prettier: require('eslint-plugin-prettier')
    },
    rules: {
      'prettier/prettier': 'error',
      'require-jsdoc': 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'max-len': ['error', { code: 80 }],
      'no-console': 'warn',
      indent: ['error', 2],
      'comma-dangle': ['error', 'never'],
      'no-with': 'error'
    },
    ignores: ['node_modules/', 'format_sample.js']
  }
];
