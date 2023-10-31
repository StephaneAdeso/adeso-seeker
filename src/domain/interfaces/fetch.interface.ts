import { HttpVerb } from '../enums/http-verbs.enum';

export interface FetchConfig {
  method: HttpVerb;
  url: string;
}

export interface FetchResponse {
  data: string;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
}
