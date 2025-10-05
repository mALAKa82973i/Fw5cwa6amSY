// 代码生成时间: 2025-10-05 19:52:48
import { ApolloServer, gql } from 'apollo-server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { promisify } from 'util';

// GraphQL type definitions for the version control system
const typeDefs = gql`
  type FileVersion {
    id: ID!
    version: Int!
    fileName: String!
    content: String!
    committedAt: String
  }

  type Query {
    getFileVersions(fileName: String!): [FileVersion]
  }

  type Mutation {
    addFile(fileName: String!, content: String!): FileVersion
    commitFile(fileName: String!, version: Int!, content: String!): FileVersion
  }
`;

// Resolvers for the GraphQL operations
const resolvers = {
  Query: {
    getFileVersions: async (_, { fileName }) => {
      try {
        const versionsPath = join('versions', fileName);
        if (!existsSync(versionsPath)) {
          throw new Error('File not found');
        }
        const versions = await promisify(glob)(`**/*`, { cwd: versionsPath });
        return versions.map((versionPath) => {
          const fullPath = join(versionsPath, versionPath);
          const version = parseInt(versionPath.split('.')[1], 10);
          const content = readFileSync(fullPath, 'utf8');
          return {
            id: versionPath,
            version,
            fileName,
            content,
            committedAt: new Date().toLocaleString()
          };
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    addFile: async (_, { fileName, content }) => {
      try {
        const versionsPath = join('versions', fileName);
        if (!existsSync(versionsPath)) {
          mkdirSync(versionsPath, { recursive: true });
        }
        const version = 1; // Initialize version 1
        const filePath = join(versionsPath, `${version}.txt`);
        writeFileSync(filePath, content);
        return {
          id: `${version}.txt`,
          version,
          fileName,
          content,
          committedAt: new Date().toLocaleString()
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    commitFile: async (_, { fileName, version, content }) => {
      try {
        const versionsPath = join('versions', fileName);
        if (!existsSync(versionsPath)) {
          throw new Error('File not found');
        }
        const filePath = join(versionsPath, `${version}.txt`);
        writeFileSync(filePath, content);
        return {
          id: `${version}.txt`,
          version,
          fileName,
          content,
          committedAt: new Date().toLocaleString()
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

// Create an ApolloServer instance with type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
