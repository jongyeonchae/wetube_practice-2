module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "prefer-arrow-callback": "off",
    "no-else-return": "off",
    "import/prefer-default-export": "off",
  },
};
