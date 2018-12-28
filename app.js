'use strict';

const express = require('express');
// const bodyParser = require('body-parser')
// const httpLogger = require('morgan')
// const logger = require('./utils').logger('app');

const initialize = require('express-openapi').initialize;
const v1ValueStreamService = require('./api-v1/services/value-stream');
const v1ApiDoc = require('./api-v1/api-doc');

const app = express();

initialize({
  app,
  apiDoc: v1ApiDoc,
  dependencies: {
    valueStreamService: v1ValueStreamService
  },
  paths: './api-v1/paths'
});

module.exports = app