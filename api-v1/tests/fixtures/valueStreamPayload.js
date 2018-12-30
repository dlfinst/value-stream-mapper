const apiDoc = require('../../api-doc')


module.exports = () => {
  const vsm = apiDoc.definitions.ValueStream.example
  vsm.processes = []
  return vsm
}