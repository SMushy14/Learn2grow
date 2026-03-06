// import eslint from "@eslint/js";
// import react from "eslint-plugin-react";
// import { plugin } from "mongoose";

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
      "no-console": "warn",
       "semi": ["error", "always"],
       "quotes": ["error", "double"],
    },
  },
]
