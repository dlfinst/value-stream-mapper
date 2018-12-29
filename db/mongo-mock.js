const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server')
  .default;

const mongoServer = new MongoMemoryServer();

const debug = require('../utils').debug;
const log = debug('LOG').extend('mongo-mock');

process.env.DEBUG === 'true' ? log.enabled = true : log.enabled = false;

mongoose.Promise = Promise;

module.exports = (env) => {
  mongoServer.getConnectionString()
    .then((mongoUri) => {
      const mongooseOpts = { // options for mongoose 4.11.3 and above
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useNewUrlParser: true
      };

      mongoose.connect(mongoUri, mongooseOpts);

      mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          log(e);
          mongoose.connect(mongoUri, mongooseOpts);
        }
        log(e);
      });

      mongoose.connection.once('open', () => {
        log(`MongoDB successfully connected to ${mongoUri}`);
      });
    });

  return mongoose.connection
}
