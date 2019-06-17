import Configuration from '../../entities/Configuration'

const { PORT, TARGET_URL } = process.env
const port = parseInt(PORT)

let configuration: Configuration

try {
  configuration = new Configuration({
    TARGET_URL,
    PORT: isNaN(port) ? null : port
  })
} catch (e) {
  console.error('Cannot create the configuration object:', e)
  process.exit()
}

export default configuration
