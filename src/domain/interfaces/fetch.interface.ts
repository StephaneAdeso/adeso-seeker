import {
  BytesMeasures,
  TimeMeasures
} from '../../application/common/util.service';
import { HttpVerb } from '../enums/http.enum';

export interface FetchConfig {
  method: HttpVerb;
  url: string;
  controller: AbortController;
}

export interface FetchResponse {
  data: object;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
  startDate: Date | undefined;
  endDate: Date | undefined;
  size: FetchByteSize;
  /** duration of the query in seconds */
  queryDuration: FetchEllapsedTime;
}

export interface FetchByteSize {
  /** length of the response body */
  length: number;
  measure: BytesMeasures;
}
export interface FetchEllapsedTime {
  time: number;
  measure: TimeMeasures;
}
