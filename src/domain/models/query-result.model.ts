/** History item of a specific query */
export class QueryResult {
  data: any;
  status: number | null;
  statusText: string;
  headers: any;
  config: any;
  request: any;
  startDate: Date | null;
  endDate: Date | null;

  constructor(
    headers: any,
    data: any,
    startDate: Date | null = null,
    endDate: Date | null = null,
    status: number | null = null,
    statusText: string = ''
  ) {
    this.data = data;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.statusText = statusText;
    this.headers = headers;
  }
}
