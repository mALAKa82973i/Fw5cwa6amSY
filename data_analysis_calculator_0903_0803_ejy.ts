// 代码生成时间: 2025-09-03 08:03:16
import { ApolloClient, InMemoryCache } from '@apollo/client';

// 定义统计分析器的类
class DataAnalysisCalculator {
  private client: ApolloClient<any>;

  constructor() {
    // 初始化Apollo客户端
    this.client = new ApolloClient({
      uri: 'YOUR_APOLLO_SERVER_URI', // 替换为Apollo服务端地址
      cache: new InMemoryCache(),
    });
  }

  // 获取数据的函数，返回Promise以便异步处理
  async fetchData(query: string): Promise<any> {
    try {
      const result = await this.client.query({
        query: gql(query),
      });
      return result.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  // 计算平均值的函数
  calculateMean(data: number[]): number {
    if (data.length === 0) throw new Error('Data array is empty');
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  }

  // 计算中位数的函数
  calculateMedian(data: number[]): number {
    if (data.length === 0) throw new Error('Data array is empty');
    const sortedData = [...data].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      return (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
    } else {
      return sortedData[middleIndex];
    }
  }

  // 计算众数的函数
  calculateMode(data: number[]): number | null {
    if (data.length === 0) throw new Error('Data array is empty');
    const frequencyMap: { [key: number]: number } = {};

    data.forEach((num) => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });

    const maxFrequency = Math.max(...Object.values(frequencyMap));
    const modes: number[] = Object.keys(frequencyMap)
      .filter((key) => frequencyMap[key] === maxFrequency)
      .map((key) => Number(key));

    return modes.length > 1 ? null : modes[0];
  }
}

// 使用示例
const dataAnalysisCalculator = new DataAnalysisCalculator();

// 假设我们有一个从Apollo获取的数据查询字符串
const dataQuery = """
  query GetData {
    yourDataQuery
  }
""";

dataAnalysisCalculator.fetchData(dataQuery)
  .then((data) => {
    // 假设data是一个包含数值的数组
    const mean = dataAnalysisCalculator.calculateMean(data);
    const median = dataAnalysisCalculator.calculateMedian(data);
    const mode = dataAnalysisCalculator.calculateMode(data);

    console.log(`Mean: ${mean}, Median: ${median}, Mode: ${mode}`);
  })
  .catch((error) => {
    console.error('Failed to perform data analysis:', error);
  });