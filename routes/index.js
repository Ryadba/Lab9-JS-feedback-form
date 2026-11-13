const express = require('express')
const router = express.Router() // figures out what code to run in response to a request
// typically based on the URL, and the method, GET, POST

const databaseModels = require('../models')
const Feedback = databaseModels.Feedback

// Service that uses Gemini to identify which department should handle feedback
const identifyDepartments = require('../services/message_sorter')


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


router.post('/submit-feedback', async function (req, res, next) {

    // access the form data
    // const formData = req.query 
    // for a GET request, read the URL query

    const formData = req.body // for a POST request, read the body of the request


    // res.render('thank_you', {
    //    name: formData.name,
    //    email: formData.email,
    //    comments: formData.comments,
    //    currentStudent: formData['current-student']


    // save the data in the form to the database

    Feedback.create(formData)

        .then(newFeedback => { // this code runs after the feedback is saved

            console.log('Feedback saved:', newFeedback.id)

            // show thank you page immediately
            res.render('thank_you', { ...formData })

            // send comments to Gemini for department identification
            return identifyDepartments(formData.comments)

                .then(departments => {

                    console.log('Departments:', departments)

                    // update the database record with the identified departments
                    return Feedback.update(
                        { departments: departments },
                        { where: { id: newFeedback.id } }
                    )

                })

                .then(() => {

                    console.log('Database updated')

                })

                .catch(error => {

                    // we dont need to tell the user.
                    // Feedback can be categorized manually,
                    // but thats not a user issue
                    console.error('Department error:', error)

                })

        })

        .catch(error => {

            console.error('Create error:', error)

            // Adds to object containing data used to render template,
            // will be shown in error template.

            res.locals.message =
                'Error saving feedback. Please try again later.'

            next(error)

        })

})

// the last line of the file
module.exports = router