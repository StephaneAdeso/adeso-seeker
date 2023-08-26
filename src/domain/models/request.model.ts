import { randomUUID } from 'crypto';
import { HttpVerb } from '../enums/http-verbs.enum';
import { TreeStructure } from '../interfaces/tree-structure.interface';


export class Request implements TreeStructure {

    private _uuid: string = randomUUID();
    name: string = '';
    description: string = '';
    url: string = '';
    type: HttpVerb = HttpVerb.get;
    body: string = '';
    queryParams: Map<string, string> = new Map();
    headers: Map<string, string> = new Map();
    auth: string = '';
    tests: string = '';
    preRun: string = '';

    constructor() { }

    get uuid() {
        return this._uuid;
    }


}