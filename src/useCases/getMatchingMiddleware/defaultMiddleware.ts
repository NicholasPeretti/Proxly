import Middleware from '../../entities/Middleware'

export default new Middleware({
  matcher: () => true,
  getRequestCacheKey: request => {
    return `[${request.getMethod()}]_${request.getUrl()}`
  },
  shouldResponseBeCached: response => {
    const responseHeaders = response.getHeaders()
    const responseStatus = responseHeaders['status']
    return responseStatus < 300 && responseStatus >= 200
  }
})
