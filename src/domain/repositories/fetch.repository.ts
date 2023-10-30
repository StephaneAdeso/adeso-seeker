import { FetchConfig } from '../interfaces/fetch.interface';

export interface FetchRepository {
  //TODO: correct the types and document this like the persistence repo
  execute(queryConfig: FetchConfig): any;
}
