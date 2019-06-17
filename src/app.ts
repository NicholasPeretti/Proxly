import expressApp from './drivers/ExpressApp'
import config from './drivers/config'
const PORT = config.getPort()

expressApp.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
