'use strict'

const utils = require('../../utils')
const logger = utils.logger
const modelBuilder = require('./modelBuilder')

const ValueStream = modelBuilder.ValueStreamModel

const getValueStreams = async (search) => {
  const searchObj = Object(search)
  const query = {}

  if (searchObj.hasOwnProperty('teamId')) {
    query.teamId = search.teamId
  }

  if (searchObj.hasOwnProperty('teamName')) {
    query.teamName = { $regex: searchObj.teamName, $options: 'i' }
  }

  try {
    return ValueStream.find(query).exec()
  } catch (err) {
    logger.error(`getValueStreams: ${err}`)
    throw err
  }
}

const addValueStream = async (vsRec) => {

  try {
    const vsMap = modelBuilder.ValueStreamModel(vsRec)

    const newVsMap = await vsMap.save()
    return newVsMap
  } catch (err) {
    logger.error(`addValueStream: ${err}`)
    throw err
  }
}

const addProcessStep = async (step, teamId) => {
  try {
    const team = await getValueStreams({ teamId })
    const newStep = modelBuilder.processStep(step)
    const updatedTeam = team[0]

    updatedTeam.hasOwnProperty('processes') ?
      updatedTeam.processes.push(newStep) : updatedTeam.processes = [newStep]

    return await ValueStream.findByIdAndUpdate(team[0]._id, updatedTeam, { new: true })
  } catch (err) {
    logger.error(`addProcessStep: ${err}`)
    throw err
  }
}

module.exports = {
  getValueStreams,
  addValueStream,
  addProcessStep
}