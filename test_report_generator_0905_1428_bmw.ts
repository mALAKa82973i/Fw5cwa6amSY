// 代码生成时间: 2025-09-05 14:28:07
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server';
import { v4 as uuidv4 } from 'uuid';

// Define the GraphQL schema
const typeDefs = gql"
  type TestReport {
    id: ID!
    title: String!
    description: String
    status: String!
    timestamp: String
  }

  type Query {
    getTestReports: [TestReport]
  }

  type Mutation {
    createTestReport(title: String!, description: String, status: String!): TestReport
  }
";

// Mocked test report data
const testReports: any[] = [];

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  Query: {
    getTestReports: () => testReports,
  },

  Mutation: {
    createTestReport: (_, { title, description, status }) => {
      // Error handling for required fields
      if (!title || !status) {
        throw new Error('Title and status are required for a test report.');
      }
      
      // Create a new test report and add it to the array
      const newReport: any = {
        id: uuidv4(),
        title,
        description,
        status,
        timestamp: new Date().toISOString(),
      };
      testReports.push(newReport);
      return newReport;
    },
  },
};

// Create an instance of Apollo Server with the defined schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {},
  playground: true,
  introspection: true,
});

// Start the Apollo Server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
