'use strict'

const logger = require('../../../utils').logger('valueStream')
const openApi = require('../../../api-v1/api-doc')

module.exports = () => {

  const GET = (req, res) => {

    logger.json('Req params', req.params)
    logger.json('Req query', req.query)
    logger.json('Req body', req.body)

    logger.msg(Object.keys(openApi.paths['/valuestream/{teamId}']))

    res.status(200).json({ 'response': openApi.paths['/valuestream/{teamId}'].get })
  }

  // Set the path metadata based on the Swagger file
  GET.apiDoc = openApi.paths['/valuestream/{teamId}'].get

  const operations = {
    get: GET
  }

  return operations
}
