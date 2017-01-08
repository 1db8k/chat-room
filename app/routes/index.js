const router = require('express').Router()
const hlprs = require('../helpers')
const passport = require('passport')

router.get(['/', '/login'], (req, res, next) => {
  res.render('login', {
    cssPath: 'loginStyles',
    title: 'Login'
  })
})
  .get('/rooms', hlprs.midWare.redirectIfNotLoggedIn, (req, res, next) => {
    res.render('rooms', {
      cssPath: 'roomsStyles',
      title: 'Rooms',
      user: req.user
    })
  })
  .get('/chatroom', hlprs.midWare.redirectIfNotLoggedIn, (req, res, next) => {
    res.render('chatroom', {
      cssPath: 'chatroomStyles',
      title: 'Chatroom',
      user: req.user
    })
  })
  .get('/auth/facebook', passport.authenticate('facebook'))
  .get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/rooms', failureRedirect: '/', failureFlash: true }))

  .get('/auth/twitter', passport.authenticate('twitter'))
  .get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/rooms', failureRedirect: '/', failureFlash: true }))
  .get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })
  .get('*', (req, res, next) => {
    res.render('404', {
      cssPath: '404',
      title: 'Error 404'
    })
  })

module.exports = router
