const chai = require('chai')
const path = require('path')
const expect = chai.expect
const request = chai.request

const logger = require('../../src/utils').logger(path.basename(__filename))

describe.skip('Load and retrieve value streams', () => {

  it('should update a SINGLE blob on /blob/<id> PUT', (done) => {
    request(server)
      .get('/blobs')
      .end((err, res) => {
        chai.request(server)
          .put('/blob/' + res.body[0]._id)
          .send({ 'name': 'Spider' })
          .end(function (error, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('UPDATED');
            response.body.UPDATED.should.be.a('object');
            response.body.UPDATED.should.have.property('name');
            response.body.UPDATED.should.have.property('_id');
            response.body.UPDATED.name.should.equal('Spider');
            done();
          });
      })
  })
})
