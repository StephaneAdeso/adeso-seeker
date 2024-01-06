import { Query } from '../../domain/models/query.model';

export class Store {
  private static instance: Store | null = null;
  private actualQuery: Query | null = null;
  private globalHistory: Query[] = [];

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Store();
    }
    return this.instance;
  }

  /**
   *
   * @returns A copy of theactual query or null if empty
   */
  getActualQuery(): Query | null {
    return this.actualQuery ? structuredClone(this.actualQuery) : null;
  }

  setActualQuery(newQuery: Query): void {
    this.actualQuery = newQuery;
  }

  /**
   *
   * @returns A copy of the global history
   */
  getGlobalHistory(): Query[] {
    return structuredClone(this.globalHistory);
  }

  /**
   * Add the Query at the beginining of the globalHistory list
   * @param query
   */
  addToGlobalHistory(query: Query): void {
    this.globalHistory.unshift(query);
  }
}
