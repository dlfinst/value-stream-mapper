/* eslint-disable no-sync */
const fs = require('fs')
const logger = require('../../../src/utils').logger

module.exports = (data, filePath) => {
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
    logger.info(`Using existing ${filePath}`)
  } catch (err) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data))
      logger.info(`Fixture ${filePath} created`)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}