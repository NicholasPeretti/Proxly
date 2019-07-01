export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

/**
 * Object representing the network request.
 * This is an abstraction to be able to receive, process
 * and send requests both from the client and from the proxy target
 */
class ProxyRequest {
  //  Incoming request properties
  private method: HTTP_METHOD
  private url: string
  private body: string
  private headers: object

  //  Forwarding request properties
  private target_url: string
  private target_body: string
  private target_headers: object

  private fromString(stringifiedRequest: string): ProxyRequest {
    const config = JSON.parse(stringifiedRequest)
    return new ProxyRequest(config)
  }

  constructor(
    config?:
      | {
          url?: string
          body?: string | object
          headers?: object
          method?: HTTP_METHOD
        }
      | string
  ) {
    config = config || {}

    if (typeof config === 'string') {
      return this.fromString(config)
    }

    if (typeof config.body === 'string') {
      this.body = config.body
    } else {
      this.body = JSON.stringify(config.body)
    }

    this.method = config.method || HTTP_METHOD.GET
    this.url = config.url
    this.headers = this.getValidHeaders(config.headers)

    this.target_url = this.url
    this.target_body = this.body
    this.target_headers = this.headers
  }

  getValidHeaders(headers = {}) {
    const INVAILD_HEADERS = ['host', 'accept-encoding']
    const validHeaders = {}

    for (var header in headers) {
      if (INVAILD_HEADERS.indexOf(header) < 0) {
        validHeaders[header] = headers[header]
      }
    }

    return validHeaders
  }

  //  Request getters
  getUrl(): string {
    return this.url
  }

  getMethod(): HTTP_METHOD {
    return this.method
  }

  getBody(): string {
    return this.body
  }

  getHeaders(): object {
    return this.headers
  }

  //  Target getters
  getTargetUrl(): string {
    return this.target_url
  }

  getTargetBody(): string {
    return this.target_body
  }

  getTargetHeaders(): object {
    return this.target_headers
  }

  //  Target setters
  setTargetUrl(url: string): void {
    this.target_url = url
  }

  setTargetBody(body: string): void {
    this.target_body = body
  }

  setTargetHeaders(headers: object): void {
    this.target_headers = { ...headers }
  }

  toString(): string {
    return JSON.stringify({
      url: this.getUrl(),
      body: this.getBody(),
      headers: this.getHeaders(),
      method: this.getMethod()
    })
  }
}

export default ProxyRequest
