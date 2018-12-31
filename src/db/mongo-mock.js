const mongoose = require('mongoose')
const MongoMemoryServer = require('mongodb-memory-server').default
const logger = require('../utils').logger('mongo-mock')

mongoose.Promise = Promise
let mongoServer

const run = async () => {
  mongoServer = new MongoMemoryServer()

  const mongooseOpts = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true
  }

  try {
    const mongoUri = await mongoServer.getConnectionString()
    await mongoose.connect(mongoUri, mongooseOpts)
    // mongoose.connection.once('open', () => {
    logger.msg(`MongoDB successfully connected to ${mongoUri}:${mongoose.connection.readyState}`)
    // })
  } catch (err) {
    logger.err(err.stack)
  }
}

const stop = async () => {
  try {
    await mongoose.connection.close()
    await mongoServer.stop()
    logger.msg(`MongoDB stop ${mongoose.connection.readyState}`)
  } catch (err) {
    logger.err(err.stack)
  }
}

module.exports = { run, stop }
