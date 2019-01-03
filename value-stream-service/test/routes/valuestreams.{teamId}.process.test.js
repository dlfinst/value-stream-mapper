/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const request = chai.request

const logger = require('../../src/utils').logger

describe.skip('/valuestreams/{teamId}/process', () => {

  it('should add a new process step', (done) => {
    throw new Error('Not implemented')
    done()
  })
  it('should delete a process step', (done) => {
    throw new Error('Not implemented')
    done()
  })
  it('should ensure that sum of primary and exception path frequency equals 100%', (done) => {
    throw new Error('Not implemented')
    done()
  })
  it('should require a primary path', (done) => {
    throw new Error('Not implemented')
    done()
  })
  it('should not allow removal of a process while a child primary process exists', (done) => {
    throw new Error('Not implemented')
    done()
  })
  describe('Removing processes with and exception process child', () => {
    it('should warn before removing a process with an exception process child', (done) => {
      throw new Error('Not implemented')
      done()
    })
    it('should error if a child exception process has an existing primary process', (done) => {
      throw new Error('Not implemented')
      done()
    })
    it('should adjust the primary path frequency if an exception path is removed', (done) => {
      throw new Error('Not implemented')
      done()
    })
  })

})
