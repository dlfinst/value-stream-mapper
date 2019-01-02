
const path = require('path')
const valueStream = require('../../src/api-v1/services/valueStreams')
const database = require('../../src/db/mongoose-connection')
const expect = require('chai').expect
const makeVSM = require('../fixtures/utils/genValueStreamPayloads')
const saveFixture = require('../fixtures/utils/saveFixture')
const randomTeamName = require('../fixtures/utils/getTeamName')
const logger = require('../../src/utils').logger

const addRandomValueStreams = (count) => Promise.all(new Array(count).fill(0).map(async () => valueStream.addValueStream(makeVSM(randomTeamName())).catch((err) => logger.error(`addRandomValueStreams:${err}`))))

describe('Load and retrieve value streams', () => {

  beforeEach(async () => {
    try {
      await database.mongoose.run()
    } catch (error) {
      throw error
    }
  })

  afterEach(async () => {
    try {
      await database.mongoose.stop()
    } catch (error) {
      throw error
    }
  })

  it('should return all value streams', async () => {
    const count = 1000
    await valueStream.addValueStream(makeVSM('Guardians')).catch((err) => logger.error(err))

    try {
      await addRandomValueStreams(count)
    } catch (error) {
      throw error
    }

    try {
      const returnedVsList = await valueStream.getValueStreams()
      const dataPath = path.join(__dirname, '../fixtures/valueStreams.json')
      saveFixture(returnedVsList, dataPath)

      expect(returnedVsList[0].teamName).to.contain('Guardians')
      expect(returnedVsList.length).to.equal(count + 1)
    } catch (error) {
      throw error
    }
  })

  it('Should fetch value streams matching a partial team name', async () => {
    const count = 100

    await valueStream.addValueStream(makeVSM('Guardians')).catch((err) => logger.error(err))

    try {
      await addRandomValueStreams(count)
    } catch (error) {
      throw error
    }

    try {
      const vsList = await valueStream.getValueStreams({ teamName: 'Guard' })
      expect(vsList[0].teamName).to.contain('Guard')
    } catch (error) {
      throw error
    }
  })

  it('Should fetch value streams matching a teamID', async () => {
    const count = 100

    try {
      await valueStream.addValueStream(makeVSM('Guardians')).catch((err) => logger.error(err))

      await addRandomValueStreams(count)

    } catch (error) {
      throw error
    }

    try {
      const returnedVsList = await valueStream.getValueStreams()

      const vsList = await valueStream.getValueStreams({ teamId: returnedVsList[5].teamId })
      expect(vsList[0].teamId).to.equal(returnedVsList[5].teamId)
      expect(vsList.length).to.equal(1)

    } catch (error) {
      throw error
    }
  })

  it('should add a new process to a value stream', async () => {

    try {

      await valueStream.addValueStream(makeVSM('X Force'))

      const vsList = await valueStream.getValueStreams({ teamName: 'X Force' })
      const oldProcessLen = vsList[0].processes.length
      const newStep = require('../fixtures/processPayload')

      const updated = await valueStream.addProcessStep(newStep, vsList[0].teamId)

      expect(updated.processes.length).to.equal(oldProcessLen + 1)

      expect(updated.processes[0].primaryPath[0].frequencyPct + updated.processes[0].exceptionPath[0].frequencyPct).to.equal(100)

    } catch (error) {
      throw error
    }

  })

})
