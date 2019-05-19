import ProxyRequest from '../ProxyRequest'

type Matcher = (request: ProxyRequest) => boolean
type getRequestCacheKey = (request: ProxyRequest) => string
type shouldResponseBeCached = (request: ProxyRequest) => boolean

/**
 * Object representing the middleware.
 * Given a matcher function, the middleware will be execute against the
 * current request if the mathcher returns true.
 * Caching and forwording are up to the middleware
 */
class Middleware {
  private _matcher: Matcher
  private _getRequestCacheKey: getRequestCacheKey
  private _shouldResponseBeCached: shouldResponseBeCached

  constructor(config: {
    matcher: Matcher
    getRequestCacheKey: getRequestCacheKey
    shouldResponseBeCached: shouldResponseBeCached
  }) {
    const { matcher, getRequestCacheKey, shouldResponseBeCached } = config

    this._matcher = matcher
    this._getRequestCacheKey = getRequestCacheKey
    this._shouldResponseBeCached = shouldResponseBeCached
  }

  getRequestCacheKey(request: ProxyRequest): string {
    return this._getRequestCacheKey(request)
  }

  /**
   * Should it have access to the cache? Maybe I want to implement
   * some kind of cache overwriting in the hook
   */
  shouldResponseBeCached(request: ProxyRequest): boolean {
    return this._shouldResponseBeCached(request)
  }

  match(request: ProxyRequest): boolean {
    return this._matcher(request)
  }
}

export default Middleware
