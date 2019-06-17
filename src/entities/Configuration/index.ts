export default class Configuration {
  private PORT?: number
  private TARGET_URL: string

  constructor(config?: { PORT?: number; TARGET_URL: string }) {
    if (!config.TARGET_URL) {
      throw new Error(`TARGET_URL is required`)
    }

    this.TARGET_URL = config.TARGET_URL
    this.PORT = config.PORT || 8000
  }

  getTargetUrl() {
    return this.TARGET_URL
  }

  getPort() {
    return this.PORT
  }

  getJSON() {
    return {
      TARGET_URL: this.getTargetUrl(),
      PORT: this.getPort()
    }
  }
}
