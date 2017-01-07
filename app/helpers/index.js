const db = require('../db')

// Find a single user based on a key
function findUser (profileId) {
  return db.UserModel.findOne({profileId: profileId})
}

// Create a single user
function createUser (profile) {
  return new Promise(function (resolve, reject) {
    const newChatUser = new db.UserModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || '/img/user.jpg'
    })

    resolve(newChatUser.save(err => {
      if (err) return reject(err)
      resolve(newChatUser)
    }))
  })
}

module.exports = { findUser, createUser }
