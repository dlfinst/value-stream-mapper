const config = require('../config')

const mongoose = config.dataSource === 'MOCK' ? require('./mongo-mock') : require('./mongo')

module.exports = mongoose