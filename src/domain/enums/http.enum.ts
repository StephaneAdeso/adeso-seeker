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

export const HttpStatusCodes = [
  {
    code: 100,
    title: 'Continue - Informational',
    description:
      'The server has received the request headers, and the client should proceed to send the request body.'
  },
  {
    code: 101,
    title: 'Switching Protocols - Informational',
    description: 'The requester has asked the server to switch protocols.'
  },
  {
    code: 200,
    title: 'OK - Success',
    description: 'The request was successful.'
  },
  {
    code: 201,
    title: 'Created - Success',
    description:
      'The request was successful and a resource was created as a result.'
  },
  {
    code: 202,
    title: 'Accepted - Success',
    description:
      'The request has been accepted for processing, but the processing has not been completed.'
  },
  {
    code: 204,
    title: 'No Content - Success',
    description:
      "The request has succeeded, but the client doesn't need to navigate away from its current page."
  },
  {
    code: 300,
    title: 'Multiple Choices - Redirection',
    description: 'The requested resource is available at multiple locations.'
  },
  {
    code: 301,
    title: 'Moved Permanently - Redirection',
    description: 'The resource has permanently moved to a new location.'
  },
  {
    code: 302,
    title: 'Moved Temporarily - Redirection',
    description:
      'The resource requested has been temporarily moved to the URL given by the Location header.'
  },
  {
    code: 303,
    title: 'Moved Temporarily - Redirection',
    description:
      "The redirects don't link to the requested resource itself, but to another page (such as a confirmation page, a representation of a real-world object or an upload-progress page)."
  },
  {
    code: 304,
    title: 'Not Modified - Redirection',
    description: 'There is no need to retransmit the requested resources..'
  },
  {
    code: 400,
    title: 'Bad Request - Client Error',
    description:
      'The server could not understand the request due to invalid syntax.'
  },
  {
    code: 401,
    title: 'Unauthorized - Client Error',
    description:
      'The client must authenticate itself to get the requested response.'
  },
  {
    code: 403,
    title: 'Forbidden - Client Error',
    description: 'The client does not have access rights to the content.'
  },
  {
    code: 404,
    title: 'Not Found - Client Error',
    description: 'The server can not find the requested resource.'
  },
  {
    code: 500,
    title: 'Internal Server Error - Server Error',
    description:
      'The server encountered an internal error and was unable to complete your request.'
  },
  {
    code: 501,
    title: 'Not Implemented - Server Error',
    description:
      'The server does not support the functionality required to fulfill the request.'
  },
  {
    code: 502,
    title: 'Bad Gateway - Server Error',
    description:
      'The server, while acting as a gateway or proxy, received an invalid response from the upstream server (might refer to different things in networking).'
  },
  {
    code: 503,
    title: 'Service Unavailable - Server Error',
    description: 'The server is not ready to handle the request.'
  }
];

export const SatusRanges = [
  { max: 100, title: 'Unknown', description: 'Unknown status code' },
  {
    max: 200,
    title: '1xx - Informational',
    description: 'Not used, but reserved for future use.'
  },
  {
    max: 300,
    title: '2xx - Success',
    description:
      'Success - The action was successfully received, understood, and accepted'
  },
  {
    max: 400,
    title: '3xx - Redirection',
    description: 'Further action must be taken in order to complete the request'
  },
  {
    max: 500,
    title: '4xx - Client Error',
    description: 'The request contains bad syntax or cannot be fulfilled'
  },
  {
    max: 600,
    title: '5xx - Server Error',
    description: 'The server failed to fulfill an apparently valid request'
  },
  { max: Infinity, title: 'Unknown', description: 'Unknown status code' }
];
