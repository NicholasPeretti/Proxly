import Cache from './index'

let MOCK_MEMORY = {}
const MOCK_SETTER = jest.fn((key, val) => {
  MOCK_MEMORY[key] = val
})
const MOCK_GETTER = jest.fn(key => {
  return MOCK_MEMORY[key]
})

describe('Cache', () => {
  it('should be a function', () => {
    expect(typeof Cache).toBe('function')
  })

  describe('instance', () => {
    let cache: Cache

    beforeEach(() => {
      MOCK_MEMORY = {}
      MOCK_SETTER.mockClear()
      MOCK_GETTER.mockClear()
      cache = new Cache({
        setter: MOCK_SETTER,
        getter: MOCK_GETTER
      })
    })

    describe('cache.set', () => {
      it('should expose a `set` method', () => {
        expect(typeof cache.set).toBe('function')
      })

      it('should call the setter passed in the constructor', () => {
        cache.set('test', 1)
        expect(MOCK_SETTER).toHaveBeenCalledTimes(1)
      })
    })

    describe('cache.get', () => {
      it('should expose a `get` method', () => {
        expect(typeof cache.get).toBe('function')
      })

      it('should call the getter passed in the constructor', () => {
        cache.get('test')
        expect(MOCK_GETTER).toHaveBeenCalledTimes(1)
      })
    })

    describe('E2E test', () => {
      it('should set a value and then get it usign the `set` and `get` methods', () => {
        const MOCK_KEY = 'MOCK_KEY'
        const MOCK_VALUE = 'MOCK_VALUE'

        cache.set(MOCK_KEY, MOCK_VALUE)
        expect(cache.get(MOCK_KEY)).toEqual(MOCK_VALUE)
      })
    })
  })
})
