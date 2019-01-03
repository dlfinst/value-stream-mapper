'use strict'

const config = require('./config')
const logger = require('./src/utils').logger
const listEndpoints = require('express-list-endpoints')
const app = require('./app')
const database = require('./src/db/mongo-mock')

database.run()

const server = app.listen(config.apiPort, () => {
  let host = server.address().address
  host = (host === '::') ? 'localhost' : host
  const port = server.address().port
  const uri = `http://${host}:${port}`
  logger.info(`Swagger UI at ${uri}\n`)

  listEndpoints(app).forEach(route => {
    logger.info(`${route.methods[0]}: ${uri}${route.path}`)
  })
})
