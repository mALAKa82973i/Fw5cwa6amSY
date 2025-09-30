// 代码生成时间: 2025-10-01 02:45:23
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { promisify } from 'util';
import { access, mkdir, readdir, readFile, writeFile } from 'fs/promises';

// 异步版本的方法，使用promisify将fs中的同步方法转换为异步方法
const asyncMkdir = promisify(mkdir);
const asyncReaddir = promisify(readdir);
const asyncReadFile = promisify(readFile);
const asyncWriteFile = promisify(writeFile);

// 定义一个接口，描述文件结构
interface FolderStructure {
    [name: string]: FolderStructure | string[];
}

// 定义程序的主类
class FolderStructureOrganizer {
    private rootPath: string;

    constructor(rootPath: string) {
        this.rootPath = rootPath;
    }

    // 同步获取文件夹结构
    public async getFolderStructure(): Promise<FolderStructure> {
        try {
            const items = await asyncReaddir(this.rootPath);
            const folderStructure: FolderStructure = {};

            for (const item of items) {
                const fullPath = join(this.rootPath, item);
                if (await this.isDirectory(fullPath)) {
                    folderStructure[item] = await this.getFolderStructure(fullPath);
                } else {
                    folderStructure[item] = [];
                }
            }

            return folderStructure;
        } catch (error) {
            console.error('Error reading directory:', error);
            throw error;
        }
    }

    // 检查路径是否为目录
    private async isDirectory(path: string): Promise<boolean> {
        try {
            await access(path, (const_mode) => 0); // 使用access方法检查路径是否可访问
            return (await readdir(path)).length > 0;
        } catch {
            return false;
        }
    }

    // 同步创建文件夹结构
    public async organizeStructure(structure: FolderStructure, path: string = this.rootPath): Promise<void> {
        try {
            for (const [name, content] of Object.entries(structure)) {
                const fullPath = join(path, name);
                if (typeof content === 'object') {
                    await asyncMkdir(fullPath, { recursive: true });
                    await this.organizeStructure(content, fullPath);
                }
            }
        } catch (error) {
            console.error('Error organizing folder structure:', error);
            throw error;
        }
    }
}

// 使用示例
(async () => {
    const rootPath = './exampleFolder'; // 设置你的根目录路径
    const organizer = new FolderStructureOrganizer(rootPath);
    try {
        const folderStructure = await organizer.getFolderStructure();
        console.log('Folder Structure:', folderStructure);
        await organizer.organizeStructure(folderStructure);
        console.log('Folder structure organized.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();