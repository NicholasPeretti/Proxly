export const enum PROXY_MODE {
  CACHE_ONLY = 'CACHE_ONLY',
  CACHE_PREFERRED = 'CACHE_PREFERRED',
  NETWORK_ONLY = 'NETWORK_ONLY'
}

export default class Configuration {
  private PORT?: number
  private TARGET_URL: string
  private MODE: PROXY_MODE

  constructor(config?: {
    PORT?: number
    TARGET_URL: string
    MODE?: PROXY_MODE
  }) {
    if (!config.TARGET_URL) {
      throw new Error(`TARGET_URL is required`)
    }

    this.TARGET_URL = config.TARGET_URL
    this.PORT = config.PORT || 8000
    this.MODE = config.MODE || PROXY_MODE.NETWORK_ONLY
  }

  getTargetUrl() {
    return this.TARGET_URL
  }

  getPort() {
    return this.PORT
  }

  getMode() {
    return this.MODE
  }

  getJSON() {
    return {
      TARGET_URL: this.getTargetUrl(),
      PORT: this.getPort(),
      MODE: this.getMode()
    }
  }
}
