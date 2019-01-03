
module.exports = (apiDoc) => {

  const swaggerMongoose = require('swagger-mongoose')
  const models = swaggerMongoose.compile(apiDoc).models

  return {
    Path: models.Path,
    ValueStream: models.ValueStream,
    Process: models.Process
  }
}
