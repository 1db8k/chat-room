const passport = require('passport')
const hlpr = require('../helpers')
const config = require('../config')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = function authMiddleWare () {
  function authCallback (accessToken, refreshToken, profile, done) {
    // Find a user in the local db using profile.id
    hlpr.findUser(profile.id)
    // If the user is found, return the user data using the done()
      .then(result => {
        if (result) {
          done(null, result)
        } else {
          // If the user is not found, create one in the local db and return
          hlpr.createUser(profile)
          .then(newChatUser => {
            done(null, newChatUser)
          })
          .catch((err) => console.log(err))
        }
      })
  }
  passport.use(new FacebookStrategy(config.fb, authCallback))
}
