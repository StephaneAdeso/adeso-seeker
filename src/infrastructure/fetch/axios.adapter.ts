import axios from 'axios';
import { Observable, from, map, of } from 'rxjs';
import {
  FetchConfig,
  FetchResponse
} from '../../domain/interfaces/fetch.interface';
import { FetchRepository } from '../../domain/repositories/fetch.repository';
import { UtilityService } from '../../application/common/util.service';

let response: FetchResponse = {
  config: {},
  data: {},
  headers: null,
  request: null,
  status: 400,
  statusText: 'Missing url field',
  startDate: undefined,
  endDate: undefined,
  size: {
    length: 0,
    measure: 'bytes'
  },
  queryDuration: {
    time: 0,
    measure: 'ms'
  }
};

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

  execute(queryConfig: FetchConfig): Observable<FetchResponse> {
    if (!queryConfig.url) {
      return of(response);
    }

    const startDate = new Date();

    return from(
      axios({
        method: queryConfig.method,
        url: queryConfig.url,
        signal: queryConfig?.controller.signal
      })
    ).pipe(
      map((res) => {
        const now = new Date();
        const ellapsedTime = UtilityService.getEllapsedTime(now, startDate, 4);

        response.data = res.data;
        response.status = res.status;
        response.headers = res.headers;
        response.config = res.config;
        if (res.request) {
          response.request = res.request;
        }
        response.startDate = startDate;
        response.endDate = now;
        response.queryDuration = {
          time: ellapsedTime.calculatedTime,
          measure: ellapsedTime.calculatedMeasure
        };

        response.size = {
          length: UtilityService.getByteSize(JSON.stringify(res.data), 2)
            .calculatedSize,
          measure: UtilityService.getByteSize(JSON.stringify(res.data), 2)
            .calculatedMesure
        };

        return response;
      })
    );
  }
}
