'use strict'

require('dotenv-safe').config()

module.exports = {
  apiPort: process.env.SERVER_API_PORT || 3000,
  logLevel: process.env.LOG_LEVEL || "ERROR",
  dataSource: process.env.DATA_SORCE || "MOCK"
}