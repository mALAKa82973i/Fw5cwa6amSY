// 代码生成时间: 2025-08-14 23:24:49
import { promises as fs } from 'fs';
import path from 'path';

interface FolderStructure {
  folders: string[];
  files: string[];
}

class FolderStructureOrganizer {
  /**
   * 构造函数
   * @param directoryPath 需要整理的目录路径
   */
  constructor(private directoryPath: string) {}

  /**
   * 获取目录下的文件夹和文件结构
   * @returns FolderStructure 对象，包含文件夹和文件的数组
   */
  async getFolderStructure(): Promise<FolderStructure> {
    try {
      const files = await fs.readdir(this.directoryPath, { withFileTypes: true });
      const folderStructure: FolderStructure = { folders: [], files: [] };

      for (const file of files) {
        if (file.isDirectory()) {
          folderStructure.folders.push(file.name);
        } else {
          folderStructure.files.push(file.name);
        }
      }

      return folderStructure;
    } catch (error) {
      throw new Error(`Error reading directory: ${error.message}`);
    }
  }

  /**
   * 整理文件夹结构
   * 将所有文件移动到一个名为 'files' 的文件夹中，保留原始文件夹结构
   * @returns 整理后的文件夹结构
   */
  async organizeStructure(): Promise<FolderStructure> {
    try {
      const folderStructure = await this.getFolderStructure();
      const filesDir = path.join(this.directoryPath, 'files');
      await fs.mkdir(filesDir);

      for (const file of folderStructure.files) {
        const source = path.join(this.directoryPath, file);
        const destination = path.join(filesDir, file);
        await fs.rename(source, destination);
      }

      return folderStructure;
    } catch (error) {
      throw new Error(`Error organizing structure: ${error.message}`);
    }
  }
}

// 示例用法
const organizer = new FolderStructureOrganizer('./example-directory');
organizer.organizeStructure()
  .then((structure) => {
    console.log('Folder structure organized:', structure);
  }).catch((error) => {
    console.error('Error organizing folder structure:', error);
  });