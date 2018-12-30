/* eslint-disable no-new */
'use strict';

const data = require('../../data');
const _ = require('lodash');
const logger = require('../../utils').logger('SERVICE:valueStreams');
const models = require('../../db/models')
const apiDoc = require('../api-doc')
const ValueStream = models(apiDoc).ValueStream

const getValueStreams = async (search) => {
  try {
    return ValueStream.find()
  } catch (err) {
    throw err
  }
}

const addValueStream = async (params) => {
  let vsMap
  try {
    vsMap = new ValueStream(params.payload)
    logger.msg(vsMap)
  } catch (err) {
    throw err
  }
  try {
    vsMap.save()
  } catch (err) {
    throw err
  }
}

const getValueStream = async (id) => {
  logger.msg(`getValueStream(${id})`)
  return new Promise((resolve, reject) => {
    try {
      const team = _.find(data, (team) => team.teamId === Number(id)) || { error: `No team found for ${id}` }

      logger.msg(`ID: ${id}: ${JSON.stringify(team.teamName)} `)
      resolve(team)
    } catch (err) {
      reject(err)
    }
  })
}

// valueStreamRoutes.get('/valueStream/:id', async (req, res, next) => {
//   try {
//     const team = await getValueStream(req.params.id)
//     res.contentType = 'json';
//     const httpCode = team.hasOwnProperty('teamId') ? 200 : 204

//     res.send(httpCode, team)
//     next()
//   } catch (err) {
//     res.send(500, err)
//     next(err)
//   }
// })

// valueStreamRoutes.post('/valueStream', async (req, res, next) => {
//   try {
//     logger.msg(req.body)

//     const added = await addValueStream(req.body)
//     res.send(201, { status: 'created', data: added })
//     next()
//   } catch (err) {
//     logger.err(err)

//     res.send(500, err)
//     next(err)
//   }
// })

// valueStreamRoutes.get('/valueStreams', async (req, res, next) => {
//   try {
//     const data = await getValueStreams(req.params.id)
//     res.contentType = 'json';
//     res.send(200, data)
//     next()
//   } catch (err) {
//     res.send(500, err)
//     next(err)
//   }
// })

module.exports = {
  getValueStreams,
  addValueStream,
  getValueStream
}