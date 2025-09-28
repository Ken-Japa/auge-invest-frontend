import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  {
    files: ["**/*.{js,cjs,ts,jsx,tsx}"], // Removido .mjs daqui
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          // Adicionando 'jsx-runtime' para o novo JSX transform
          "jsx-runtime": true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      "@next/next": nextPlugin,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-case-declarations": "off",
      "no-constant-binary-expression": "off",
      "no-empty": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Removendo pluginJs.configs.recommended para simplificar a configuração
  // pluginJs.configs.recommended,
  ...compat.config({
    extends: ["next/core-web-vitals"],
  }).map((config) => ({ ...config, files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] })),
];
