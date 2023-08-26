import { Request } from "./request.model";

export class HistoryItem {

    request: Request;
    lastExecutedDate: Date;

    constructor(request: Request) {
        this.request = request;
        this.lastExecutedDate = new Date();
    }


}