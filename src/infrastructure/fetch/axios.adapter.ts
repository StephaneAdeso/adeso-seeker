import axios from 'axios';
import { Observable, from, map, of } from 'rxjs';
import {
  FetchConfig,
  FetchResponse
} from '../../domain/interfaces/fetch.interface';
import { FetchRepository } from '../../domain/repositories/fetch.repository';

let response: FetchResponse = {
  config: {},
  data: {},
  headers: null,
  request: null,
  status: 400,
  statusText: 'Bad Request'
};

export class AxiosAdapter implements FetchRepository {
  execute(queryConfig: FetchConfig): Observable<FetchResponse> {
    if (!queryConfig.url) {
      return of(response);
    }
    return from(
      axios<any, FetchResponse>({
        method: queryConfig.method,
        url: queryConfig.url,
        signal: queryConfig?.controller.signal
      })
    ).pipe(
      map((res) => {
        response = res;
        return response;
      })
    );
  }
}
