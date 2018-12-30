const valueStream = require('../../services/valueStreams')
const database = require('../../../db/mongo-mock');
const logger = require('../../../utils').logger('TEST:valueStreams');

describe('valueStream Services', () => {

  // beforeAll(() => {
  //   require('../../../app')
  // })

  it('should add a new value stream', async () => {
    database.run()

    const params = {}
    params.payload = require('../fixtures/valueStreamPayload')

    expect.assertions(1);

    try {
      await valueStream.addValueStream(params)
      try {
        const data = await valueStream.getValueStreams()
        expect(data).toEqual('')
        logger.msg(data)
      } catch (err) {
        logger.err(err)
      }
    } catch (err) {
      logger.err(err)
    }
  })
})