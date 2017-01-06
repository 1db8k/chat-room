const router = require('express').Router()

module.exports = function routes () {
  function loginHandler (req, res, next) {
    res.render('login', { cssPath: 'loginStyles', title: 'Login' })
  }
  let routes = {
    'get': {
      '/': loginHandler,
      '/login': loginHandler,
      '/rooms': (req, res, next) => {
        res.render('rooms', { cssPath: 'roomsStyles', title: 'Rooms' })
      },
      '/chatroom': (req, res, next) => {
        res.render('chatroom', {
          cssPath: 'chatroomStyles',
          title: 'Chatroom'
        })
      },
      '*': (req, res, next) => {
        res.render('404', {
          cssPath: 'roomsStyles',
          title: 'Error 404'
        })
      }
    },
    'post': {
    }
  }

  function registerRoutes (routes, method) {
    for (var key in routes) {
      let value = routes[key]
      if (routes.hasOwnProperty(key) &&
      typeof value === 'object' &&
      value !== null &&
      value.constructor !== Array) {
        router.method(key, value)
      }
    }
  }
}
