import ProxyRequest from '../../entities/ProxyRequest'
import Middleware from '../../entities/Middleware'
import defaultMiddleware from './defaultMiddleware'

export default function getMatchingMiddleware(
  request: ProxyRequest,
  middlewares?: Array<Middleware>
): Middleware {
  if (!middlewares || !middlewares.length) {
    return defaultMiddleware
  }

  const matchingMiddleware = middlewares.find(middleware =>
    middleware.match(request)
  )

  return matchingMiddleware || defaultMiddleware
}
