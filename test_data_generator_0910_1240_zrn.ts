// 代码生成时间: 2025-09-10 12:40:45
import { ApolloServer, gql } from 'apollo-server';
importfaker from 'faker';

// Define the type of data we want to generate
type TestData = {
  id: number;
  name: string;
  email: string;
};

// A function to generate test data
function generateTestData(): TestData[] {
  const testData: TestData[] = [];
  for (let i = 0; i < 10; i++) {
    testData.push({
      id: i + 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
    });
  }
  return testData;
}

// GraphQL schema definition
const typeDefs = gql`
  type Query {
    testData: [TestData]
  }
  type TestData {
    id: Int
    name: String
    email: String
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    testData: async (): Promise<TestData[]> => {
      try {
        return generateTestData();
      } catch (error) {
        console.error('Error generating test data:', error);
        throw new Error('Failed to generate test data');
      }
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`);
});