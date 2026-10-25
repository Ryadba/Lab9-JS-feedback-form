const express = require('express')
const path = require('path')
const bodyParser = require('body-parser') // parse the body of a POST request 

const indexRouter = require('./routes/index.js')

const app = express() // creates the web-app server

// enable parsing of the body of a POST request
app.use(bodyParser.urlencoded({ extended: false })) // parse the body 

const staticFileLocation = path.join(__dirname, 'public') // the public folder is where we put static files like images and CSS
app.use(express.static(staticFileLocation)) // tell the app to serve static files from the public folder

// tell app where the views (HTML files or templates) are
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs') // use handlebars to generate views

app.use('/', indexRouter) // all requests to the app will be passed to indexRouter

// start server running on port 3000
// const port = process.env.PORT || 3000
// const server = app.listen(port, function() {
//   console.log('Express server running on port', port)
//})


 //const server = app.listen(process.env.PORT || 3000, function() {
 //  console.log('Express server running on port', server.address().port)
 //})

// start server running on port 3000
 let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})