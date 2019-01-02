
const utils = require('../../utils')
const apiDoc = require('../api-doc')
const models = require('../../db/models')(apiDoc)

const ValueStreamModel = models.ValueStream
const ProcessModel = models.Process
const PathModel = models.Path
const generateSerialId = utils.generateSerialId

const valueStream = (valueStream) => {
  const newVS = {
    teamName: valueStream.teamName,
    teamId: valueStream.teamId || generateSerialId(valueStream.teamName, 10),
    processes: valueStream.processes || []
  }
  return new ValueStreamModel(newVS)
}

const processPath = (path) => {

  const newPath = {
    nextProcess: path.hasOwnProperty('stepId') ? path.stepId : null,
    frequencyPct: path.hasOwnProperty('frequencyPct') ? path.frequencyPct : 0
  }

  return new PathModel(newPath)
}

const processStep = (step) => {

  const newStep = {
    stepId: step.stepId,
    name: step.name,
    description: step.description || '',
    reprocessTime: step.reprocessTime || 0,
    processTime: step.processTime,
    waitTime: step.waitTime,
    primaryPath: step.hasOwnProperty('primaryPath') ? processPath(step.primaryPath) : processPath({}),
    exceptionPath: step.hasOwnProperty('exceptionPath') ? processPath(step.exceptionPath) : processPath({})
  }

  newStep.exceptionPath.frequencyPct = 100 - newStep.primaryPath.frequencyPct

  return new ProcessModel(newStep)
}

module.exports = {
  valueStream,
  processStep,
  ValueStreamModel
}