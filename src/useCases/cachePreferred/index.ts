import Cache from '../../entities/Cache'
import Middleware from '../../entities/Middleware'
import ProxyRequest from '../../entities/ProxyRequest'
import { Forward, Reply } from '../handleRequest'
import networkOnly from '../networkOnly'

export default async function cachePreferred(
  request: ProxyRequest,
  middleware: Middleware,
  cache: Cache,
  forward: Forward,
  reply: Reply
) {
  const requestKey = middleware.getRequestCacheKey(request)
  const cachedResponse = cache.get(requestKey)

  if (cachedResponse) {
    return reply(cachedResponse)
  }

  return networkOnly(request, middleware, cache, forward, reply)
}
