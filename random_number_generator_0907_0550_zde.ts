// 代码生成时间: 2025-09-07 05:50:08
// Import necessary modules from Apollo
import { IResolvers } from 'apollo-server-express';

interface RandomNumberGeneratorOptions {
  max: number;
  min?: number;
}

class RandomNumberGenerator {
  // Generates a random number within the specified range
  public static generate(options: RandomNumberGeneratorOptions): number {
    if (options.min === undefined) {
      options.min = 0;
    }
    if (options.max <= options.min) {
      throw new Error('max must be greater than min');
    }
    return Math.floor(Math.random() * (options.max - options.min + 1)) + options.min;
  }
}

// Apollo resolvers
const resolvers: IResolvers = {
  Query: {
    randomNumber: (_, { max, min }: RandomNumberGeneratorOptions) => {
      try {
        return RandomNumberGenerator.generate({ max, min });
      } catch (error) {
        // Handle errors and provide meaningful feedback
        console.error('Error generating random number:', error.message);
        throw new Error(error.message);
      }
    }
  },
};

export default resolvers;
