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
    this.room = customObj.hasOwnProperty('room') ? customObj.room : undefined
    this.roomID = customObj.hasOwnProperty('roomID') ? customObj.roomID : undefined
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

function findRoomById (roomsArr, roomID) {
  return roomsArr.find((el, i, arr) => el.roomID === roomID)
}

function addUserToRoom (roomsArr, data, socket) {
  // Get the room object
  const room = findRoomById(roomsArr, data.roomID)
  if (room) {
    // Get the active user's ID (Object as used in session)
    let userID = socket.request.session.passport.user
    // Check to see if this user already exists in the chatroom
    let userAlreadyExists = room.users.some(user => user.userID === userID)

    // If the user is NOT alread present in the room, add him to the room
    if (!userAlreadyExists) {
      room.users.push({
        socketID: socket.id,
        userID,
        userFullName: data.userFullName,
        userPic: data.userPic
      })

      // Join the room channel
      socket.join(data.roomID)
    }
    // Return the updated room object
    return room
  }
}

function removeUserFromRoom (roomsArr, socket) {
  for (let room of roomsArr) {
    let user = room.users.findIndex((element, index, array) => element.socketID === socket.id)
    if (user > -1) {
      socket.leave(room.roomID)
      room.users.splice(findUser, 1)
      return room
    }
  }
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
  uniqueRoomID,
  findRoomById,
  addUserToRoom,
  removeUserFromRoom
}
