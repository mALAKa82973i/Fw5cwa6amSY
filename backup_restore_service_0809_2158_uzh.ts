// 代码生成时间: 2025-08-09 21:58:31
import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import * as util from 'util';
import { promisify } from 'util';

// Promisify zlib.gzip and zlib.unzip for use with async/await
const gzip = promisify(zlib.gzip);
const unzip = promisify(zlib.unzip);

@Injectable()
export class BackupRestoreService {
  // Backup data to a gzipped file
  async backupData(data: any, filePath: string): Promise<void> {
    try {
      const backupData = await gzip(JSON.stringify(data));
      await this.writeFile(filePath, backupData);
    } catch (error) {
      throw new ApolloError('Backup failed', 'BACKUP_FAILED', error);
    }
  }

  // Recover data from a gzipped file
  async restoreData(filePath: string): Promise<any> {
    try {
      const data = await this.readFile(filePath);
      return JSON.parse(await unzip(data));
    } catch (error) {
      throw new ApolloError('Restore failed', 'RESTORE_FAILED', error);
    }
  }

  // Helper method to write data to a file
  private async writeFile(filePath: string, data: Buffer): Promise<void> {
    return util.promisify(fs.writeFile)(filePath, data);
  }

  // Helper method to read data from a file
  private async readFile(filePath: string): Promise<Buffer> {
    return util.promisify(fs.readFile)(filePath);
  }

  // Helper method to check if a file exists
  private async fileExists(filePath: string): Promise<boolean> {
    return util.promisify(fs.exists)(filePath);
  }
}
