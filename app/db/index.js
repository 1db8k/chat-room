const config = require('../config')
const mongoose = require('mongoose')
const logger = require('../logger')
mongoose.Promise = global.Promise
const Mongoose = mongoose.connect(config.mongoURI)

Mongoose.connection.on('error', err => {
  logger.log('error', `Mongoose connection error: ${err}`)
})

// Create a Schema that defines the structure for storing user data
const chatUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
})

// Turn the Schema into a usable model
const UserModel = Mongoose.model('chatUser', chatUser)

module.exports = { Mongoose, UserModel }
