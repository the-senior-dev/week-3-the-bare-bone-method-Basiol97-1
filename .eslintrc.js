module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    "cypress/globals": true,
  },
  extends: [
    "standard",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
    "plugin:react/recommended",
    "plugin:styled-components-a11y/strict"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "cypress", "styled-components-a11y"],
  rules: {
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
