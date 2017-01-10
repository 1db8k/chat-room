const router = require('express').Router()
const hlprs = require('../helpers')
const passport = require('passport')

router.get(['/', '/login'], (req, res, next) => {
  res.render('login', new hlprs.MustacheConfig('login', null, { loginHeader: true }))
})
  .get('/rooms', hlprs.midWare.redirectIfNotLoggedIn, (req, res, next) => {
    res.render('rooms', new hlprs.MustacheConfig('rooms', req.user))
  })

  .get('/chatroom', hlprs.midWare.redirectIfNotLoggedIn, (req, res, next) => {
    res.render('chatroom', new hlprs.MustacheConfig('chatroom', req.user))
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
    res.render('404', new hlprs.MustacheConfig('chatroom', req.user, { title: 'Error 404', cssPath: '404' }))
  })

module.exports = router
