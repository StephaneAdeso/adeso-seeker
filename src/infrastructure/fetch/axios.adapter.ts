import axios, { AxiosResponse } from 'axios';
import { Observable, from, map, of } from 'rxjs';
import { FetchConfig } from '../../domain/interfaces/fetch.interface';
import { QueryResult } from '../../domain/models/query-result.model';
import { FetchRepository } from '../../domain/repositories/fetch.repository';

export class AxiosAdapter implements FetchRepository {
  loadInterceptors(): void {
    // TODO: pending to implement
    // axios.interceptors.request.use(
    //   (config: InternalAxiosRequestConfig<any>) => {
    //     const customConfig = config as CustomAxiosRequestConfig;
    //     // Add startTime to calculate the duration of the request
    //     customConfig.startTime = Date.now();
    //     return config;
    //   }
    // );
  }
  execute(queryConfig: FetchConfig): Observable<QueryResult> {
    if (!queryConfig.query.url) {
      return of(new QueryResult(null, null));
    }

    const startDate = new Date();

    return from(
      axios({
        method: queryConfig.query.method,
        url: queryConfig.query.url,
        signal: queryConfig.abortController.signal
      })
    ).pipe(
      map((res: AxiosResponse<any, any>): QueryResult => {
        const queryResult: QueryResult = new QueryResult(
          res.headers,
          res.data,
          startDate,
          new Date(),
          res.status,
          res?.statusText
        );

        return queryResult;
      })
    );
  }
}
