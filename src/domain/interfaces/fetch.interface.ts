import { HttpVerb } from '../enums/http-verbs.enum';

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
}
