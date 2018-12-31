'use strict'

const debug = require('debug')('VSM')
const config = require('../../config')

module.exports = (module) => {
  const msg = debug.extend(`${module}:LOG`)
  msg.enabled = config.logLevel !== "ERROR"

  const err = debug.extend(`${module}:ERROR`)
  err.enabled = true

  return {
    msg,
    err
  }
}

