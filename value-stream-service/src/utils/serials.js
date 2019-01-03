const genSerial = (len) => {
  const serial = `${Math.floor((Math.random() * Math.pow(10, len - 1)) + 1)}`.padStart(len, '0')
  return serial
}

const generateSerialId = (id, len) => {
  const prefix = `${id}`.replace(/\s/g, '').toUpperCase().substr(0, 6)
  const serial = genSerial(len)
  return `${prefix}${serial}`
}

module.exports = {
  genSerial,
  generateSerialId
}