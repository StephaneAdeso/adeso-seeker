import { randomUUID } from "crypto";
import { TreeStructure } from "../interfaces/tree-structure.interface";


export class Environment implements TreeStructure {
    private _uuid: string = randomUUID();
    name: string = '';
    description: string = '';
    items: Map<string, string> = new Map();


    constructor() { }

    get uuid() {
        return this._uuid;
    }

}