'use strict'

const winston = require('winston')
const config = require('../../config')

winston.level = config.logLevel !== 'ERROR' ? 'info' : 'error'

const options = {
  handleExceptions: true,
  json: true,
  colorize: true,
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options)
  ],
  format: winston.format.cli(),
  exitOnError: false,
  stream: {
    write(message, encoding) {
      logger.info(message)
    }
  }
})

logger.stream = {
  write(message, encoding) {
    logger.info(message)
  },
}

module.exports = logger

