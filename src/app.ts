import expressApp from './drivers/ExpressApp'
const PORT = process.env.PORT

expressApp.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
