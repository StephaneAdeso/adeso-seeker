import axios from 'axios';
import { Observable, from, map, of } from 'rxjs';
import {
  FetchConfig,
  FetchResponse
} from '../../domain/interfaces/fetch.interface';
import { FetchRepository } from '../../domain/repositories/fetch.repository';

const response: FetchResponse = {
  config: {},
  data: '',
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
      axios({ method: queryConfig.method, url: queryConfig.url })
    ).pipe(
      map((res) => {
        console.log('res :>> ', res);
        response.config = res.config;
        response.data = res.data;
        response.headers = res.headers;
        response.request = res.request;
        response.status = res.status;
        response.statusText = res.statusText;
        console.log('response :>> ', response);
        return response;
      })
    );
  }
}
