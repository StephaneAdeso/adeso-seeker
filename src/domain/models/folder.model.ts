import { randomUUID } from "crypto";
import { TreeStructure } from "../interfaces/tree-structure.interface";
import { Request } from "./request.model";

export class Folder implements TreeStructure {
    private _uuid: string = randomUUID();
    name: string = '';
    items: (Folder | Request)[] = [];

    constructor() { }

    get uuid() {
        return this._uuid;
    }

}