// 代码生成时间: 2025-09-01 05:27:47
 * It showcases best practices, error handling, and maintainability.
 */

import { ApolloServer, gql } from 'apollo-server';

// Define the type of data our query will return
type RandomNumberResult = {
  randomNumber: number;
  error?: string;
};

// Define the schema for our GraphQL API
const typeDefs = gql`
  type Query {
    getRandomNumber(min: Int!, max: Int!): RandomNumberResult!
  }
`;

// Define the resolvers for our GraphQL API
const resolvers = {
  Query: {
    getRandomNumber: async (_, { min, max }: { min: number; max: number }): Promise<RandomNumberResult> => {
      // Error handling to ensure the input range is valid
      if (min >= max) {
        return {
          randomNumber: 0,
          error: 'Minimum value must be less than maximum value',
        };
      }

      // Generate a random number within the given range
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return {
        randomNumber,
      };
    },
  },
};

// Create an instance of ApolloServer with the defined typeDefs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Enable playground for easy testing
  playground: true,
  // Enable introspection for the GraphQL API
  introspection: true,
});

// Start the server on port 4000
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});