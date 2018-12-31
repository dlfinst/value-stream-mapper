'use strict'

const utils = require('../../utils')
const logger = utils.logger('SERVICE:valueStreams')
const models = require('../../db/models')
const apiDoc = require('../api-doc')
const ValueStream = models(apiDoc).ValueStream
const generateSerialId = utils.generateSerialId

const getValueStreams = async (search) => {
  const searchObj = Object(search)
  const query = {}

  if (searchObj.hasOwnProperty('teamId')) {
    query.teamId = search.teamId
  }

  if (searchObj.hasOwnProperty('teamName')) {
    query.teamName = { $regex: searchObj.teamName, $options: 'i' }
  }

  logger.msg(`Query: ${JSON.stringify(query)}`)

  try {
    return ValueStream.find(query).exec()
  } catch (err) {
    throw err
  }
}

const addValueStream = async (params) => {

  const newVS = {
    teamName: params.payload.teamName,
    teamId: params.payload.teamId || generateSerialId(params.payload.teamName, 10),
    processes: params.payload.processes || []
  }
  const vsMap = new ValueStream(newVS)

  try {
    const newVsMap = await vsMap.save()
    return newVsMap
  } catch (err) {
    logger.err(`addValueStream: ${err}`)
    throw err
  }
}

module.exports = {
  getValueStreams,
  addValueStream
}