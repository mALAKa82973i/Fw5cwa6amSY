// 代码生成时间: 2025-09-05 17:58:37
 * Features:
 * - Simple task scheduling with cron syntax.
 * - Error handling for task execution.
 * - Documentation and comments for maintainability.
 * - Follows TypeScript best practices for readability and scalability.
 */

import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server';
import { CronJob } from 'cron';
import { readFileSync } from 'fs';

// Define the schema for the GraphQL server
const typeDefs = gql`
  type Query {
    scheduleTask(taskName: String!, cronString: String!, handler: String!): String
  }
`;

// Define the resolvers for the GraphQL schema
const resolvers = {
  Query: {
    scheduleTask: async (_, { taskName, cronString, handler }) => {
      try {
        // Load the task handler function from a file
        const handlerCode = readFileSync(handler, 'utf8');
        const task = new Function(handlerCode)();

        // Schedule the task with the provided cron string
        new CronJob(cronString, task, null, true, 'America/New_York');

        return `Task ${taskName} scheduled successfully.`;
      } catch (error) {
        console.error('Failed to schedule task:', error);
        throw new Error('Failed to schedule task due to an error.');
      }
    }
  },
};

// Create the GraphQL schema with type definitions and resolvers
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an ApolloServer instance
const server = new ApolloServer({ schema });

// Start the server on port 4000
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
