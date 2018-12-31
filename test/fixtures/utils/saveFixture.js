/* eslint-disable no-sync */
const fs = require('fs')
const logger = require('../../../src/utils').logger('saveFixture')

module.exports = (data, filePath) => {
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
    logger.msg(`Using existing ${filePath}`)
  } catch (err) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data))
      logger.msg(`Fixture ${filePath} created`)
    } catch (err) {
      logger.err(err)
    }
  }
}