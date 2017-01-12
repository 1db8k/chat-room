const config = require('./config')

// Social authentication logic
require('./auth')()

// Redis
const redis = require('redis').createClient
const adapter = require('socket.io-redis')

// Create an IO server instance
const ioServer = app => {
  app.locals.store = []
  const server = require('http').Server(app)
  const io = require('socket.io')(server)
  io.set('transports', ['websocket'])
  const pubClient = redis(config.redis.port, config.redis.host, {
    auth_pass: config.redis.password
  })
  const subClient = redis(config.redis.port, config.redis.host, {
    auth_pass: config.redis.password,
    return_buffers: true
  })

  io.adapter(adapter({
    pubClient,
    subClient
  }))

  io.use((socket, next) => {
    require('./session')(socket.request, {}, next)
  })

  require('./socket')(io, app)
  return server
}

module.exports = {
  router: require('./routes'),
  session: require('./session'),
  ioServer
}
