// 代码生成时间: 2025-09-11 02:03:07
import ExcelJS from 'exceljs';
import { ApolloServer, gql } from 'apollo-server';

// 定义GraphQL schema
const typeDefs = gql"""
  type File {
    data: String
    mimeType: String
  }

  type Query {
    generateExcel(data: [String]): File
  }
""";

// 定义GraphQL resolvers
const resolvers = {
  Query: {
    generateExcel: async (_, { data }) => {
      try {
        // 创建一个新的Excel工作簿
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        // 将传入的数据填充到工作表中，每一项数据作为一行
        const rows = data.map((item) => ({
          A1: item,
        }));

        // 写入数据到工作表
        worksheet.addRows(rows);

        // 将工作簿转换为Excel文件的二进制字符串
        const buffer = await workbook.xlsx.writeBuffer();

        // 编码为base64，以便作为文件流传输
        const base64Data = Buffer.from(buffer).toString('base64');

        // 返回文件流信息
        return {
          data: base64Data,
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };
      } catch (error) {
        // 错误处理
        console.error('Error generating Excel:', error);
        throw new Error('Failed to generate Excel');
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
  console.log(`🚀 Server ready at ${url}`);
});