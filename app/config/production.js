const redisURI = require('url').parse(process.env.REDIS_URL)

module.exports = {
  'host': process.env.host || '',
  'mongoURI': process.env.mongoURI || '',
  'sessionSecret': process.env.sessionSecret,
  'fb': {
    'clientID': process.env.fbClientID,
    'clientSecret': process.env.fbClientSecret,
    'callbackURL': `${process.env.host}/auth/facebook/callback`,
    'profileFields': ['id', 'displayName', 'photos']
  },
  'twitter': {
    'consumerKey': process.env.twitterConsumerKey,
    'consumerSecret': process.env.twitterConsumerSecret,
    'callbackURL': `${process.env.host}/auth/twitter/callback`,
    'profileFields': ['id', 'displayName', 'photos']
  },
  'redis': {
    'host': redisURI.host,
    'port': redisURI.port,
    'password': redisURI.auth.split(':')[1]
  }
}
