/* eslint-disable prefer-arrow-callback */

const valueStream = require('../../src/api-v1/services/valueStreams')
const database = require('../../src/db/mongoose-connection')
const mochaAsync = require('../helpers/mochaAsync')
const expect = require('chai').expect

describe('valueStream Services', function () {

  before(mochaAsync(async function () {
    await database.mongoose.run()
  }))

  after(mochaAsync(async function () {
    await database.mongoose.stop()
  }))

  let addedVS

  it('should add a new value stream', mochaAsync(async function () {

    const params = {}
    params.payload = require('../fixtures/valueStreamPayload')()

    addedVS = await valueStream.addValueStream(params)
    expect(addedVS).to.be.equal(params.payload.id)

  }))

  it('should return all value streams', mochaAsync(async function () {

    const data = await valueStream.getValueStreams()
    expect(data[0].teamName).to.be.equal(params.payload.teamName)

  }))
})