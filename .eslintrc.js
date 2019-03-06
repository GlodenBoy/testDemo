module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    __static: true,
  },
  plugins: ['html'],
  rules: {
    'max-len': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': 0,
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
      },
    ],
    // allow async-await
    'generator-star-spacing': 0,
    'space-before-function-paren': ['error', 'always'],
    'arrow-parens': 0,
    // allow debugger during development
    'no-console': 0,
    'no-debugger': 0,
    'no-alert': 0,
    'no-undef': 0,
    'no-console': 0,
    'no-shadow': 0,
    'no-multi-assign': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'linebreak-style': [0, 'error', 'windows'],
    'global-require': 0,
    'no-param-reassign': 0,
  },
};
