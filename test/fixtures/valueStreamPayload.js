const apiDoc = require('../../src/api-v1/api-doc')


module.exports = () => {
  const vsm = apiDoc.definitions.ValueStream.example
  vsm.processes = []
  return vsm
}