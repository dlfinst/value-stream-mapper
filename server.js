'use strict';

const config = require('./config');
const logger = require('./utils').logger('server');
const app = require('./app');
const listEndpoints = require('express-list-endpoints')

const apiPort = process.env.SERVER_API_PORT

// launch our backend into a port

console.log(listEndpoints(app));
app.listen(config.apiPort, () => logger.msg(`LISTENING ON PORT ${apiPort}`))
