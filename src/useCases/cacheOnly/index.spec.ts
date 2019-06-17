import cacheOnly from './index'
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

const callCacheOnly = () => {
  cacheOnly(MOCK_REQUEST, MOCK_MIDDLEWARE, MOCK_CACHE, MOCK_FORWARD, MOCK_REPLY)
}

describe('cacheOnly', () => {
  beforeEach(() => {
    MOCK_REQUEST = new ProxyRequest()
    MOCK_GET_REQUEST_KEY = jest.fn().mockReturnValue('req_key')
    MOCK_MIDDLEWARE = new Middleware({
      matcher: jest.fn().mockReturnValue(true),
      getRequestCacheKey: MOCK_GET_REQUEST_KEY,
      shouldResponseBeCached: jest.fn().mockReturnValue(true)
    })
    MOCK_CACHE_GETTER = jest.fn()
    MOCK_CACHE_SETTER = jest.fn()
    MOCK_CACHE = new Cache({
      setter: MOCK_CACHE_SETTER,
      getter: MOCK_CACHE_GETTER
    })
    MOCK_FORWARD = jest.fn().mockResolvedValue(MOCK_REQUEST)
    MOCK_REPLY = jest.fn()
  })

  it('should export a function', () => {
    expect(typeof cacheOnly).toBe('function')
  })

  it('should call `middleware.getRequestKey`', () => {
    callCacheOnly()
    expect(MOCK_GET_REQUEST_KEY).toHaveBeenCalledTimes(1)
  })

  it('should use `cache.get` to get the cached response', () => {
    callCacheOnly()
    expect(MOCK_CACHE_GETTER).toHaveBeenCalledTimes(1)
  })

  describe('if there is a cached response', () => {
    beforeEach(() => {
      MOCK_CACHE_GETTER = jest.fn().mockReturnValue(1)
      MOCK_CACHE_SETTER = jest.fn()
      MOCK_CACHE = new Cache({
        setter: MOCK_CACHE_SETTER,
        getter: MOCK_CACHE_GETTER
      })
    })

    it('should call the reply function', () => {
      callCacheOnly()
      expect(MOCK_REPLY).toHaveBeenCalledTimes(1)
    })
  })

  describe('if there is NOT a cached response', () => {
    beforeEach(() => {
      MOCK_CACHE_GETTER = jest.fn().mockReturnValue(undefined)
      MOCK_CACHE_SETTER = jest.fn()
      MOCK_CACHE = new Cache({
        setter: MOCK_CACHE_SETTER,
        getter: MOCK_CACHE_GETTER
      })
    })

    it('should call the reply function', () => {
      callCacheOnly()
      expect(MOCK_REPLY).toHaveBeenCalledTimes(1)
    })
  })
})
