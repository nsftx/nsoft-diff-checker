module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    $: 'readonly',
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'linebreak-style': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-param-reassign': ['error', { props: false }],
    'no-use-before-define': 0,
    camelcase: 0,
  },
};
