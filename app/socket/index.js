'use strict'
const hlprs = require('../helpers')

module.exports = (io, app) => {
  let roomsArr = app.locals.chatrooms

  io.of('/roomsList').on('connection', socket => {
    socket.on('getChatRoomsArr', () => {
      socket.emit('chatRoomsArr', JSON.stringify(roomsArr))
    })
    socket.on('newRoom', newRoomInput => {
      if (!hlprs.roomExists(roomsArr, newRoomInput)) {
        roomsArr.push({
          room: newRoomInput,
          roomID: hlprs.uniqueRoomID(),
          users: []
        })

        // Emit updated list to creator
        socket.emit('chatRoomsArr', JSON.stringify(roomsArr))
        // Emit an updated list to everyone connected to the rooms page
        socket.broadcast.emit('chatRoomsArr', JSON.stringify(roomsArr))
      }
    })
  })

  io.of('/chatter').on('connection', socket => {
    socket.on('join', data => {
      console.log('USER HAS JOINED. SOCKET ID: ' + socket.id)
      let usersList = hlprs.addUserToRoom(roomsArr, data, socket)

      // if (usersList) {
      socket.broadcast.to(data.roomID).emit('updateUserList', JSON.stringify(usersList.users))

      socket.emit('updateUserList', JSON.stringify(usersList.users))
      // }
    })

    socket.on('disconnect', () => {
      console.log('USER HAS DISCONNECTED. SOCKET ID: ' + socket.id)
      let room = hlprs.removeUserFromRoom(roomsArr, socket)
      // if (room) {
      socket.broadcast.to(room.roomID).emit('updateUserList', JSON.stringify(room.users))
      // }
    })

    socket.on('newMessage', data => {
      socket.broadcast.to(data.roomID).emit('inMessage', JSON.stringify(data))
    })
  })
}
