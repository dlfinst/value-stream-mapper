'use strict';

const express = require('express');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints')
const prettyHtml = require('json-pretty-html').default;
const swaggerUi = require('./utils').swaggerUi;
const path = require('path')
const bodyParser = require('body-parser')
const httpLogger = require('morgan')
const initialize = require('express-openapi').initialize;
const v1ValueStreamService = require('./api-v1/services/value-stream');
const v1ApiDoc = require('./api-v1/api-doc');
const SwaggerUIBundle = require('swagger-ui-dist').SwaggerUIBundle

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(httpLogger(':method :url :status :res[content-length] - :response-time ms'))

initialize({
  app,
  apiDoc: v1ApiDoc,
  exposeApiDocs: true,
  dependencies: {
    valueStreamService: v1ValueStreamService
  },
  paths: path.resolve(__dirname, './api-v1/paths')
});

const html = prettyHtml(listEndpoints(app));

// app.route('/').get((req, res) => {
//   res.status(200).send(html)
// })

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(v1ApiDoc));
//const swaggerDocument = req.protocol + '://' + req.get('host') + '/api/v1/api-docs';

app.get('/', (req, res) => {
  res.send(swaggerUi(req.protocol + '://' + req.get('host') + '/api/v1/api-docs').index)
});
app.use(express.static(swaggerUi().staticFolder));

console.log(listEndpoints(app))

module.exports = app