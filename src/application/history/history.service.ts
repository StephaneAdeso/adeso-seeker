import { Query } from '../../domain/models/query.model';

export class HistoryService {
  private history: Query[] = [];

  /**
   * @returns a copy of the history
   */
  getHistory(): Query[] {
    return structuredClone(this.history);
  }

  /**
   * Add 1 or more queries to the history at the same time.
   * @param queries
   */
  add(...queries: Query[]): void {
    this.history.unshift(...queries);
    //TODO: check if we need to reverse or order the queries when we receive more than 1
    //TODO: check the lenth of thehistory. dont let it go further that 15.
    //TODO: if query already exist in the history, update the position
  }

  /**
   * Clear all the history removing all the items
   */
  clearHistory(): void {
    this.history.length = 0;
  }

  /**
   * Returns a filtered history (list of Query)
   * @param text
   * @returns filtered history
   */
  filter(text: string): Query[] {
    return this.history.filter((query) => {
      return (
        query.url.includes(text) ||
        query.description.includes(text) ||
        query.name.includes(text)
      );
    });
  }
}
