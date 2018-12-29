'use strict';

const config = require('./config');
const logger = require('./utils').logger('server');
const app = require('./app');

const apiPort = process.env.SERVER_API_PORT

// launch our backend into a port

app.listen(config.apiPort, () => logger.msg(`LISTENING ON PORT ${apiPort}`))
