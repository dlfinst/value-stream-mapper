const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server')
  .default;

const mongoServer = new MongoMemoryServer();

const logger = require('../utils').logger('mongo-mock');

mongoose.Promise = Promise;

module.exports = () => {
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
          logger.msg(e);
          mongoose.connect(mongoUri, mongooseOpts);
        }
        logger.msg(e);
      });

      mongoose.connection.once('open', () => {
        logger.msg(`MongoDB successfully connected to ${mongoUri}`);
      });
    });

  return mongoose.connection
}

