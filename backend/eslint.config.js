export default [
    {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "no-unused-vars": "off",
       "semi": ["error", "always"],
       "quotes": ["error", "double"],
    },
  },
];
