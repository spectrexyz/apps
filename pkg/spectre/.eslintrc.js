module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "@emotion",
  ],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    // see for rational https://basarat.gitbook.io/typescript/main-1/defaultisbad
    "import/no-default-export": "error",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-this-alias": "warn",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/consistent-type-imports": "error",

    // doesn’t detect inputs nested in a component so disabling it is easier
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-noninteractive-tabindex": "off",

    "import/extensions": [
      "error",
      {
        js: "never",
        json: "always",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/react-in-jsx-scope": "off",

    "react/no-unknown-property": ["error", { "ignore": ["css"] }],
  },
  settings: {
    react: {
      // to indicate latest version
      // https://github.com/yannickcr/eslint-plugin-react/blob/b8e91a571bc6b58cc3c78e9e62e8b60ecb45e233/lib/util/version.js#L48
      version: "999.999.999",
    },
    "import/core-modules": ["moire"],
    "import/order": {
      alphabetize: { order: "asc", caseInsensitive: true },
      groups: [
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "index",
        "object",
        "type",
      ],
    },
  },
  ignorePatterns: ["dist", "node_modules"],
}
