module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  rules: {
    'no-console': 0,
    'no-irregular-whitespace': [
      'error',
      { skipTemplates: true, skipStrings: true }
    ],
    'prefer-const': ['error']
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint'
      ],
      rules: {
        // note you must disable the base rule as it can report incorrect errors
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': [
          'error',
          { allow: ['arrowFunctions'] }
        ],
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          { allowHigherOrderFunctions: true }
        ],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            varsIgnorePattern: '[iI]gnored(.*)',
            ignoreRestSiblings: true
          }
        ]
      }
    }
  ]
};
