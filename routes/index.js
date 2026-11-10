const express = require('express')
const router = express.Router() // figures out what code to run in response to a request
// typically based on the URL, and the method, GET, POST
const databaseModels = require('../models')
const Feedback = databaseModels.Feedback

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

router.post('/submit-feedback', function (req, res, next) {
    // access the form data
    //  const formData = req.query //for a GET request, read the URL query
    const formData = req.body // for a POST request, read the body of the request
    

    // res.render('thank_you', {
    //    name: formData.name,
    //    email: formData.email,
    //    comments: formData.comments,
    //    currentStudent: formData['current-student']

    // save thedata in the form to the database
    Feedback.create(formData).then(newFeedback => { // this code runs after the feedback is saved
        
        res.render('thank_you', { ...formData })

        identifyDepartments(req.body.comments).then(departments => {
            console.log(departments)

            Feedback.update({ departments: departments }, { where: { id: newFeedback.id } } )
        }).catch(error => {
            //we dont need to tell the user. Feedback can be categorized manually, but thats not the use issue
            console.error(error)
        })


    }).catch(error => {
        // Adds to object containing data used to render template, will be shown in error template.
        res.locals.message = 'Error saving feedback. Please try again later.'
        next(error)
    })
})

module.exports = router // the last line of the file