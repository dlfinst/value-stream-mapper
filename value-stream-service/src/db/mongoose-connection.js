const config = require('../../config')

const mongoose = config.dataSource === 'MOCK' ? require('./mongo-mock') : require('./mongo')
const models = require('./models')

module.exports = {
  mongoose,
  models
}