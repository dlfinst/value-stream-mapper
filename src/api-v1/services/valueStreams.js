'use strict'

const utils = require('../../utils')
const logger = utils.logger('SERVICE:valueStreams')
const apiDoc = require('../api-doc')
const models = require('../../db/models')(apiDoc)

const ValueStream = models.ValueStream
const Process = models.Process
const Path = models.Path
const generateSerialId = utils.generateSerialId

const buildValueStream = (valueStream) => {
  const newVS = {
    teamName: valueStream.teamName,
    teamId: valueStream.teamId || generateSerialId(valueStream.teamName, 10),
    processes: valueStream.processes || []
  }
  return new ValueStream(newVS)
}

const buildProcessPath = (path) => {

  const newPath = {
    nextProcess: path.hasOwnProperty('stepId') ? path.stepId : null,
    frequencyPct: path.hasOwnProperty('frequencyPct') ? path.frequencyPct : 0
  }

  return new Path(newPath)
}

const buildProcessStep = (step) => {

  const newStep = {
    stepId: step.stepId,
    name: step.name,
    description: step.description || '',
    reprocessTime: step.reprocessTime || 0,
    processTime: step.processTime,
    waitTime: step.waitTime,
    primaryPath: step.hasOwnProperty('primaryPath') ? buildProcessPath(step.primaryPath) : buildProcessPath({}),
    exceptionPath: step.hasOwnProperty('exceptionPath') ? buildProcessPath(step.exceptionPath) : buildProcessPath({})
  }

  newStep.exceptionPath.frequencyPct = 100 - newStep.primaryPath.frequencyPct

  return new Process(newStep)
}

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
    logger.err(`getValueStreams: ${err}`)
    throw err
  }
}

const addValueStream = async (params) => {

  const vsMap = buildValueStream(params.payload)

  try {
    const newVsMap = await vsMap.save()
    return newVsMap
  } catch (err) {
    logger.err(`addValueStream: ${err}`)
    throw err
  }
}

const addProcessStep = async (step, teamId) => {
  try {
    const team = await getValueStreams({ teamId })
    const newStep = buildProcessStep(step)
    const updatedTeam = team[0]

    updatedTeam.hasOwnProperty('processes') ?
      updatedTeam.processes.push(newStep) : updatedTeam.processes = [newStep]

    return await ValueStream.findByIdAndUpdate(team[0]._id, updatedTeam, { new: true })
  } catch (err) {
    logger.err(`addProcessStep: ${err}`)
    throw err
  }
}

module.exports = {
  getValueStreams,
  addValueStream,
  addProcessStep
}