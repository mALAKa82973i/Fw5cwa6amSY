// 代码生成时间: 2025-09-05 00:49:07
import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';

// Define the type for memory usage data
interface MemoryUsageData {
  total: number;
  free: number;
  used: number;
  active: number;
  inactive: number;
  wired: number;
  buffCache: number;
  available: number;
}

// Mock function to simulate getting memory usage from an OS
function getMemoryUsage(): MemoryUsageData {
  // In real implementation, this function would interact with the OS to get memory usage statistics
  // For demonstration purposes, return mock data
  return {
    total: 16777216, // Total memory in bytes
    free: 6291456, // Free memory in bytes
    used: 10485760, // Used memory in bytes
    active: 6291456, // Active memory in bytes
    inactive: 6291456, // Inactive memory in bytes
    wired: 6291456, // Wired memory in bytes
    buffCache: 6291456, // Buffers and cache memory in bytes
    available: 6291456, // Available memory in bytes
  };
}

// Resolvers define the technique for fetching the types in the schema.
const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), 'utf8');

const resolvers = {
  Query: {
    memoryUsage: (): MemoryUsageData => {
      try {
        // Retrieve memory usage data from the OS
        const memoryData = getMemoryUsage();
        return memoryData;
      } catch (error) {
        // Handle errors gracefully
        console.error('Error fetching memory usage:', error);
        throw new Error('Failed to fetch memory usage data');
      }
    }
  }
};

// Create Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Set introspection to true for development purposes to allow schema inspection
  introspection: process.env.NODE_ENV !== 'production',
  // Use playground for easy testing and development
  playground: process.env.NODE_ENV !== 'production',
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});