import ProxyRequest, { HTTP_METHOD } from '../../entities/ProxyRequest'
import Middleware from '../../entities/Middleware'
import getMatchingMiddleware from '../../useCases/getMatchingMiddleware'
import handleRequest, { Forward } from '../../useCases/handleRequest'
import Cache from '../../entities/Cache'
import { Request, Response } from 'express'

export default function handleRequestController(
  request: Request,
  response: Response,
  forward: Forward,
  middlewares: Array<Middleware>,
  cache: Cache
): Promise<void> {
  const proxyRequest = new ProxyRequest({
    url: request.url,
    method: HTTP_METHOD[request.method],
    headers: request.headers,
    body: request.body
  })
  proxyRequest.setTargetUrl(process.env.TARGET_URL)

  const middleware = getMatchingMiddleware(proxyRequest, middlewares)

  return handleRequest(proxyRequest, middleware, cache, forward, function reply(
    req: ProxyRequest
  ) {
    const headers = req.getHeaders()
    for (var header in headers) {
      if (header === 'status') {
        response.status(headers[header])
      } else {
        response.set(header, headers[header])
      }
    }

    return response.end(req.getBody())
  })
}
