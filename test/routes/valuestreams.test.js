/* eslint-disable no-unused-expressions */
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
const expect = chai.expect
const newValueStream = require('../fixtures/utils/genValueStreamPayloads')
const database = require('../../src/db/mongoose-connection')

chai.use(chaiHttp)

describe('/valuestreams', () => {

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

  it('Should add a new record PUT', (done) => {
    chai.request(app)
      .put('/v1/valuestreams')
      .send(newValueStream('Justice League'))
      .end((error, response) => {
        expect(response).to.have.status(201)
        expect(response).to.be.json
        expect(response.body).to.be.a('object')
        expect(response.body).to.have.property('teamName')
        expect(response.body).to.have.property('status')
        expect(response.body).to.have.property('teamId')
        expect(response.body).to.have.property('_id')
        expect(response.body.teamName).to.contain('Justice League')
        expect(response.body.status).to.equal('ACTIVE')
        done()
      })
  })
  it('Should return an error for bad input', (done) => {
    chai.request(app)
      .put('/v1/valuestreams')
      .send({ teamID: 'nada' })
      .end((error, response) => {
        expect(response).to.have.status(400)
        expect(response.error).to.have.property('text')
        done()
      })
  })
})