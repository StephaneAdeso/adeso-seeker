import { Query } from '../models/query.model';

/** Used to type the query configuration object that will be used
 * by the query engine like axios or any other.
 */
export interface FetchConfig {
  query: Query;
  abortController: AbortController;
}
