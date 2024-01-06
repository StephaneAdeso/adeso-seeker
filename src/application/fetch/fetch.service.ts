import { Observable } from 'rxjs';
import { FetchConfig } from '../../domain/interfaces/fetch.interface';
import { AxiosAdapter as Adapter } from '../../infrastructure/fetch/axios.adapter';
import { QueryResult } from '../../domain/models/query-result.model';

export class FetchService {
  private static instance: FetchService | null = null;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new FetchService();
    }
    return this.instance;
  }

  execute(queryConfig: FetchConfig): Observable<QueryResult> {
    return new Adapter().execute(queryConfig);
  }
}
