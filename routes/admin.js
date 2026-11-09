const express = require('express')
const router = express.Router()
const Feedback = require('../models').Feedback

router.get('/', function(req, res, next) {
    // Get all the feedback and display on a page
    Feedback.findAll().then(allFeedback => {
        console.log(allFeedback) // log all feedback to the console
        return res.render('admin', { feedback: allFeedback })
    })
})

module.exports = router