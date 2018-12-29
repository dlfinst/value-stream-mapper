module.exports = {
  "swagger": "2.0",
  "info": {
    "description": "Value Stream Map Service",
    "version": "1.0.0",
    "title": "Value Stream Map Service",
    "contact": {
      "email": "bdfinst@gmail.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "host": "vsm",
  "basePath": "/api/v1",
  "paths": {},
  "definitions": {
    "ValueStream": {
      "type": "object",
      "required": [
        "id",
        "teamName",
        "teamId"
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid",
          "example": "d290f1ee-6c54-4b01-90e6-d701748f0851"
        },
        "teamId": {
          "type": "string",
          "example": 12345
        },
        "teamName": {
          "type": "string",
          "example": "X Force"
        },
        "lastUpdated": {
          "type": "string",
          "format": "date-time",
          "example": "2016-08-29T09:12:33.001Z"
        },
        "processes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Process"
          }
        }
      }
    },
    "Process": {
      "required": [
        "id",
        "name",
        "description",
        "reprocessTime",
        "processTime",
        "waitTime",
        "primaryPath"
      ],
      "example": {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f08",
        "name": "Coding",
        "description": "Writing the code",
        "reprocessTime": 20,
        "processTime": 80,
        "waitTime": 120,
        "primaryPath": {
          "nextProcess": "theNextProcessStep",
          "frequencyPct": 80
        }
      },
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "name": {
          "type": "string",
          "example": "Coding"
        },
        "description": {
          "type": "string"
        },
        "reprocessTime": {
          "type": "integer",
          "description": "The time it takes to fix defects in the process"
        },
        "processTime": {
          "type": "integer",
          "description": "The number of minutes spent working on the process"
        },
        "waitTime": {
          "type": "integer",
          "description": "The number of minutes spent waiting on the process to start"
        },
        "primaryPath": {
          "$ref": "#/definitions/Path"
        },
        "exceptionPath": {
          "$ref": "#/definitions/Path"
        }
      }
    },
    "Path": {
      "required": [
        "nextProcess",
        "frequencyPct"
      ],
      "properties": {
        "nextProcess": {
          "type": "string",
          "example": "theNextProcessID",
          "description": "The ID of the next process step"
        },
        "frequencyPct": {
          "type": "integer",
          "example": 80,
          "description": "0-100% how often this path is takem"
        }
      }
    }
  },
  "schemes": [
    "https"
  ]
}