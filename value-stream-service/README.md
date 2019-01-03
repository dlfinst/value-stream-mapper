# Value Stream Service

Very much WIP

## Configuration

Use the example .env.example file as a model .env for configuration.

## API Routing

All routing is driven from `src/api-v1/swagger.yaml` and the matching routes using [express-openapi](https://www.npmjs.com/package/express-openapi) 

## Scripts

- `npm test`: Execute tests
- `npm run cover`: Code coverage
- `npm run watch`: Execute tests in `watch` mode
- `npm run lint`: Report linting errors
- `npm run lint-fix`: Fix linting issues

```bash
$ npm start

info:    Swagger UI at http://localhost:3001

info:    GET: http://localhost:3001/v1/valueStreams
info:    PUT: http://localhost:3001/v1/valueStreams
info:    PUT: http://localhost:3001/v1/valuestreams/:teamId/process
info:    GET: http://localhost:3001/v1/valuestreams/:teamId
info:    GET: http://localhost:3001/v1/api-docs
info:    GET: http://localhost:3001/_health
info:    GET: http://localhost:3001/
```
