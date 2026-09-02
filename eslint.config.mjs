import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".next-dev/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Additional ignores
    "node_modules/**",
    "coverage/**",
    "*.config.js",
    "*.config.mjs",
  ]),

  // Custom rules for professional development
  {
    name: "custom-rules",
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",

      // General best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],

      // React specific rules
      "react/self-closing-comp": "error",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          reservedFirst: true,
        },
      ],
      "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],

      // Import organization
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-duplicates": ["error", { "prefer-inline": true }],

      // Next.js specific
      "@next/next/no-img-element": "error",
    },
  },
]);

export default eslintConfig;
