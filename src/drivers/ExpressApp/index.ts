const Express = require('express')
import cache from '../cache'
import handleRequestController from '../../adapters/handleRequestController'
import axiosForward from '../axiosForward'

const app = new Express()

app.use((req, res) => {
  return handleRequestController(req, res, axiosForward, [], cache)
})

export default app
