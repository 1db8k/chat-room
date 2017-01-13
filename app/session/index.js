const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const db = require('../db')
const config = require('../config')

let sessionObj = {
  secret: config.sessionSecret,
  resave: false,
  store: new MongoStore({
    mongooseConnection: db.Mongoose.connection
  })
}

if (process.env.NODE_ENV === 'production') {
  sessionObj.saveUninitialized = false
} else {
  sessionObj.saveUninitialized = true
}

module.exports = session(sessionObj)
