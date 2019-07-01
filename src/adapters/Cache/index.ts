import ProxyRequest from '../../entities/ProxyRequest'
import Cache from '../../entities/Cache'

export default class CacheAdapter {
  private cache: Cache

  constructor(cache: Cache) {
    this.cache = cache
  }

  set(key: string, request: ProxyRequest): void {
    const stringifiedRequest = request.toString()
    this.cache.set(key, stringifiedRequest)
  }

  get(key: string): ProxyRequest | void {
    const stringifiedRequest = this.cache.get(key)
    if (!stringifiedRequest) return

    try {
      return new ProxyRequest(stringifiedRequest)
    } catch (e) {
      console.warn(
        'Cannot parse the following value from cache',
        stringifiedRequest,
        e
      )
      return
    }
  }
}
