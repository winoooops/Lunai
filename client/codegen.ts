import type { CodegenConfig } from '@graphql-codegen/cli';


const config: CodegenConfig = {
  schema: [
    "../@graphql/schema/**/*.graphql"
  ],
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      config: {
        documentMode: "documentNode",
        typesPrefix: "GQL",
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      }
    }
  }
}

export default config;