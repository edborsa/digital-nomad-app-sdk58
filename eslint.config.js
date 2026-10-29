// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier/flat");

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    ignores: [
      "dist/*",
      ".expo/*",
      ".agents/*",
      ".claude/*",
      ".beads/*",
      "src/infra/graphql/generated/*",
    ],
  },
]);
