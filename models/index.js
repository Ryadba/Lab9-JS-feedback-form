// Stores database configuration.
// future - will help connect to the correct database.
// sqlite3 locally
// PostgreSQL client-server at Azure

const { Sequelize } = require('sequelize')

// Define how to connect to the database
// What type of database?
// Where is the database?
// Do we need to authenticate to connect to the database?
// sqlite _ no authentication
// postgres _ yes, needs authentication.

const configuration = {
'storage': 'feedback.sqlite', // where is DataBase? "stored in a file called feedback.sqlite"
'dialect': 'sqlite' // what kind of Database?
}

const sequelizeDatabase = new Sequelize(configuration)

// Next step Use feedback JS file _ create a new feedback table
// and be able to use feedback objects in the app

// import all the model files - we only have one but could have many
const createFeedbackModel = require('./feedback')
const feedbackModel = createFeedbackModel(sequelizeDatabase)

const models = {} // Could have multiple models in the app
const feedbackModelName = feedbackModel.name

models[feedbackModel.name] = feedbackModel // {'Feedback': theModelObject }

module.exports = models