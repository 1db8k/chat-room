const router = require('express').Router()
const passport = require('passport')

router.get(['/', '/login'], (req, res, next) => {
  res.render('login', {
    cssPath: 'loginStyles',
    title: 'Login'
  })
})
  .get('/rooms', (req, res, next) => {
    res.render('rooms', {
      cssPath: 'roomsStyles',
      title: 'Rooms',
      user: req.user
    })
  })
  .get('/chatroom', (req, res, next) => {
    res.render('chatroom', {
      cssPath: 'chatroomStyles',
      title: 'Chatroom'
    })
  })
  .get('/auth/facebook', passport.authenticate('facebook'))
  .get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/rooms',
    failureRedirect: '/',
    failureFlash: true
  }))
  .get('*', (req, res, next) => {
    res.render('404', {
      cssPath: '404',
      title: 'Error 404'
    })
  })

module.exports = router
