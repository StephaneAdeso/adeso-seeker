export interface PersistenceRepository {
  /**
   * Create or read existing database.
   * @param dbName name of the database to check if exist or create.
   */
  initDB(globalStoragePath: string): void;

  /**
   * Backup the Sqlite database to a path.
   * @param backupPath
   */
  backupDB(backupPath: string): void;

  /**
   * Destroy the database file
   * @param backupPath
   */
  dropDB(backupPath: string): void;

  /**
   * Execute migration files (SQL files)
   * @param filePaths
   */
  loadMigrations(filePaths: string[]): void;
}
