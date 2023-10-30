import { HttpVerb } from '../enums/http-verbs.enum';

export interface FetchConfig {
  type: HttpVerb | undefined;
  url: string | undefined;
}
