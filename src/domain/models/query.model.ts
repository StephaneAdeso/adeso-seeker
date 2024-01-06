import { v4 as uuidv4 } from 'uuid';
import { HttpVerb } from '../enums/http.enum';
import { TreeStructure } from '../interfaces/tree-structure.interface';
import { QueryResult } from './query-result.model';

export class Query implements TreeStructure {
  uuid: string = `que-${uuidv4()}`;
  // the Uuid of the folder or collection of this query
  parentUuid: string = '';
  name: string = '';
  description: string = '';
  url: string = '';
  method: HttpVerb = HttpVerb.get;
  body: string = '';
  queryParams: Map<string, string> = new Map();
  headers: Map<string, string> = new Map();
  auth: string = '';
  tests: string = '';
  preRun: string = '';
  history: QueryResult[] = [];

  constructor(url: string, method: HttpVerb) {
    this.url = url;
    this.method = method;
  }
}
