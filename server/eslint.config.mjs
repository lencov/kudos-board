import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: [
      "src/generated/**/*",
      "node_modules/**/*",
      "dist/**/*",
      "build/**/*"
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "writable",
        module: "writable",
        require: "readonly"
      },
      ecmaVersion: "latest",
      sourceType: "commonjs"
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
      'no-unused-vars': 'error',
      'indent': ['error', 4],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
    }
  }
];
