const db = require('../db')
const appName = require('../../package').name
const crypto = require('crypto')

// Find a single user based on a key
function findUser (profileId) {
  return db.UserModel.findOne({profileId: profileId})
}

// Create a single user
function findUserByMongoID (id) {
  return db.UserModel.findById(id)
}

// Create a single user
function createUser (profile) {
  const newChatUser = new db.UserModel({
    profileId: profile.id,
    fullName: profile.displayName,
    profilePic: profile.photos[0].value || '/img/user.jpg'
  })
  return newChatUser.save()
}

function redirectIfNotLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/')
  }
}

class MustacheConfig {
  constructor (pageName, user, customObj) {
    customObj = customObj || {}
    this.appName = appName
    this.cssPath = customObj.hasOwnProperty('cssPath') ? customObj.cssPath : `${pageName}Styles`
    this.title = customObj.hasOwnProperty('title') ? customObj.title : pageName.charAt(0).toUpperCase() + pageName.substr(1)
    this.user = user
    this.loginHeader = customObj.hasOwnProperty('loginHeader') ? customObj.loginHeader : false
  }
}

function roomExists (roomsArr, room) {
  return roomsArr.some((item) => item.room.toLowerCase() === room.toLowerCase())
}

function uniqueRoomID () {
  return crypto.randomBytes(24).toString('hex')
}

module.exports = {
  findUser,
  findUserByMongoID,
  createUser,
  MustacheConfig,
  midWare: {
    redirectIfNotLoggedIn
  },
  roomExists,
  uniqueRoomID
}
