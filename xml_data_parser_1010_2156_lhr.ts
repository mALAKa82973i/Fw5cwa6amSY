// 代码生成时间: 2025-10-10 21:56:47
import { ApolloServer, gql } from 'apollo-server';
import { parse as parseXML } from 'xml2js';
import { promisify } from 'util';

// Promisify the parse function from xml2js for use with async/await
const parseXMLAsync = promisify(parseXML);

// Define the GraphQL schema
const typeDefs = gql`
  type Query {
    xmlDataParsing(input: String!): String
  }
`;

// Define the resolvers for the GraphQL schema
const resolvers = {
  Query: {
    xmlDataParsing: async (_, args: { input: string }) => {
      try {
        // Parse the XML data provided in the input argument
        const result = await parseXMLAsync(args.input);
        // Convert the result to a string (JSON) and return it
        return JSON.stringify(result, null, 2);
      } catch (error) {
        // Handle any errors that occur during parsing and return an error message
        return `Error parsing XML: ${error.message}`;
      }
    },
  },
};

// Create an instance of the ApolloServer with the defined typeDefs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Enable playground for development purposes
  // playground: true,
  // Enable introspection for development purposes
  // introspection: true,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});