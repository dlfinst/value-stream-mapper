'use strict';

const config = require('./config');
const logger = require('./utils').logger('SERVER');
const listEndpoints = require('express-list-endpoints')
const app = require('./app');

// launch our backend into a port

//app.listen(config.apiPort, () => logger.msg(`LISTENING ON PORT ${app.address()}`))

const server = app.listen(config.apiPort, () => {
  let host = server.address().address;
  host = (host === '::') ? 'localhost' : host;
  const port = server.address().port;
  const uri = `http://${host}:${port}`
  logger.msg(`Swagger UI at ${uri}`)

  listEndpoints(app).forEach(route => {
    logger.msg(`${route.methods[0]}:${uri}${route.path}`)
  });
});
