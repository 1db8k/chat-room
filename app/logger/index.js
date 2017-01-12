const winston = require('winston')
module.exports = new winston.Logger({
  transports: [
    new winston.transports.File({ level: 'debug', filename: './chatroom.log', handleExceptions: true })
  ],
  exitOnError: false
})
