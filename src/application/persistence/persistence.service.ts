import * as vscode from 'vscode';
import { LowDbAdapter } from '../../infrastructure/persistence/lowdb.adapter';
import * as fs from 'fs';

const repository = LowDbAdapter.getInstance();

export class PersistanceService {
  private static instance: PersistanceService | null = null;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new PersistanceService();
    }
    return this.instance;
  }

  initService(context: vscode.ExtensionContext) {
    this.createGlobalStorageFolder(context.globalStorageUri.fsPath);
    repository.initDB(context.globalStorageUri.fsPath);
  }

  /**
   * Check if the global storage folder exist in host and create it if it doesn't exist.
   * @param globalStoragePath
   */
  private createGlobalStorageFolder(globalStoragePath: string): void {
    if (!fs.existsSync(globalStoragePath)) {
      try {
        fs.mkdirSync(globalStoragePath);
      } catch (error) {
        console.error(
          `Unable to create global storage folder. Error: ${error}`
        );
      }
    }
  }
}
