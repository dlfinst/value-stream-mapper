/* eslint-disable prefer-arrow-callback */

const valueStream = require('../../src/api-v1/services/valueStreams')
const database = require('../../src/db/mongoose-connection')
const mochaAsync = require('../helpers/mochaAsync')
const expect = require('chai').expect
const makeVSM = require('../fixtures/valueStreamPayload')

beforeEach(mochaAsync(async function () {
  await database.mongoose.run()
}))

afterEach(mochaAsync(async function () {
  await database.mongoose.stop()
}))

describe('valueStream Services', function () {

  let addedVS
  const params = {}
  params.payload = makeVSM('X Force')

  it('should add a new value stream', mochaAsync(async function () {

    addedVS = await valueStream.addValueStream(params)
    expect(addedVS.id).to.be.equal(params.payload.id)

  }))

  it('should return all value streams', mochaAsync(async function () {
    params.payload = makeVSM('Guardians')
    addedVS = await valueStream.addValueStream(params)

    params.payload = makeVSM('Avengers')
    addedVS = await valueStream.addValueStream(params)

    params.payload = makeVSM('X factor')
    addedVS = await valueStream.addValueStream(params)

    const data = await valueStream.getValueStreams()
    expect(data[0].teamName).to.equal('Guardians')
    expect(data.length).to.equal(3)
  }))
})