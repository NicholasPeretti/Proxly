import cachePreferred from './index'
import ProxyRequest from '../../entities/ProxyRequest'
import Middleware from '../../entities/Middleware'
import Cache from '../../entities/Cache'

let MOCK_REQUEST = new ProxyRequest()
let MOCK_GET_REQUEST_KEY = jest.fn().mockReturnValue('req_key')
let MOCK_MIDDLEWARE = new Middleware({
  matcher: jest.fn().mockReturnValue(true),
  getRequestCacheKey: MOCK_GET_REQUEST_KEY,
  shouldResponseBeCached: jest.fn().mockReturnValue(true)
})
let MOCK_CACHE_GETTER = jest.fn()
let MOCK_CACHE_SETTER = jest.fn()
let MOCK_CACHE = new Cache({
  setter: MOCK_CACHE_SETTER,
  getter: MOCK_CACHE_GETTER
})
let MOCK_FORWARD = jest.fn().mockResolvedValue(MOCK_REQUEST)
let MOCK_REPLY = jest.fn()

const callCachePreferred = () => {
  cachePreferred(
    MOCK_REQUEST,
    MOCK_MIDDLEWARE,
    MOCK_CACHE,
    MOCK_FORWARD,
    MOCK_REPLY
  )
}

describe('cachePreferred', () => {
  beforeEach(() => {
    MOCK_GET_REQUEST_KEY.mockClear()
    MOCK_CACHE_GETTER.mockClear()
    MOCK_CACHE_SETTER.mockClear()
    MOCK_FORWARD.mockClear()
    MOCK_REPLY.mockClear()
  })

  it('should be a function', () => {
    expect(typeof cachePreferred).toBe('function')
  })
  it('should call `cache.get` to get the cached response', () => {
    callCachePreferred()
    expect(MOCK_CACHE_GETTER).toHaveBeenCalledTimes(1)
  })
  it('should call `reply` if there is a cached response', () => {
    MOCK_CACHE_GETTER = jest.fn().mockReturnValue(1)
    MOCK_CACHE_SETTER = jest.fn()
    MOCK_CACHE = new Cache({
      setter: MOCK_CACHE_SETTER,
      getter: MOCK_CACHE_GETTER
    })
    callCachePreferred()
    expect(MOCK_REPLY).toHaveBeenCalledTimes(1)
  })
  it('should call `forward` if there is a cached response', () => {
    MOCK_CACHE_GETTER = jest.fn().mockReturnValue(undefined)
    MOCK_CACHE_SETTER = jest.fn()
    MOCK_CACHE = new Cache({
      setter: MOCK_CACHE_SETTER,
      getter: MOCK_CACHE_GETTER
    })
    callCachePreferred()
    expect(MOCK_FORWARD).toHaveBeenCalledTimes(1)
  })
})
