// 代码生成时间: 2025-08-16 11:20:55
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as archiver from 'archiver';
import { createWriteStream } from 'fs';

// Define the type for the input to the extraction mutation
interface ExtractFileInput {
  filePath: string;
  outDir: string;
}

// Define the type for the extraction result
interface ExtractFileResult {
  success: boolean;
  message: string;}

// The GraphQL schema
const typeDefs = gql`
  type Mutation {
    extractFile(input: ExtractFileInput!): ExtractFileResult!
  }
`;

// The GraphQL resolvers
const resolvers = {
  Mutation: {
    extractFile: async (_, { input }: { input: ExtractFileInput }) => {
      const { filePath, outDir } = input;
      try {
        // Check if the input file exists
        await fs.access(filePath);
        
        // Create the output directory if it doesn't exist
        await fs.mkdir(outDir, { recursive: true });
        
        const output = fs.createWriteStream(path.join(outDir, path.basename(filePath, path.extname(filePath))));
        const archive = archiver('zip', { zlib: { level: 9 } });
        
        await new Promise<void>((resolve, reject) => {
          archive
            .directory(filePath, false)
            .on('error', reject)
            .pipe(output)
            .on('close', resolve);
          archive.finalize();
        });

        return { success: true, message: 'File extraction completed successfully.' };
      } catch (error) {
        // Handle errors such as file not found or permission issues
        return { success: false, message: error instanceof Error ? error.message : 'An unknown error occurred.' };
      }
    },
  },
};

// Create and start the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

void server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
