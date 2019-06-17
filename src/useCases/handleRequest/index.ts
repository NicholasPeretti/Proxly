import ProxyRequest from '../../entities/ProxyRequest'
import Middleware from '../../entities/Middleware'
import Cache from '../../entities/Cache'
import Configuration, { PROXY_MODE } from '../../entities/Configuration'
import NetworkOnly from '../networkOnly'
import cachePreferred from '../cachePreferred'
import cacheOnly from '../cacheOnly'

export type Forward = (request: ProxyRequest) => Promise<ProxyRequest>
export type Reply = (response: ProxyRequest) => void

export default async function handleRequest(
  request: ProxyRequest,
  middleware: Middleware,
  cache: Cache,
  forward: Forward,
  reply: Reply,
  config: Configuration
): Promise<void> {
  const mode = config.getMode()

  switch (mode) {
    case PROXY_MODE.NETWORK_ONLY: {
      return NetworkOnly(request, middleware, cache, forward, reply)
    }
    case PROXY_MODE.CACHE_PREFERRED: {
      return cachePreferred(request, middleware, cache, forward, reply)
    }
    case PROXY_MODE.CACHE_ONLY: {
      return cacheOnly(request, middleware, cache, forward, reply)
    }
  }
}
