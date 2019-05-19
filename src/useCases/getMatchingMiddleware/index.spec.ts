import getMatchingMiddleware from './index'
import ProxyRequest from '../../entities/ProxyRequest'
import Middleware from '../../entities/Middleware'

const MOCK_URL = 'mockurl.com'
const MOCK_REQUEST = new ProxyRequest({
  url: MOCK_URL
})

const MOCK_MATCHER = jest.fn().mockReturnValue(true)
const MOCK_MIDDLEWARE = new Middleware({
  matcher: MOCK_MATCHER,
  shouldResponseBeCached: () => true,
  getRequestCacheKey: () => ''
})

describe('getMatchingMiddleware', () => {
  it('should be a function', () => {
    expect(typeof getMatchingMiddleware).toBe('function')
  })

  it('should return the default middleware if no middlewares are passed', () => {
    const middleware = getMatchingMiddleware(MOCK_REQUEST)
    expect(middleware instanceof Middleware).toBe(true)
  })

  it('should return the first matching middleware', () => {
    const middleware = getMatchingMiddleware(MOCK_REQUEST, [MOCK_MIDDLEWARE])
    expect(middleware).toBe(MOCK_MIDDLEWARE)
  })

  it('should return the defaultMiddleware if no middleware matches the request', () => {
    MOCK_MATCHER.mockReturnValue(false)
    const middleware = getMatchingMiddleware(MOCK_REQUEST, [MOCK_MIDDLEWARE])
    expect(middleware).not.toBe(MOCK_MIDDLEWARE)
  })
})
