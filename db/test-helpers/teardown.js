const logger = require('../../utils').logger('teardown');

module.exports = async function () {
  logger.msg('Teardown mongod');
  await global.__MONGOD__.stop();
};