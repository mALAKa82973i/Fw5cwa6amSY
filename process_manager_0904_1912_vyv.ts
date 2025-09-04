// 代码生成时间: 2025-09-04 19:12:38
// Import necessary modules and Apollo
import { ApolloServer, gql } from 'apollo-server';
import { ProcessManager } from './process_manager_interface';
import { processCollection } from './process_collection';
import { Process } from './process_model';

// Define GraphQL schema for process management
const typeDefs = gql"""
  type Process {
    id: ID!
    name: String!
    status: String!
  }

  type Query {
    getProcessList: [Process]
    getProcessById(id: ID!): Process
  }

  type Mutation {
    addProcess(name: String!, status: String!): Process
    terminateProcess(id: ID!): Boolean
  }
""";

// Define resolvers for GraphQL schema
const resolvers = {
  Query: {
    getProcessList: async () => processCollection.getAll(),
    getProcessById: async (_, { id }) => processCollection.getById(id),
  },
  Mutation: {
    addProcess: async (_, { name, status }) => processCollection.add(new Process({ name, status })),
    terminateProcess: async (_, { id }) => processCollection.remove(id),
  },
};

// Create Apollo server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    // Provide additional context if needed
  },
  playground: true,
  introspection: true,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

/*
 * Interface for process manager
 */
interface ProcessManager {
  getAll(): Process[];
  getById(id: string): Process | null;
  add(process: Process): Process;
  remove(id: string): boolean;
}

/*
 * In-memory collection for storing process data
 */
class ProcessCollection implements ProcessManager {
  private processes: Map<string, Process>;

  constructor() {
    this.processes = new Map();
  }

  getAll(): Process[] {
    return Array.from(this.processes.values());
  }

  getById(id: string): Process | null {
    return this.processes.get(id) || null;
  }

  add(process: Process): Process {
    this.processes.set(process.id, process);
    return process;
  }

  remove(id: string): boolean {
    if (this.processes.has(id)) {
      this.processes.delete(id);
      return true;
    }
    return false;
  }
}

/*
 * Process model
 */
class Process {
  id: string;
  name: string;
  status: string;

  constructor({ name, status }: { name: string; status: string }) {
    this.id = Math.random().toString(36).substr(2, 9); // Generate a unique ID
    this.name = name;
    this.status = status;
  }
}
