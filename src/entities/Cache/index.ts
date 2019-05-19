type Setter = (key: string, value: any) => void
type Getter = (key: string) => any

/**
 * Object representing the cache.
 * It allows you to set and get value from the cache
 */
class Cache {
  private _setter: Setter
  private _getter: Getter

  constructor(config: { setter: Setter; getter: Getter }) {
    const { setter, getter } = config

    this._setter = setter
    this._getter = getter
  }

  set(key: string, value: any): void {
    this._setter(key, value)
  }

  get(key: string): any {
    return this._getter(key)
  }
}

export default Cache
