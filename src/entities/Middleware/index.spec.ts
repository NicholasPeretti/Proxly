import Middleware from './index'
import ProxyRequest from '../ProxyRequest'

const MockedProxyRequest = new ProxyRequest({
  url: 'http://mytesturl.org',
  body: {
    body: 'body'
  },
  headers: {
    header: 'header'
  }
})

const MOCK_MATCHER = jest.fn(() => false)
const MOCK_GET_REQUEST_CACHE_KEY = jest.fn(req => '')
const MOCK_SHOULD_RESPONSE_BE_CACHED = jest.fn(req => true)

describe('Middleware', () => {
  it('should be a function', () => {
    expect(typeof Middleware).toBe('function')
  })

  describe('instance', () => {
    let middleware: Middleware

    beforeEach(() => {
      MOCK_MATCHER.mockClear()
      MOCK_GET_REQUEST_CACHE_KEY.mockClear()
      MOCK_SHOULD_RESPONSE_BE_CACHED.mockClear()
      middleware = new Middleware({
        matcher: MOCK_MATCHER,
        getRequestCacheKey: MOCK_GET_REQUEST_CACHE_KEY,
        shouldResponseBeCached: MOCK_SHOULD_RESPONSE_BE_CACHED
      })
    })

    describe('getRequestCacheKey', () => {
      it('should expose the `getRequestCachedKey` method', () => {
        expect(typeof middleware.getRequestCacheKey).toBe('function')
      })

      it('should call the `getRequestCacheKey` passed to the constructor', () => {
        middleware.getRequestCacheKey(MockedProxyRequest)
        expect(MOCK_GET_REQUEST_CACHE_KEY).toHaveBeenCalledTimes(1)
      })
    })

    describe('shouldResponseBeCached', () => {
      it('should expose the `shouldResponseBeCached` method', () => {
        expect(typeof middleware.shouldResponseBeCached).toBe('function')
      })

      it('should call the `shouldResponseBeCached` passed to the constructor', () => {
        middleware.shouldResponseBeCached(MockedProxyRequest)
        expect(MOCK_SHOULD_RESPONSE_BE_CACHED).toHaveBeenCalledTimes(1)
      })
    })

    describe('match', () => {
      it('should expose a `match` method', () => {
        expect(typeof middleware.match).toBe('function')
      })

      it('should call the `matcher` function passed to the constructor', () => {
        middleware.match(MockedProxyRequest)

        expect(MOCK_MATCHER).toHaveBeenCalledTimes(1)
      })
    })
  })
})
