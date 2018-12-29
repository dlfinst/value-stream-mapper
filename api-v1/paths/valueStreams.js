'use strict';

const valueStreamService = require('../services/value-stream')
const logger = require('../../utils').logger('valueStream');

module.exports = () => {

  const GET = (req, res, next) => {
    logger.msg(req.query.searchString)

    res.status(200).json(valueStreamService.getAllValueStreams(req.query.searchString))
  }

  const PUT = (req, res, next) => {
    logger.msg(req)

    const response = { "response": "Did it" }
    res.status(200).json(response)
  }

  GET.apiDoc = {
    summary: 'retrieves value streams',
    operationId: 'getAllValueStreams',
    description: 'Return all value stream matching the search criteria',
    produces: [
      'application/json'
    ],
    parameters: [
      {
        'x-express-openapi-case-sensitive': false,
        in: 'query',
        name: 'searchString',
        description: 'pass an optional search string for looking up value streams',
        required: false,
        type: 'string'
      }
    ],
    responses: {
      200: {
        description: 'search results matching criteria',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/ValueStream'
          }
        }
      },
      default: {
        description: 'An error occurred',
        schema: {
          additionalProperties: true
        }
      }
    }
  }

  PUT.apiDoc = {
    summary: 'adds a value stream',
    operationId: 'addValueStream',
    description: 'Adds a value stream',
    consumes: ['application/json'],
    produces: ['application/json'],
    parameters: [{
      in: 'body',
      name: 'valueStream',
      description: 'Value stream to add',
      schema: {
        $ref: '#/definitions/ValueStream'
      }
    }],
    responses: {
      201: { description: 'Value stream created' },
      400: { description: 'Invalid input, object invalid' },
      409: { description: 'an existing item already exists' },
      default: { description: 'An error occured' }
    }
  }

  const operations = {
    get: GET,
    put: PUT
  }

  return operations
}
