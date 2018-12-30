/* eslint-disable no-sync */
/* eslint-disable no-useless-constructor */
const NodeEnvironment = require('jest-environment-node');
const fs = require('fs');
const path = require('path');
const logger = require('../../utils').logger('mongo-environment');
const globalConfigPath = path.join(__dirname, 'globalConfig.json');

module.exports = class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    logger.msg('Setup MongoDB Test Environment');

    const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'));

    this.global.__MONGO_URI__ = globalConfig.mongoUri;
    this.global.__MONGO_DB_NAME__ = globalConfig.mongoDBName;

    await super.setup();
  }

  async teardown() {
    logger.msg('Teardown MongoDB Test Environment');

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
};
