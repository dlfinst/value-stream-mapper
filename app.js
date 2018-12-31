'use strict'

const express = require('express')

const cors = require('cors')
const swaggerUi = require('./utils').swaggerUi
const path = require('path')
const bodyParser = require('body-parser')
const httpLogger = require('morgan')
const initialize = require('express-openapi').initialize
const v1ValueStreamService = require('./api-v1/services/valueStreams')
const v1ApiDoc = require('./api-v1/api-doc')
const logger = require('./utils').logger('APP')

const app = express()

app.use(bodyParser.json())
app.use(httpLogger(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())

const initApiDoc = v1ApiDoc
initApiDoc.paths = {}

initialize({
  app,
  apiDoc: initApiDoc,
  exposeApiDocs: true,
  dependencies: {
    valueStreamService: v1ValueStreamService
  },
  paths: path.resolve(__dirname, './api-v1/paths')
})

const serveSwaggerUI = (req, res) => {
  const path = req.protocol + '://' + req.get('host') + `${initApiDoc.basePath}/api-docs`
  logger.msg(`OpenAPI Path: ${path}`)
  res.send(swaggerUi(path).index)
}

app.get(`/`, serveSwaggerUI)
app.use(express.static(swaggerUi().staticFolder))

module.exports = app