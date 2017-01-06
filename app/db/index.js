const config = require('../config')
const Mongoose = require('mongoose').connect(config.mongoURI)

Mongoose.connection.on('error', err => {
  // TODO: better error handling
  console.error(err)
})

module.exports = { Mongoose }
