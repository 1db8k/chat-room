window.addEventListener('load', function () {
  var socket = io(window.location.host + '/roomsList')
  var createBtn = document.querySelector('#createBtn')
  var roomName = document.querySelector('input[name=roomName]')
  var createChatroomForm = document.querySelector('#createChatroomForm')

  // Chat rooms list
  function renderChatRooms (chatRooms) {
    var roomsList = document.querySelectorAll('.roomsList')[0]
    var listStr = ''
    for (var i = 0; i < chatRooms.length; i++) {
      listStr += '<li><a href="/chat/' + chatRooms[i].roomID + '">' + chatRooms[i].room + '</a></li>'
    }
    roomsList.innerHTML = listStr
  }
  socket.emit('getChatRoomsArr')
  socket.on('chatRoomsArr', function (chatRoomsArr) {
    renderChatRooms(JSON.parse(chatRoomsArr))
  })

  // Create chat
  function sendRoomName () {
    if (roomName.value) {
      socket.emit('newRoom', roomName.value)
      roomName.value = ''
    }
  }
  createBtn.addEventListener('click', sendRoomName)
  createChatroomForm.addEventListener('submit', sendRoomName)
})
