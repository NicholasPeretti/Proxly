import Cache from '../../entities/Cache'

const store = {}

export default new Cache({
  setter(key, value) {
    store[key] = value
  },
  getter(key) {
    return store[key]
  }
})
