import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  {
    plugins: {
      prettier: prettierPlugin,
      "react-hooks": reactHooksPlugin,
    },
    extends: [eslintConfigPrettier],
    rules: {
      "prettier/prettier": "error",
      "react-hooks/rules-of-hooks": "error",
    },
  },
];
