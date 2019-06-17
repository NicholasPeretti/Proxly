import Cache from '../../entities/Cache'
import Middleware from '../../entities/Middleware'
import ProxyRequest from '../../entities/ProxyRequest'
import replyWithError from '../replyWithError'
import { Forward, Reply } from '../handleRequest'

export default async function networkOnly(
  request: ProxyRequest,
  middleware: Middleware,
  cache: Cache,
  forward: Forward,
  reply: Reply
) {
  const requestKey = middleware.getRequestCacheKey(request)

  let response = null
  try {
    response = await forward(request)
  } catch (e) {
    console.error('An error occurred while forwarding the request', e)
    return replyWithError(reply, e)
  }

  if (middleware.shouldResponseBeCached(response)) {
    cache.set(requestKey, response)
  }

  return reply(response)
}
