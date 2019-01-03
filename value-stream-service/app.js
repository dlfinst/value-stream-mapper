'use strict'

const express = require('express')
const createHealthcheckMiddleware = require('healthcheck-ping')
const prettyJson = require('express-prettify')

const cors = require('cors')
const utils = require('./src/utils')
const swaggerUi = utils.swaggerUi
const path = require('path')
const bodyParser = require('body-parser')
const httpLogger = require('morgan')
const initialize = require('express-openapi').initialize
const v1ValueStreamService = require('./src/api-v1/services/valueStreams')
const v1ApiDoc = require('./src/api-v1/api-doc')
const logger = utils.logger
const app = express()

app.use(bodyParser.json())

app.use(httpLogger('dev', { stream: logger.stream }))

app.use(cors())
app.use(prettyJson({ query: 'pretty' }))

const initApiDoc = Object.assign({}, v1ApiDoc)
initApiDoc.paths = {}

initialize({
  app,
  apiDoc: initApiDoc,
  exposeApiDocs: true,
  errorTransformer(error) {
    logger.error(error)
  },
  errorMiddleware: (err, req, res, next) => {
    res.status(err.status).send(err)
    next(err)
  },
  dependencies: {
    valueStreamService: v1ValueStreamService
  },
  paths: path.resolve(__dirname, './src/api-v1/routes')
})
app.use(createHealthcheckMiddleware())

const serveSwaggerUI = (req, res) => {
  const path = `${req.protocol}://${req.get('host')}${initApiDoc.basePath}/api-docs`
  res.send(swaggerUi(path).index)
}
app.get('/', serveSwaggerUI)
app.use(express.static(swaggerUi().staticFolder))

module.exports = app