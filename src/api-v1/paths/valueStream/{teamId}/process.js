'use strict'

const logger = require('../../../../utils').logger('valueStream')

module.exports = () => {

  const GET = (req, res) => {
    logger.msg(req.query.searchString)

    res.status(200).json({ "response": "{Team ID}" })
  }

  GET.apiDoc = {
    summary: "retrieves value streams",
    operationId: "getValueStreams",
    description: "Return all value stream matching the search criteria\n",
    produces: [
      "application/json"
    ],
    parameters: [
      {
        'x-express-openapi-case-sensitive': false,
        "in": "query",
        "name": "searchString",
        "description": "pass an optional search string for looking up value streams",
        "required": false,
        "type": "string"
      }
    ],
    responses: {
      200: {
        description: "search results matching criteria",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/ValueStream"
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

  const operations = {
    get: GET
  }

  return operations
}

// "paths": {
//   "/": {
//     "x-swagger-router-controller": "Default",
//       "x-swagger-router-handle-subpaths": true,
//         "get": {
//       "summary": "retrieves API",
//         "operationId": "getAPI",
//           "produces": [
//             "application/json"
//           ],
//             "responses": {
//         "200": {
//           "description": "Found"
//         }
//       }
//     }
//   },
//   "/valuestream/{teamId}": {
//     "x-swagger-router-controller": "Default",
//       "x-swagger-router-handle-subpaths": true,
//         "get": {
//       "summary": "Gets a value stream by ID.",
//         "description": "Returns a value stream for a team\n",
//           "operationId": "getValueStream",
//             "produces": [
//               "application/json"
//             ],
//               "parameters": [
//                 {
//                   "name": "teamId",
//                   "in": "path",
//                   "description": "Team ID",
//                   "type": "string",
//                   "required": true
//                 }
//               ],
//                 "responses": {
//         "200": {
//           "description": "OK",
//             "schema": {
//             "$ref": "#/definitions/ValueStream"
//           }
//         }
//       }
//     }
//   },
//   "/valuestream/{teamId}/process": {
//     "x-swagger-router-controller": "Default",
//       "x-swagger-router-handle-subpaths": true,
//         "put": {
//       "summary": "Adds a process to a value stream",
//         "operationId": "addProcess",
//           "description": "Adds a process to a value stream",
//             "consumes": [
//               "application/json"
//             ],
//               "produces": [
//                 "application/json"
//               ],
//                 "parameters": [
//                   {
//                     "name": "teamId",
//                     "in": "path",
//                     "description": "Team ID",
//                     "type": "string",
//                     "required": true
//                   },
//                   {
//                     "in": "body",
//                     "name": "process",
//                     "description": "Process to add",
//                     "schema": {
//                       "$ref": "#/definitions/Process"
//                     }
//                   }
//                 ],
//                   "responses": {
//         "201": {
//           "description": "Process added"
//         },
//         "400": {
//           "description": "invalid input, object invalid"
//         },
//         "409": {
//           "description": "an existing item already exists"
//         }
//       }
//     }
//   }
// },