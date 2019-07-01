import Configuration, { PROXY_MODE } from '../../entities/Configuration'

const { PORT, TARGET_URL, MODE } = process.env
const port = parseInt(PORT)

let configuration: Configuration

try {
  configuration = new Configuration({
    TARGET_URL,
    PORT: isNaN(port) ? null : port,
    MODE: (<any>PROXY_MODE)[MODE]
  })
} catch (e) {
  console.error('Cannot create the configuration object:', e)
  process.exit()
}

export default configuration
