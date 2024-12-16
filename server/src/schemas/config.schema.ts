export const ConfigSchema = `#graphql
  type Config {
    max_tokens: Int!
    temperature: Float!
    stream: Boolean!
    system: String!
    model: String!
  }
  
  input ConfigInput {
    max_tokens: Int
    temperature: Float
    stream: Boolean
    system: String
    model: String
  }

  type Query {
    config: Config!
    availableModels: [String!]!
  } 

  type Mutation {
    setConfig(config: ConfigInput!): Config!
  }
`;