const db = require('../db')

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

module.exports = { findUser, findUserByMongoID, createUser }
