// 代码生成时间: 2025-09-14 15:43:39
import { readFile } from 'fs/promises';
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server';
import { TextFileData } from './types'; // Assumed types are defined in another file named types.ts

// Define the GraphQL schema
const typeDefs = gql`
  type Query {
    getTextFileAnalysis(filePath: String!): TextFileAnalysisResult!
  }

  type TextFileAnalysisResult {
    wordCount: Int
    uniqueWords: Int
    lines: Int
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    getTextFileAnalysis: async (_, args: { filePath: string }) => {
      try {
        // Read the file
        const fileContent = await readFile(args.filePath, 'utf-8');

        // Process the file content
        const processedContent = processFileContent(fileContent);

        // Return the analysis result
        return processedContent;
      } catch (error) {
        // Handle errors
        console.error('Error reading or processing the file:', error);
        throw new Error('Failed to analyze the file.');
      }
    },
  },
};

// Function to process the file content
function processFileContent(content: string): TextFileAnalysisResult {
  // Split the content into lines and words
  const lines = content.split('
');
  const words = content.split(' ');

  // Calculate the word count and unique words
  const wordCount = words.length;
  const uniqueWords = new Set(words.filter(Boolean).map((word) => word.toLowerCase())).size;

  // Return the analysis result
  return {
    wordCount,
    uniqueWords,
    lines: lines.length,
  };
}

// Start the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});