const apiDoc = require('../../../src/api-v1/api-doc')
const utils = require('../../../src/utils')

module.exports = (teamName) => {
  const vsm = apiDoc.definitions.ValueStream.example
  vsm.processes = []
  vsm.teamName = `${teamName} ${utils.genSerial(3)}`
  vsm.teamId = utils.generateSerialId(vsm.teamName, 10)

  return vsm
}