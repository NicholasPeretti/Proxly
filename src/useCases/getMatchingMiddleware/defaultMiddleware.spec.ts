import defaultMiddleware from './defaultMiddleware'
import Middleware from '../../entities/Middleware'
import ProxyRequest, { HTTP_METHOD } from '../../entities/ProxyRequest'

const MOCK_REQUEST = new ProxyRequest()

describe('defaultMiddleware', () => {
  it('should be an instance of `Middleware`', () => {
    expect(defaultMiddleware instanceof Middleware).toBe(true)
  })

  describe('matcher', () => {
    it('should ALWAYS return true', () => {
      expect(defaultMiddleware.match(null)).toBe(true)
      expect(defaultMiddleware.match(MOCK_REQUEST)).toBe(true)
    })
  })

  describe('shouldResponseBeCached', () => {
    it('should return true if status is between 200 and 299', () => {
      for (var status = 200; status < 300; status++) {
        let response = new ProxyRequest({
          headers: {
            status
          }
        })
        expect(defaultMiddleware.shouldResponseBeCached(response)).toBe(true)
      }
    })

    it('should return true if status is NOT between 200 and 299', () => {
      for (var status = 0; status < 200; status++) {
        let response = new ProxyRequest({
          headers: {
            status
          }
        })
        expect(defaultMiddleware.shouldResponseBeCached(response)).toBe(false)
      }

      for (var status = 300; status < 600; status++) {
        let response = new ProxyRequest({
          headers: {
            status
          }
        })
        expect(defaultMiddleware.shouldResponseBeCached(response)).toBe(false)
      }
    })
  })

  describe('getRequestCacheKey', () => {
    it('should match the pattern: METHOD_URL', () => {
      const URL = 'http://my-api.internal-domain.com'
      const METHOD = HTTP_METHOD.POST
      const req = new ProxyRequest({
        url: URL,
        method: METHOD
      })

      expect(defaultMiddleware.getRequestCacheKey(req)).toBe(`${METHOD}_${URL}`)
    })
  })
})
