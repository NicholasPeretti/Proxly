import Cache from '../../entities/Cache'
import Middleware from '../../entities/Middleware'
import ProxyRequest from '../../entities/ProxyRequest'
import replyWithError from '../replyWithError'
import { Forward, Reply } from '../handleRequest'

export default async function cacheOnly(
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
  } else {
    const response = new ProxyRequest({
      headers: {
        status: 404
      }
    })
    return reply(response)
  }
}
