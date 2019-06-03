import ProxyRequest from '../../entities/ProxyRequest'
import Middleware from '../../entities/Middleware'
import Cache from '../../entities/Cache'
import replyWithError from '../replyWithError'

export type Forward = (request: ProxyRequest) => Promise<ProxyRequest>
export type Reply = (response: ProxyRequest) => void

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

/**
 * In here we should just perform a switch case to decide which usecase to run
 * We also should create a usecase for each "mode" of the proxy:
 * - cache only
 * - prioritize cache
 * - prioritize network
 */
