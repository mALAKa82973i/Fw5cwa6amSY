// 代码生成时间: 2025-08-19 12:41:21
import { ApolloServer, gql } from 'apollo-server';

// Define the type for a process
interface Process {
  name: string;
  pid: number;
  status: string;
}

// Mock data for processes
const processes: Process[] = [
  { name: 'Process A', pid: 1234, status: 'Running' },
  { name: 'Process B', pid: 5678, status: 'Stopped' },
  { name: 'Process C', pid: 9012, status: 'Running' },
];

// Define the GraphQL schema
const typeDefs = gql`
  type Process {
    name: String!
    pid: Int!
    status: String!
  }

  type Query {
    getProcesses: [Process]
    getProcessByName(name: String!): Process
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    getProcesses: () => {
      return processes;
    },
    getProcessByName: (_, { name }) => {
      const process = processes.find(p => p.name === name);
      if (!process) {
        throw new Error('Process not found');
      }
      return process;
    },
  },
};

// Create and start the ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Process Manager is running at ${url}`);
});
