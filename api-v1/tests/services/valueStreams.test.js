const valueStream = require('../../services/valueStreams')
const database = require('../../../db/mongo-mock');
const logger = require('../../../utils').logger('valueStreams.test');

describe('valueStream Services', () => {

  it('should add a new value stream', async () => {
    database.run()

    const params = {}
    params.payload = require('../fixtures/valueStreamPayload')()

    expect.assertions(2);

    try {
      const data = await valueStream.addValueStream(params)
      expect(data.id).toEqual(params.payload.id)

      try {
        const data = await valueStream.getValueStreams()
        expect(data[0].teamName).toEqual(params.payload.teamName)
      } catch (err) {
        logger.err(`getValueStreams: ${err}`)
      }

    } catch (err) {
      logger.err(`addValueStream: ${err}`)
    }
  })
})