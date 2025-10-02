import globals from 'globals'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { FlatCompat } from '@eslint/eslintrc'
import prettierPlugin from 'eslint-plugin-prettier'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const config = [
  {
    files: ['**/*.{js,cjs,ts,jsx,tsx}'], // Removido .mjs daqui
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          // Adicionando 'jsx-runtime' para o novo JSX transform
          'jsx-runtime': true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      '@next/next': nextPlugin,
      '@typescript-eslint': tseslint.plugin,
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
    },
    rules: {
      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'off',
      'react/display-name': 'off',
      'no-case-declarations': 'off',
      'no-constant-binary-expression': 'off',
      'no-empty': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Adiciona eslint-config-prettier como a última configuração para estender
  {
    extends: ['prettier'],
  },
  ...compat
    .config({
      extends: ['next/core-web-vitals'],
    })
    .map((config) => ({ ...config, files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] })),
]

export default config
