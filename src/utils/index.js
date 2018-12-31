const logger = require('./logger')
const swaggerUi = require('./swagger-ui')
const generateSerialId = require('./serials').generateSerialId
const genSerial = require('./serials').genSerial

module.exports = {
  logger,
  swaggerUi,
  genSerial,
  generateSerialId
}