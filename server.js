const express = require('express')
const exphbs = require('express-handlebars')
const passport = require('passport')
const path = require('path')
const chatroom = require('./app')
const app = express()
const port = process.env.PORT || process.argv[2] || 3000

app.disable('x-powered-by')
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, 'public')))

app.use(chatroom.session)
app.use(passport.initialize())
app.use(passport.session())

app.use(chatroom.router)

app.listen(port, () => {
  let now = new Date()
  console.log(`Web server running on port ${port}. Restarted at ${now.toDateString()} ${now.toTimeString()}`)
})
