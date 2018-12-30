
const MongoClient = require('mongodb');
const apiDOc = require('../api-v1/api-doc')
const models = require('./models')
const logger = require('../utils').logger('valueStream.test')

describe.skip('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    logger.msg(global.__MONGO_URI__)
    connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const valueStreams = db.collection('valueStreams');
    const valueStream = models(apiDOc).ValueStream({
      id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
      teamId: 12345,
      teamName: "X Force",
      lastUpdated: new Date(),
      processes: [
        {
          id: "d290f1ee-6c54-4b01-90e6-d701748f08",
          name: "Coding",
          description: "Writing the code",
          reprocessTime: 20,
          processTime: 80,
          waitTime: 120,
          primaryPath: {
            nextProcess: "theNextProcessStep",
            frequencyPct: 80
          }
        }
      ]
    });
    // await valueStream.save()

    await valueStreams.insertOne(valueStream);

    const inserted = await valueStreams.findOne({ teamId: '12345' });
    expect(inserted.teamId).toEqual(valueStream.teamId);
  });
});