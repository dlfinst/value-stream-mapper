
const path = require('path')
const valueStream = require('../../src/api-v1/services/valueStreams')
const database = require('../../src/db/mongoose-connection')
const expect = require('chai').expect
const makeVSM = require('../fixtures/utils/genValueStreamPayloads')
const saveFixture = require('../fixtures/utils/saveFixture')
const randomTeam = require('../fixtures/utils/getTeamName')
const logger = require('../../src/utils').logger('valueStreams.test')

const loadValueStreams = (count) => {
  const params = {}
  return Promise.all(new Array(count).fill(0).map(async () => {
    params.payload = makeVSM(randomTeam())
    return valueStream.addValueStream(params).catch((err) => logger.err(`loadValueStreams:${err}`))
  }))
}

describe.skip('Load and retrieve value streams', () => {

  before(async () => {
    try {
      await database.mongoose.run()
    } catch (error) {
      throw error
    }
  })

  after(async () => {
    try {
      await database.mongoose.stop()
    } catch (error) {
      throw error
    }
  })

  let addedVS
  let returnedVsList
  const params = {}


  it('should add a new process to a value stream', async () => {
    params.payload = makeVSM('X Force')
    addedVS = await valueStream.addValueStream(params)

    expect(addedVS.id).to.be.equal(params.payload.id)
  })

  it('should return all value streams', async () => {
    const count = 1000
    params.payload = makeVSM('Guardians')
    await valueStream.addValueStream(params).catch((err) => console.log(err))

    try {
      await loadValueStreams(count)
    } catch (error) {
      throw error
    }

    try {
      returnedVsList = await valueStream.getValueStreams()
      const dataPath = path.join(__dirname, '../fixtures/valueStreams.json')
      saveFixture(returnedVsList, dataPath)

      expect(returnedVsList[0].teamName).to.contain('X Force')
      expect(returnedVsList.length).to.equal(count + 2)
    } catch (error) {
      throw error
    }
  })

  it('Should fetch value streams matching a partial team name', async () => {
    try {
      const vsList = await valueStream.getValueStreams({ teamName: 'Guard' })
      expect(vsList[0].teamName).to.contain('Guard')
    } catch (error) {
      throw error
    }
  })

  it('Should fetch value streams matching a teamID', async () => {
    try {
      const vsList = await valueStream.getValueStreams({ teamId: returnedVsList[5].teamId })
      expect(vsList[0].teamId).to.equal(returnedVsList[5].teamId)
      expect(vsList.length).to.equal(1)

    } catch (error) {
      throw error
    }
  })
})
