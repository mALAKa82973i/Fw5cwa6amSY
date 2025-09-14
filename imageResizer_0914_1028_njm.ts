// 代码生成时间: 2025-09-14 10:28:06
import { ApolloServer, gql } from 'apollo-server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp'; // Ensure sharp is installed

// Type definitions for GraphQL schema
const typeDefs = gql`
  type File {
    id: ID!
    path: String!
    size: Int!
  }

  type Query {
    resizer(input: [File]): [File]
  }
`;

// Resolvers for GraphQL operations
const resolvers = {
  Query: {
    resizer: async (_, { input }) => {
      // Ensure input is provided and is an array
      if (!input || !Array.isArray(input)) {
        throw new Error('Invalid input');
      }

      // Process each file in the input array
      return input.map(async (file) => {
        try {
          const { width, height } = await sharp(file.path).metadata();
          const resizedImage = await sharp(file.path)
            .resize(200, 200) // Resize to 200x200 pixels
            .toBuffer();

          // Write the resized image back to the filesystem
          const newFilePath = join('resized', `${file.id}.jpg`);
          writeFileSync(newFilePath, resizedImage);

          // Return the new resized file info
          return {
            ...file,
            size: resizedImage.byteLength,
            path: newFilePath,
          };
        } catch (error) {
          throw new Error(`Error processing file ${file.path}: ${error.message}`);
        }
      });
    },
  },
};

// Initialize Apollo Server with type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    // Context can be used to pass additional info to resolvers
  }),
  // Additional configurations can be added here
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
