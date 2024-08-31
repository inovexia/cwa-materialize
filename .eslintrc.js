module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true
  },
  parser: '@babel/eslint-parser',
  extends: ['next/core-web-vitals', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: './jsconfig.json',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'newline-before-return': 'off',
    'react/react-in-jsx-scope': 'off',
    'lines-around-comment': 'off',
    'padding-line-between-statements': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-anonymous-default-export': 'off',
    'import/newline-after-import': ['error', { count: 1 }],

    // Ensure that all imports are resolved correctly
    'import/no-unresolved': 'error',

    // Enforce a specific order for imports
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node "builtin" modules (e.g., `fs`, `path`)
          'external', // External modules (e.g., `react`, `lodash`)
          'internal', // Internal modules (e.g., `components`, `utils`)
          ['parent', 'sibling', 'index'], // Parent, sibling, and index imports
          'object' // Imports with object destructuring
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
}
