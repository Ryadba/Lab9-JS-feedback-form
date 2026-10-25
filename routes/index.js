const express = require('express')
const router = express.Router() // figures out what code to run in response to a request
// typically based on the URL, and the method, GET, POST

// responds to get request to home page /
router.get('/', function (req, res, next) { // request, response, next
    // name of Handlebars file . name of a template, optional object with data for the 
    // template

    res.render('index', {
        title: 'Feedback Application',
        author: 'Ryad',
        timePageLoadedAt: new Date(), // add a property to the object with the current date
    })
})      // get request to the home page

router.get('/feedback-form', function (req, res, next) {
    res.render('student_feedback_form')
})

router.get('/submit-feedback', function (req, res, next) {
    // access the form data
    //  const formData = req.query //for a GET request, read the URL query
    const formData = req.body // for a POST request, read the body of the request
    console.log(formData)
    
    //todo- save the form data to a database.
    //automatically email someone when feedback was submitted




    res.render('thank_you', {
        name: formData.name,
        email: formData.email,
        comments: formData.comments,
        currentStudent: formData['current-student']
    })
})

module.exports = router // the last line of the file