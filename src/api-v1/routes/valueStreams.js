'use strict'
const logger = require('../../utils').logger
const valueStreams = require('../services/valueStreams')
const openApi = require('../api-doc')

module.exports = () => {

  const GET = async (req, res, next) => {
    try {
      const result = await valueStreams.getValueStreams(req.query)
      res.status(200).json(result)
    } catch (err) {
      logger.error(err.stack)
      next(err)
    }
  }

  const PUT = async (req, res, next) => {
    try {
      const result = await valueStreams.addValueStream(req.body)
      res.status(201).json(result)
    } catch (err) {
      logger.error(err.errors)
      res.status(400)
      res.send(err.errors)
      next(err)
    }
  }

  // Set the path metadata based on the Swagger file
  GET.apiDoc = openApi.paths['/valuestreams'].get
  PUT.apiDoc = openApi.paths['/valuestreams'].put

  const operations = {
    get: GET,
    put: PUT
  }

  return operations
}
