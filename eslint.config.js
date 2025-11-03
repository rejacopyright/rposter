//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  ...tanstackConfig,
  {
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      'react-hooks': reactHooks,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'max-lines': ['error', { max: 500, skipBlankLines: false, skipComments: false }],
      'prefer-arrow-callback': ['warn', { allowNamedFunctions: false }],
      'no-duplicate-imports': 'error',
      'no-console': 'warn',
      'no-empty': 'off',
      'no-debugger': 'warn',
      eqeqeq: 'error',
      'prettier/prettier': 'error',
      'array-callback-return': 'warn',
      'no-unused-vars': 'off',
      'no-empty-function': 'error',
      'no-unsafe-optional-chaining': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^@tanstack/'], // 1. React first
            ['^@?\\w'], // 2. Packages (node_modules)
            ['^@/', '^~/'], // 3. Internal alias like @/, ~/
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // 4. Parent imports
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // 5. Sibling imports
            ['^.+\\.s?css$'], // 6. Style imports
            ['^'], // 7. Anything else (fallback)
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'import/consistent-type-specifier-style': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'off',
      'react/display-name': 'off',
      'react/no-array-index-key': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unstable-nested-components': ['off', { allowAsProps: false }],
      'react/jsx-key': [
        'warn',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
    },
  },
]
