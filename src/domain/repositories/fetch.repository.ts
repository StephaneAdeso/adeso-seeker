import { Observable } from 'rxjs';
import { FetchConfig, FetchResponse } from '../interfaces/fetch.interface';

export interface FetchRepository {
  //TODO: correct the types and document this like the persistence repo
  execute(queryConfig: FetchConfig): Observable<FetchResponse>;

  //TODO: verify is need and implement or remove
  /** Have to be executed before all other methods */
  loadInterceptors(): void;
}
