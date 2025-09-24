// 代码生成时间: 2025-09-24 10:58:58
import { ApolloServer, gql } from 'apollo-server';
import { isValid as isValidURL } from 'uri-js';

// Define the type for a URL
interface UrlInput {
  url: string;
}

// Define the schema for the GraphQL API
const typeDefs = gql`
  type Query {
    validateURL(input: UrlInput!): ValidationResult
  }

  type ValidationResult {
    valid: Boolean
    error: String
  }
`;

// Define the resolvers for the GraphQL API
const resolvers = {
  Query: {
    validateURL: (_, { input }: { input: UrlInput }) => {
      try {
        // Check if the URL is valid
        if (isValidURL(input.url)) {
          return { valid: true, error: '' };
        } else {
          return {
            valid: false,
            error: 'Invalid URL provided.'
          };
        }
      } catch (error) {
        return {
          valid: false,
          error: error instanceof Error ? error.message : 'An error occurred.'
        };
      }
    },
  },
};

// Create an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
  });
