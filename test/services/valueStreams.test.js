
const valueStream = require('../../src/api-v1/services/valueStreams')
const database = require('../../src/db/mongoose-connection')
const expect = require('chai').expect
const makeVSM = require('../fixtures/valueStreamPayload')
const randomTeam = require('../fixtures/teamNames')

const loadValueStreams = (count) => {
  const params = {}
  return Promise.all(new Array(count).fill(0).map(async () => {
    params.payload = makeVSM(randomTeam())
    return valueStream.addValueStream(params).catch((err) => console.log(err))
  }))
}

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

describe('valueStream Services', () => {
  let addedVS
  const params = {}
  params.payload = makeVSM('X Force')

  it('should add a new value stream', async () => {

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
      const data = await valueStream.getValueStreams()
      expect(data[0].teamName).to.equal('Guardians')
      expect(data.length).to.equal(count + 1)
    } catch (error) {
      throw error
    }
  })
})
