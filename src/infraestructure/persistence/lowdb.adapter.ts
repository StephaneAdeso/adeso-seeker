// This adapter stores the info in json files.
// https://github.com/typicode/lowdb
// https://www.youtube.com/watch?v=5KjLpaZW4s8
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import path from 'path';
import { PersistenceRepository } from './persistence.repository';
import { Environment } from '../../domain/models/environment.model';
import { Collection } from '../../domain/models/collection.model';

type SeekerDb = {
  environments: Environment[];
  collections: Collection[];
};

export class LowDbAdapter implements PersistenceRepository {
  private static instance: LowDbAdapter | null = null;

  private globalStoragePath: string | null = null;

  // RequestDB
  private requestDbName = 'requestDB.json';
  private requestDbPath: string | null = null;
  private requestDB: LowSync<SeekerDb> | null = null;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new LowDbAdapter();
    }
    return this.instance;
  }

  initDB(globalStoragePath: string): void {
    this.globalStoragePath = globalStoragePath;

    this.requestDbPath = path.join(globalStoragePath, this.requestDbName);

    try {
      // Create or connect to the database
      const defaultData: SeekerDb = { environments: [], collections: [] };
      this.requestDB = new LowSync<SeekerDb>(
        new JSONFileSync<SeekerDb>(this.requestDbPath),
        defaultData
      );
      this.requestDB.write();
    } catch (error) {
      console.log(
        `Error creating database: ${this.requestDbName}.json ...  error: ${error}`
      );
    }
  }

  backupDB(backupPath: string): void {}

  loadMigrations(filePaths: string[]): void {}

  dropDB(backupPath: string): void {}
}
