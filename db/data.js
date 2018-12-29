const mongoose = require('mongoose')
const swaggerMongoose = require('swagger-mongoose');

const swagger = require('../api-v1/api-doc.js');
const ValueStream = swaggerMongoose.compile(swagger).models.ValueStream;

const valueStream = new ValueStream({
  id: 123,
  name: 'Fluffy'
});
valueStream.save();


const Schema = mongoose.Schema

// this will be our data base's data structure
const DataSchema = new Schema({
  id: Number,
  message: String,
}, { timestamps: true })

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Data', DataSchema)
