const express = require('express')
// const favicon = require('serve-favicon')
const path = require('path')
const exphbs = require('express-handlebars')
const chatroom = require('./app')
const app = express()
const port = process.env.PORT || process.argv[2] || 3000

app.disable('x-powered-by')
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, 'public')))

app.use(chatroom.router)

// app.get('/public/favicon', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/favicon.ico'))
// })

app.listen(port, () => {
  let now = new Date()
  console.log(`Web server running on port ${port}. Restarted at ${now.toDateString()} ${now.toTimeString()}`)
})
