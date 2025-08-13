// 代码生成时间: 2025-08-14 05:21:22
import { ApolloServer, gql } from 'apollo-server';
import os from 'os';
import fs from 'fs';
import { promisify } from 'util';

// Asynchronous promisify wrapper for file system access.
const readFileAsync = promisify(fs.readFile);

// GraphQL schema definition for the system performance monitoring tool.
const typeDefs = gql`
  type Query {
    systemInfo: SystemInfo
  }

  type SystemInfo {
    cpuInfo: String
    memoryInfo: String
    diskInfo: String
  }
`;

// Resolvers for the GraphQL schema.
const resolvers = {
  Query: {
    systemInfo: async (): Promise<{ cpuInfo: string; memoryInfo: string; diskInfo: string }> => {
      try {
        // Gather system information.
        const cpuInfo = os.cpus().map(cpu => cpu.model).join(', ');
        const memoryInfo = `${os.totalmem() / (1024 * 1024 * 1024)} GB total, ${os.freemem() / (1024 * 1024 * 1024)} GB free`;
        // Read the /proc/diskstats file to gather disk information.
        const diskStats = await readFileAsync('/proc/diskstats', 'utf8');
        const diskInfo = diskStats.split('
')
          .filter(line => line.includes('disk'))
          .map(line => line.split(' ')[2]) // Get the device name.
          .join(', ');

        return { cpuInfo, memoryInfo, diskInfo };
      } catch (error) {
        // Handle errors gracefully.
        console.error('Error fetching system information:', error);
        throw new Error('Failed to fetch system information');
      }
    }
  }
};

// Create an instance of ApolloServer with the defined schema and resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Enable playground for development.
  context: () => ({
    headers: {},
    request: {},
  })
});

// Start the Apollo Server.
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});