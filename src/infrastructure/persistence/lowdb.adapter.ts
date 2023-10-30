/* eslint-disable no-unused-vars */
// This adapter stores the info in json files.
// https://github.com/typicode/lowdb
// https://www.youtube.com/watch?v=5KjLpaZW4s8
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import path from 'path';
import { PersistenceRepository } from '../../domain/repositories/persistence.repository';
import { Environment } from '../../domain/models/environment.model';
import { Collection } from '../../domain/models/collection.model';

//TODO: Check if it's necesary to use singleton in adapters
type SeekerDb = {
  environments: Environment[];
  collections: Collection[];
};

export class LowDbAdapter implements PersistenceRepository {
  private static instance: LowDbAdapter | null = null;

  private globalStoragePath: string | null = null;

  // RequestDB
  private seekerDbName = 'SeekerDB.json';
  private seekerDbPath: string | null = null;
  private seekerDB: LowSync<SeekerDb> | null = null;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new LowDbAdapter();
    }
    return this.instance;
  }

  initDB(globalStoragePath: string): void {
    this.globalStoragePath = globalStoragePath;

    this.seekerDbPath = path.join(globalStoragePath, this.seekerDbName);

    try {
      // Create or connect to the database
      const defaultData: SeekerDb = { environments: [], collections: [] };
      this.seekerDB = new LowSync<SeekerDb>(
        new JSONFileSync<SeekerDb>(this.seekerDbPath),
        defaultData
      );
      this.seekerDB.write();
    } catch (error) {
      console.log(
        `Error creating database: ${this.seekerDbName}.json ...  error: ${error}`
      );
    }
  }

  backupDB(backupPath: string): void {}

  loadMigrations(filePaths: string[]): void {}

  dropDB(backupPath: string): void {}
}
