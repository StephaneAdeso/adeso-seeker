import { Observable } from 'rxjs';
import { FetchConfig } from '../interfaces/fetch.interface';
import { QueryResult } from '../models/query-result.model';

export interface FetchRepository {
  //TODO: correct the types and document this like the persistence repo
  execute(queryConfig: FetchConfig): Observable<QueryResult>;

  //TODO: verify if need and implement or remove
  /** Have to be executed before all other methods */
  loadInterceptors(): void;
}
