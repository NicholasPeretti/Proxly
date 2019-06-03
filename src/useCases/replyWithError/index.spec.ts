import replyWithError from './index'
import ProxyRequest from '../../entities/ProxyRequest'

const MOCK_REPLY = jest.fn(request => {})
const MOCK_ERROR = new Error('MOCK_ERROR')

describe('replyWithError', () => {
  beforeEach(() => {
    MOCK_REPLY.mockClear()
  })

  it('should be a function', () => {
    expect(typeof replyWithError).toBe('function')
  })

  it('should call the reply function passed as parameter', () => {
    replyWithError(MOCK_REPLY, MOCK_ERROR)
    expect(MOCK_REPLY).toHaveBeenCalledTimes(1)
  })

  it('should call the reply function with a ProxyRequest object that contains the error in the body', () => {
    replyWithError(MOCK_REPLY, MOCK_ERROR)
    expect(MOCK_REPLY).toHaveBeenCalledWith(
      new ProxyRequest({
        body: MOCK_ERROR,
        headers: {
          status: 500
        }
      })
    )
  })
})
