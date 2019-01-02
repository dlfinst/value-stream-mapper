'use strict'

const logger = require('../../../utils').logger
const openApi = require('../../../api-v1/api-doc')

module.exports = () => {

  const GET = (req, res) => {

    logger.json('Req params', req.params)
    logger.json('Req query', req.query)
    logger.json('Req body', req.body)

    logger.info(Object.keys(openApi.paths['/valuestreams/{teamId}']))

    res.status(200).json({ 'response': openApi.paths['/valuestreams/{teamId}'].get })
  }

  // Set the path metadata based on the Swagger file
  GET.apiDoc = openApi.paths['/valuestreams/{teamId}'].get

  const operations = {
    get: GET
  }

  return operations
}
