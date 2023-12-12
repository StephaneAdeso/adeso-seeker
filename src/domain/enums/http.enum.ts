export enum HttpVerb {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete',
  head = 'head',
  options = 'options'
  //connect = 'connect',
  //trace = 'trace',
}

export enum HttpColors {
  /** range: 100 */
  information = '#5a5a5a',
  /** range: 200 */
  success = '#008000',
  /** range: 300 */
  redirection = '#0000d1',
  /** range: 400 */
  clientError = '#b80101',
  /** range: 500 */
  serverError = '#b37d00'
}
