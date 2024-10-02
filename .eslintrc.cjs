module.exports = {
  parserOptions: {
    sourceType: "module",
  },
  extends: ["eslint:recommended", "prettier"],
  env: {
    es2022: true,
    node: true,
    jest: true,
    browser: true,
  },
  rules: {
    "prefer-const": "warn",
  },
  root: true,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      env: {
        browser: true,
        es2021: true,
      },
      parser: "@typescript-eslint/parser",
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      plugins: ["@typescript-eslint"],
      rules: {
        semi: [2, "always"],
      },
    },
  ],
};
