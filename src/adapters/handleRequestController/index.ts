import ProxyRequest, { HTTP_METHOD } from '../../entities/ProxyRequest'
import Middleware from '../../entities/Middleware'
import getMatchingMiddleware from '../../useCases/getMatchingMiddleware'
import handleRequest, { Forward } from '../../useCases/handleRequest'
import Cache from '../../entities/Cache'
import { Request, Response } from 'express'
import Configuration from '../../entities/Configuration'

export default function handleRequestController(
  request: Request,
  response: Response,
  forward: Forward,
  middlewares: Array<Middleware>,
  cache: Cache,
  config: Configuration
): Promise<void> {
  const proxyRequest = new ProxyRequest({
    url: request.url,
    method: HTTP_METHOD[request.method],
    headers: request.headers,
    body: request.body
  })
  const targetUrl = config.getTargetUrl() + proxyRequest.getUrl()
  proxyRequest.setTargetUrl(targetUrl)

  const middleware = getMatchingMiddleware(proxyRequest, middlewares)

  return handleRequest(
    proxyRequest,
    middleware,
    cache,
    forward,
    function reply(req: ProxyRequest) {
      const headers = req.getHeaders()
      for (var header in headers) {
        if (header === 'status') {
          response.status(headers[header])
        } else {
          response.set(header, headers[header])
        }
      }

      return response.send(req.getBody()).end()
    },
    config
  )
}
