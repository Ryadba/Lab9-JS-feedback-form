const express = require('express')
const path = require('path')
const bodyParser = require('body-parser') // parse the body of a POST request 

const indexRouter = require('./routes/index')

const app = express() // creates the web-app server
// enable parsing of the body of a POST request
app.use(bodyParser.urlencoded({ extended: false })) // parse the body of a POST request and make it available

// tell app where the views (HTML files or templates) are
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs') // use handlebars to generate views

app.use('/', indexRouter) // all requests to the app will be passed to indexRouter

// start server running on port 3000
const port = process.env.PORT || 3000
const server = app.listen(port, function() {
   console.log('Express server running on port', port)
})