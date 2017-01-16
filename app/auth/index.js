const passport = require('passport')
const logger = require('../logger')
const hlpr = require('../helpers')
const config = require('../config')
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy

module.exports = function authMiddleWare () {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    hlpr.findUserByMongoID(id)
        .then(user => done(null, user))
        .catch(err => logger.log('error', `Error when deserializing the user: ${err}`))
  })

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
          .then(newChatUser => done(null, newChatUser))
          .catch((err) => logger.log('error', `Error creating user: ${err}`))
        }
      })
      .catch((err) => logger.log('error', `Error creating user: ${err}`))
  }
  passport.use(new FacebookStrategy(config.fb, authCallback))
  passport.use(new TwitterStrategy(config.twitter, authCallback))
}
