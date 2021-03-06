import ProxyRequest, { HTTP_METHOD } from './index'

describe('ProxyRequest', () => {
  it('should be a function', () => {
    expect(typeof ProxyRequest).toBe('function')
  })

  describe('Request', () => {
    let request = new ProxyRequest({})

    beforeEach(() => {
      request = new ProxyRequest({})
    })

    describe('Request.getValidHeaders', () => {
      const INVALID_HEADERS = ['host', 'accept-encoding']

      INVALID_HEADERS.forEach(header => {
        it(`should omit the '${header}' header`, () => {
          const MOCK_HEADERS = {
            [header]: 'MOCK_HOST'
          }
          request = new ProxyRequest({ headers: MOCK_HEADERS })
          const safeHeaders = request.getHeaders()
          expect(safeHeaders[header]).toBeUndefined()
        })
      })
    })

    describe('Request.getUrl', () => {
      it('should be a function', () => {
        expect(typeof request.getUrl).toBe('function')
      })

      it('should return the passed URL', () => {
        const MOCK_URL = 'MOCK_URL'
        request = new ProxyRequest({ url: MOCK_URL })
        expect(request.getUrl()).toBe(MOCK_URL)
      })
    })

    describe('Request.getBody', () => {
      it('should be a function', () => {
        expect(typeof request.getBody).toBe('function')
      })

      it('should return the passed body', () => {
        const MOCK_BODY = 'MOCK_BODY'
        request = new ProxyRequest({ body: MOCK_BODY })
        expect(request.getBody()).toBe(MOCK_BODY)
      })
    })

    describe('Request.getTargetUrl', () => {
      it('should be a function', () => {
        expect(typeof request.getTargetUrl).toBe('function')
      })

      it('should return the passed URL', () => {
        const MOCK_URL = 'MOCK_URL'
        request = new ProxyRequest({ url: MOCK_URL })
        expect(request.getTargetUrl()).toBe(MOCK_URL)
      })
    })

    describe('Request.getTargetBody', () => {
      it('should be a function', () => {
        expect(typeof request.getTargetBody).toBe('function')
      })

      it('should return the passed body', () => {
        const MOCK_BODY = 'MOCK_BODY'
        request = new ProxyRequest({ body: MOCK_BODY })
        expect(request.getTargetBody()).toBe(MOCK_BODY)
      })
    })

    describe('Request.getHeaders', () => {
      it('should be a function', () => {
        expect(typeof request.getHeaders).toBe('function')
      })
      it('should return an empty object if not set', () => {
        expect(request.getHeaders()).toEqual({})
      })
      it('should return the passed headers object if set', () => {
        const MOCK_HEADERS = {}
        request = new ProxyRequest({ headers: MOCK_HEADERS })
        expect(request.getHeaders()).toEqual(MOCK_HEADERS)
      })
    })

    describe('Request.getTargetHeaders', () => {
      it('should be a function', () => {
        expect(typeof request.getTargetHeaders).toBe('function')
      })
      it('should return an empty object if not set', () => {
        expect(request.getTargetHeaders()).toEqual({})
      })
      it('should return the passed headers object if set', () => {
        const MOCK_HEADERS = {}
        request = new ProxyRequest({ headers: MOCK_HEADERS })
        expect(request.getTargetHeaders()).toEqual(MOCK_HEADERS)
      })
    })

    describe('Request.setTargetHeaders', () => {
      it('should be a function', () => {
        expect(typeof request.setTargetHeaders).toBe('function')
      })
      it('should set the target headers in an immutable way', () => {
        const NEW_TARGET_HEADERS = {
          testkey: 'testvalue'
        }
        request.setTargetHeaders(NEW_TARGET_HEADERS)
        expect(request.getTargetHeaders()).toEqual(NEW_TARGET_HEADERS)
        expect(request.getTargetHeaders()).not.toBe(NEW_TARGET_HEADERS)
      })
    })

    describe('Request.setTargetBody', () => {
      it('should be a function', () => {
        expect(typeof request.setTargetBody).toBe('function')
      })
      it('should set the target headers in an immutable way', () => {
        const NEW_TARGET_BODY = 'NEW_TARGET_BODY'
        request.setTargetBody(NEW_TARGET_BODY)
        expect(request.getTargetBody()).toEqual(NEW_TARGET_BODY)
      })
    })

    describe('Request.setTargetUrl', () => {
      it('should be a function', () => {
        expect(typeof request.setTargetUrl).toBe('function')
      })
      it('should set the target headers in an immutable way', () => {
        const NEW_TARGET_URL = 'NEW_TARGET_URL'
        request.setTargetUrl(NEW_TARGET_URL)
        expect(request.getTargetUrl()).toEqual(NEW_TARGET_URL)
      })
    })

    describe('Request.getMethod', () => {
      it('should be a function', () => {
        expect(typeof request.getMethod).toBe('function')
      })

      it('should return GET by default', () => {
        expect(request.getMethod()).toBe(HTTP_METHOD.GET)
      })

      it('should return the method passed to the constructor', () => {
        const method = HTTP_METHOD.POST
        const req = new ProxyRequest({
          method
        })
        expect(req.getMethod()).toBe(method)
      })
    })
    describe('toString', () => {
      it('should return a stringified JSON with url, body, headers and method', () => {
        const MOCK_URL = 'MOCK_URL'
        const MOCK_METHOD = HTTP_METHOD.GET
        const MOCK_HEADERS = {
          a: 1
        }
        const MOCK_BODY = 'MOCK_BODY'
        const MOCK_REQUEST = new ProxyRequest({
          url: MOCK_URL,
          body: MOCK_BODY,
          headers: MOCK_HEADERS,
          method: MOCK_METHOD
        })
        const expectedValue = JSON.stringify({
          url: MOCK_URL,
          body: MOCK_BODY,
          headers: MOCK_HEADERS,
          method: MOCK_METHOD
        })

        expect(MOCK_REQUEST.toString()).toEqual(expectedValue)
      })
    })
    describe('Create Request from string', () => {
      const MOCK_URL = 'MOCK_URL'
      const MOCK_METHOD = HTTP_METHOD.GET
      const MOCK_HEADERS = {
        a: 1
      }
      const MOCK_BODY = 'MOCK_BODY'
      const stringifiedRequest = JSON.stringify({
        url: MOCK_URL,
        body: MOCK_BODY,
        headers: MOCK_HEADERS,
        method: MOCK_METHOD
      })
      const request = new ProxyRequest(stringifiedRequest)

      expect(request.getUrl()).toBe(MOCK_URL)
      expect(request.getBody()).toBe(MOCK_BODY)
      expect(request.getHeaders()).toEqual(MOCK_HEADERS)
      expect(request.getMethod()).toBe(MOCK_METHOD)
    })
  })
})
