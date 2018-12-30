const logger = require('../utils').logger('models');

module.export = (apiDoc) => {

  const swaggerMongoose = require('swagger-mongoose');
  const models = swaggerMongoose.compile(apiDoc).models;

  logger.msg(models)

  return {
    Path: models.Path,
    ValueStream: models.ValueStream,
    Process: models.Process
  }
}
