'use strict'

const logger = require('../../../../utils').logger('valueStream')
const openApi = require('../../../../api-v1/api-doc')

module.exports = () => {
  const PUT = (req, res) => {

    logger.json('Req params', req.params)
    logger.json('Req query', req.query)
    logger.json('Req body', req.body)

    logger.msg(Object.keys(openApi.paths['/valuestream/{teamId}/process']))

    res.status(200).json({ 'response': openApi.paths['/valuestream/{teamId}/process'].put })
  }

  // Set the path metadata based on the Swagger file
  PUT.apiDoc = openApi.paths['/valuestream/{teamId}/process'].put

  const operations = {
    put: PUT
  }

  return operations
}

