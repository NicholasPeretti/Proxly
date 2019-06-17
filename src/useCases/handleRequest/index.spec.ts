import handleRequest from './index'
import ProxyRequest from '../../entities/ProxyRequest'
import Middleware from '../../entities/Middleware'
import Cache from '../../entities/Cache'
import Configuration from '../../entities/Configuration'

const MOCK_REQUEST = new ProxyRequest()

const MOCK_REQUEST_CACHE_KEY = 'MOCK_REQUEST_CACHE_KEY'
const MOCK_GET_REQUEST_CACHE_KEY = jest.fn(() => MOCK_REQUEST_CACHE_KEY)
const MOCK_SHOULD_RESPONSE_BE_CACHED = jest.fn(() => true)
const MOCK_MIDDLEWARE = new Middleware({
  matcher: jest.fn(() => true),
  getRequestCacheKey: MOCK_GET_REQUEST_CACHE_KEY,
  shouldResponseBeCached: MOCK_SHOULD_RESPONSE_BE_CACHED
})

const MOCK_CACHE_SETTER = jest.fn()
const MOCK_CACHE_GETTER = jest.fn(() => null)
const MOCK_CACHE = new Cache({
  setter: MOCK_CACHE_SETTER,
  getter: MOCK_CACHE_GETTER
})

const MOCK_FORWARD = jest.fn().mockResolvedValue(MOCK_REQUEST)
const MOCK_REPLY = jest.fn()

const MOCK_CONFIG = new Configuration({
  TARGET_URL: 'TARGET_URL'
})

const executeHandleRequest = async () =>
  handleRequest(
    MOCK_REQUEST,
    MOCK_MIDDLEWARE,
    MOCK_CACHE,
    MOCK_FORWARD,
    MOCK_REPLY,
    MOCK_CONFIG
  )

describe('handleRequest', () => {
  beforeEach(() => {
    MOCK_GET_REQUEST_CACHE_KEY.mockClear()
    MOCK_SHOULD_RESPONSE_BE_CACHED.mockClear()
    MOCK_CACHE_SETTER.mockClear()
    MOCK_CACHE_GETTER.mockClear()
    MOCK_FORWARD.mockClear()
    MOCK_REPLY.mockClear()
  })

  it('should be a function', () => {
    expect(typeof handleRequest).toBe('function')
  })

  it('should use `middleware.getRequestCacheKey`', async () => {
    await executeHandleRequest()
    expect(MOCK_GET_REQUEST_CACHE_KEY).toHaveBeenCalledTimes(1)
  })

  it('should use `middleware.shouldResponseBeCached`', async () => {
    await executeHandleRequest()
    expect(MOCK_SHOULD_RESPONSE_BE_CACHED).toHaveBeenCalledTimes(1)
  })

  it('should not set the cache if `shouldResponseBeCached` returns false', async () => {
    MOCK_SHOULD_RESPONSE_BE_CACHED.mockReturnValue(false)
    MOCK_CACHE_GETTER.mockReturnValue(null)
    await executeHandleRequest()
    expect(MOCK_CACHE_SETTER).not.toHaveBeenCalled()
  })
})
