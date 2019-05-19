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
  private body: object
  private headers: object

  //  Forwarding request properties
  private target_url: string
  private target_body: object
  private target_headers: object

  constructor(config?: {
    url?: string
    body?: object
    headers?: object
    method?: HTTP_METHOD
  }) {
    config = config || {}

    this.method = config.method || HTTP_METHOD.GET
    this.url = config.url
    this.body = config.body
    this.headers = config.headers || {}

    this.target_url = this.url
    this.target_body = this.body
    this.target_headers = this.headers
  }

  //  Request getters
  getUrl(): string {
    return this.url
  }

  getMethod(): HTTP_METHOD {
    return this.method
  }

  getBody(): object {
    return this.body
  }

  getHeaders(): object {
    return this.headers
  }

  //  Target getters
  getTargetUrl(): string {
    return this.target_url
  }

  getTargetBody(): object {
    return this.target_body
  }

  getTargetHeaders(): object {
    return this.target_headers
  }

  //  Target setters
  setTargetUrl(url: string): void {
    this.target_url = url
  }

  setTargetBody(body: object): void {
    this.target_body = { ...body }
  }

  setTargetHeaders(headers: object): void {
    this.target_headers = { ...headers }
  }
}

export default ProxyRequest
