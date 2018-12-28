/* eslint-disable no-new */
'use strict';

const data = require('../../data');
const _ = require('lodash');
const logger = require('../../utils').logger('value-stream');
// const Router = require('express').Router
// const valueStreamRoutes = new Router()
const models = require('../../models')

// const getAllValueStreams = async () => new Promise((resolve, reject) => {
//   resolve(data || { error: 'No team found' })
// })

const getAllValueStreams = (search) => data || {
  error: 'No team found'
}

const addValueStream = async (params) => new Promise((resolve, reject) => {
  try {
    const valueStream = new models.ValueStream(params.teamName)
    logger.msg(JSON.stringify(valueStream))
    resolve(valueStream)
  } catch (err) {
    reject(err)
  }
})

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
//     const data = await getAllValueStreams(req.params.id)
//     res.contentType = 'json';
//     res.send(200, data)
//     next()
//   } catch (err) {
//     res.send(500, err)
//     next(err)
//   }
// })

module.exports = {
  getAllValueStreams,
  addValueStream,
  getValueStream
}