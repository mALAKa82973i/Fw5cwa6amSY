// 代码生成时间: 2025-08-04 04:47:23
import fs from 'fs-extra';
import path from 'path';
import { ApolloError } from 'apollo-server-errors';

// FolderStructureOrganizer 类负责整理文件夹结构
class FolderStructureOrganizer {
  // 构造函数，接收源文件夹和目标文件夹路径
  constructor(private sourcePath: string, private targetPath: string) {}

  // 检查并创建目标文件夹，如果文件夹已存在则不做任何操作
  private async ensureTargetFolderExists() {
    try {
      await fs.ensureDir(this.targetPath);
    } catch (error) {
      throw new ApolloError('Failed to create target folder', 'INTERNAL_SERVER_ERROR', { reason: error.message });
    }
  }

  // 复制文件到目标文件夹
  private async copyFiles() {
    try {
      await fs.copy(this.sourcePath, this.targetPath);
    } catch (error) {
      throw new ApolloError('Failed to copy files', 'INTERNAL_SERVER_ERROR', { reason: error.message });
    }
  }

  // 整理文件夹结构的主函数
  public async organize() {
    try {
      // 确保目标文件夹存在
      await this.ensureTargetFolderExists();

      // 复制文件到目标文件夹
      await this.copyFiles();

      console.log('Folder structure organized successfully.');
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
}

// 使用示例
const main = async () => {
  const sourceFolderPath = path.join(__dirname, 'source');
  const targetFolderPath = path.join(__dirname, 'target');

  const organizer = new FolderStructureOrganizer(sourceFolderPath, targetFolderPath);
  await organizer.organize();
};

main();