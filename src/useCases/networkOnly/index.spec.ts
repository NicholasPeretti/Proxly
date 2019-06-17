import networkOnly from './index'
import ProxyRequest from '../../entities/ProxyRequest'
import Middleware from '../../entities/Middleware'
import Cache from '../../entities/Cache'

let MOCK_REQUEST = new ProxyRequest()
let MOCK_GET_REQUEST_KEY = jest.fn().mockReturnValue('req_key')
let MOCK_SHOULD_RESPONSE_BE_CACHED = jest.fn().mockReturnValue(true)
let MOCK_MIDDLEWARE = new Middleware({
  matcher: jest.fn().mockReturnValue(true),
  getRequestCacheKey: MOCK_GET_REQUEST_KEY,
  shouldResponseBeCached: MOCK_SHOULD_RESPONSE_BE_CACHED
})
let MOCK_CACHE_GETTER = jest.fn()
let MOCK_CACHE_SETTER = jest.fn()
let MOCK_CACHE = new Cache({
  setter: MOCK_CACHE_SETTER,
  getter: MOCK_CACHE_GETTER
})
let MOCK_FORWARD = jest.fn().mockResolvedValue(MOCK_REQUEST)
let MOCK_REPLY = jest.fn()

const callNetworkOnly = () => {
  return networkOnly(
    MOCK_REQUEST,
    MOCK_MIDDLEWARE,
    MOCK_CACHE,
    MOCK_FORWARD,
    MOCK_REPLY
  )
}

describe('networkOnly', () => {
  beforeEach(() => {
    MOCK_GET_REQUEST_KEY.mockClear()
    MOCK_CACHE_GETTER.mockClear()
    MOCK_CACHE_SETTER.mockClear()
    MOCK_FORWARD.mockClear()
    MOCK_REPLY.mockClear()
    MOCK_SHOULD_RESPONSE_BE_CACHED.mockClear()
  })

  it('should be a function', () => {
    expect(typeof networkOnly).toBe('function')
  })

  it('should call `forward`', () => {
    callNetworkOnly()
    expect(MOCK_FORWARD).toHaveBeenCalledTimes(1)
  })

  it('should call `cache.set` if `middleware.shouldResponseBeCached` returns true', async () => {
    MOCK_SHOULD_RESPONSE_BE_CACHED.mockReturnValue(true)
    MOCK_MIDDLEWARE = new Middleware({
      matcher: jest.fn().mockReturnValue(true),
      getRequestCacheKey: MOCK_GET_REQUEST_KEY,
      shouldResponseBeCached: MOCK_SHOULD_RESPONSE_BE_CACHED
    })
    await callNetworkOnly()
    expect(MOCK_CACHE_SETTER).toHaveBeenCalledTimes(1)
  })

  it('should call the `reply` function', async () => {
    await callNetworkOnly()
    expect(MOCK_REPLY).toHaveBeenCalledTimes(1)
  })
})
