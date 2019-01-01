'use strict'

const valueStreamService = require('../services/valueStreams')
const logger = require('../../utils').logger('PATH:valueStreams')
const openApi = require('../../api-v1/api-doc')

module.exports = () => {

  const GET = (req, res) => {
    logger.msg(req.query.searchString)

    logger.json('Req params', req.params)
    logger.json('Req query', req.query)
    logger.json('Req body', req.body)

    logger.msg(Object.keys(openApi.paths['/valuestream/{teamId}']))

    res.status(200).json({ 'response': openApi.paths['/valuestream/{teamId}'].get })
  }

  const PUT = (req, res) => {
    logger.json('Req params', req.params)
    logger.json('Req query', req.query)
    logger.json('Req body', req.body)

    const response = { 'response': 'Did it' }
    res.status(200).json(response)
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
