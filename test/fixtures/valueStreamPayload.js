const apiDoc = require('../../src/api-v1/api-doc')

const generateSerialId = (id) => {
  const len = 10
  const base = 10
  const prefix = `${id}`.replace(/\s/g, '').toUpperCase().substr(0, 6)
  const serial = `${Math.floor((Math.random() * Math.pow(base, len - 1)) + 1)}`.padStart(len, '0')
  return `${prefix}${serial}`
}

module.exports = (teamName) => {
  const vsm = apiDoc.definitions.ValueStream.example
  vsm.processes = []
  vsm.teamName = teamName
  vsm.id = generateSerialId('Test VSM')
  vsm.teamId = generateSerialId(vsm.teamName)

  return vsm
}