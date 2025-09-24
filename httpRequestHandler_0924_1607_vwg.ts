// 代码生成时间: 2025-09-24 16:07:26
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { resolvers } from './resolvers';

// Define the GraphQL type definitions
const typeDefs = `
  type Query {
    hello: String
  }
`;

// Create the GraphQL schema using the type definitions and resolvers
const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Create an instance of ApolloServer with the defined schema
const server = new ApolloServer({
  schema,
  context: () => ({
    // Provide additional context to resolvers if needed
  }),
  // Error handling and logging for HTTP requests
  formatError: (error) => {
    console.error(error);
    return error;
  },
  // Customizing the playground and introspection for better development experience
  introspection: true,
  playground: true,
});

// Start the server and listen on a specific port
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// Resolvers for the GraphQL schema
export const resolvers = {
  Query: {
    hello: (): string => {
      // Simple resolver to return a greeting message
      return 'Hello, world!';
    },
  },
};