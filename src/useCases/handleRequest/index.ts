import ProxyRequest from '../../entities/ProxyRequest'
import Middleware from '../../entities/Middleware'
import Cache from '../../entities/Cache'

type Forward = (request: ProxyRequest) => Promise<ProxyRequest>
type Reply = (response: ProxyRequest) => void

export default async function handleRequest(
  request: ProxyRequest,
  middleware: Middleware,
  cache: Cache,
  forward: Forward,
  reply: Reply
): Promise<void> {
  const requestKey = middleware.getRequestCacheKey(request)
  const cachedResponse = cache.get(requestKey)

  if (cachedResponse) {
    return reply(cachedResponse)
  }

  const response = await forward(request)

  if (middleware.shouldResponseBeCached(response)) {
    cache.set(requestKey, response)
  }

  return reply(response)
}
