/* eslint-disable no-sync */
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const logger = require('../utils').logger('api-doc')

let apiDoc

try {
  apiDoc = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, './swagger.yaml'), 'utf8'))
  logger.msg(Object.keys(apiDoc.paths))
} catch (e) {
  logger.err(e)
  apiDoc = {}
}

module.exports = apiDoc