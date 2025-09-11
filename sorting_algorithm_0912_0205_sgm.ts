// 代码生成时间: 2025-09-12 02:05:48
import { ApolloServer, gql } from 'apollo-server';

// 定义schema
const typeDefs = gql"""
  type Query {
    sortNumbers(numbers: [Int]!): [Int]
  }
""";

// 实现排序算法
class SortingService {
  public static sortNumbers(numbers: number[]): number[] {
    // 对输入数组进行错误处理
    if (!Array.isArray(numbers) || !numbers.every((item) => typeof item === 'number')) {
      throw new Error('Invalid input: numbers must be an array of integers');
    }

    // 实现一个简单的冒泡排序算法
    const sortedNumbers = numbers.slice(); // 复制数组避免直接修改原数组
    for (let i = 0; i < sortedNumbers.length; i++) {
      for (let j = 0; j < sortedNumbers.length - i - 1; j++) {
        if (sortedNumbers[j] > sortedNumbers[j + 1]) {
          // 交换元素
          [sortedNumbers[j], sortedNumbers[j + 1]] = [sortedNumbers[j + 1], sortedNumbers[j]];
        }
      }
    }

    return sortedNumbers;
  }
}

// 定义resolvers
const resolvers = {
  Query: {
    sortNumbers: (_parent, args) => {
      try {
        return SortingService.sortNumbers(args.numbers);
      } catch (error) {
        // 错误处理，返回错误信息
        return new Error(error.message);
      }
    },
  },
};

// 创建Apollo服务器
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 启动服务器
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});