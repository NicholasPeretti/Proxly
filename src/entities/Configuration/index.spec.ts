import Configuration, { PROXY_MODE } from './index'

const MOCK_TARGET_URL = 'MOCK_TARGET_URL'

describe('Configuration', () => {
  it('should be a function', () => {
    expect(typeof Configuration).toBe('function')
  })

  it('should throw if TARGET_URL is not provided as parameter', () => {
    expect(() => {
      new Configuration()
    }).toThrow()
    expect(() => {
      new Configuration({ PORT: 8000, TARGET_URL: null })
    }).toThrow()
  })

  it('should not throw if TARGET_URL is provided', () => {
    expect(() => {
      new Configuration({ TARGET_URL: 'localhost:3000' })
    }).not.toThrow()
  })

  describe('instance', () => {
    let configuration: Configuration

    beforeEach(() => {
      configuration = new Configuration({
        TARGET_URL: MOCK_TARGET_URL
      })
    })

    describe('getTargetUrl', () => {
      it('should return the TARGET_URL passed to the constructor', () => {
        expect(configuration.getTargetUrl()).toBe(MOCK_TARGET_URL)
      })
    })

    describe('getPort', () => {
      it('should return 8000 if the PORT parameter was not passed to the constructor', () => {
        expect(configuration.getPort()).toBe(8000)
      })

      it('should return the specified port passed to the constructor', () => {
        const MOCK_PORT = 7589
        configuration = new Configuration({
          PORT: MOCK_PORT,
          TARGET_URL: MOCK_TARGET_URL
        })
        expect(configuration.getPort()).toBe(MOCK_PORT)
      })
    })

    describe('getMode', () => {
      it('should return NETWORK_ONLY if the MODE parameter was not passed to the constructor', () => {
        expect(configuration.getMode()).toBe(PROXY_MODE.NETWORK_ONLY)
      })
      it('should return the specified mode passed to the constructor', () => {
        const MOCK_MODE = PROXY_MODE.CACHE_ONLY
        configuration = new Configuration({
          TARGET_URL: MOCK_TARGET_URL,
          MODE: MOCK_MODE
        })
        expect(configuration.getMode()).toBe(MOCK_MODE)
      })
    })

    describe('getJSON', () => {
      it('should return all the properties in a JSON object', () => {
        expect(configuration.getJSON()).toEqual({
          TARGET_URL: configuration.getTargetUrl(),
          PORT: configuration.getPort(),
          MODE: configuration.getMode()
        })
      })
    })
  })
})
