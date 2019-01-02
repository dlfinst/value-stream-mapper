/* eslint-disable no-sync */
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const logger = require('../utils').logger

let apiDoc

try {
  apiDoc = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, './swagger.yaml'), 'utf8'))
  logger.info(Object.keys(apiDoc.paths))
} catch (err) {
  logger.error(err.stack)
  apiDoc = {}
}

module.exports = apiDoc