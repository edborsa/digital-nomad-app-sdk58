import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/infra/graphql/schema.graphql",
  documents: ["src/infra/**/*.{ts,tsx}", "!src/infra/graphql/generated/**"],
  ignoreNoDocuments: true,
  generates: {
    "src/infra/graphql/generated/": {
      preset: "client",
      presetConfig: { fragmentMasking: false },
      config: { documentMode: "string", useTypeImports: true },
    },
  },
};

export default config;
