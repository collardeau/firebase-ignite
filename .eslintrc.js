module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  extends: 'airbnb',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'comma-dangle': 1,
    'no-unused-vars': 1,
    'indent': 1,
    'semi': 1,
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'no-console': 0,
    'no-mixed-operators': 0,
    'prefer-template': 0,
    'space-before-function-paren': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
  },
};
