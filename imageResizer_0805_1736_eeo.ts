// 代码生成时间: 2025-08-05 17:36:31
import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Image } from 'image-js'; // Assuming image-js is used for image processing
import sharp from 'sharp'; // Using sharp for image resizing

// Define GraphQL schema
const typeDefs = gql\`
  type Query {
    resizeImages(input: ResizeInput!): String
  }

  input ResizeInput {
    sourceFolderPath: String!
    targetFolderPath: String!
    width: Int
    height: Int
  }
\`;

// Define resolvers
const resolvers = {
  Query: {
    resizeImages: async (_, { input }) => {
      try {
        const { sourceFolderPath, targetFolderPath, width, height } = input;
        if(!width && !height) {
          throw new Error('Either width or height must be provided.');
        }

        // Read all image files in the source folder
        const files = readFileSync(join(sourceFolderPath, 'list.txt'), 'utf8').split('\
');
        for (const file of files) {
          const image = await sharp(join(sourceFolderPath, file))
            .resize({ width, height })
            .toBuffer();
          const targetPath = join(targetFolderPath, file);
          await sharp(image)
            .toFile(targetPath);
        }
        return 'Images resized successfully.';
      } catch (error) {
        throw new Error('Failed to resize images: ' + error.message);
      }
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Additional server configurations
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});