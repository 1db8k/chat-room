const router = require('express').Router()

router.get(['/', '/login'], (req, res, next) => {
  res.render('login', {
    cssPath: 'loginStyles',
    title: 'Login'
  })
})
  .get('/rooms', (req, res, next) => {
    res.render('rooms', {
      cssPath: 'roomsStyles',
      title: 'Rooms'
    })
  })
  .get('/chatroom', (req, res, next) => {
    res.render('chatroom', {
      cssPath: 'chatroomStyles',
      title: 'Chatroom'
    })
  })
  .get('*', (req, res, next) => {
    res.render('404', {
      cssPath: '404',
      title: 'Error 404'
    })
  })

module.exports = router
