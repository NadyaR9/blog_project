module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:i18next/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'eslint-check-relative-path',
    'unused-imports',
  ],
  rules: {
    'max-len': ['error', { code: 120 }],
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    indent: [2, 2],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    camelcase: 'off',
    'i18next/no-literal-string': ['error', {
      markupOnly: true,
      ignoreAttribute: [
        'border',
        'target',
        'directions',
        'as',
        'role',
        'to',
        'data-testid',
        'name',
        'justify',
        'align',
        'direction',
        'gap'],
    }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'no-param-reassign': 'off',
    'linebreak-style': ['error', 'windows'],
    'no-undef': 'off',
    'react/no-array-index-key': 'warn',
    'arrow-body-style': 'off',
    'eslint-check-relative-path/relative-path-checker': ['error', { alias: '@' }],
    'eslint-check-relative-path/check-public-api-imports': ['error', {
      alias: '@',
      testFilesPatterns: ['**/*.test.ts', '**/*.stories.ts', '**/StoreDecorator.tsx'],
    }],
    'eslint-check-relative-path/layers-import': ['error', {
      alias: '@',
      ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
    }],
    'unused-imports/no-unused-imports': 'error',
  },
  globals: {
    __DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
};
