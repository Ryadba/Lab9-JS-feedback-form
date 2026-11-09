// Define how feedback is stored in the database
// Telling the database that the feedback table
// has a name, email, comments, isCurrentStudent
// column, and what type of data
// is stored in each of those columns

const { DataTypes } = require('sequelize')

function createFeedbackTable(sequelizeDatabase) {

    const Feedback = sequelizeDatabase.define(
        // todo - define columns in this table
        // name, email, comments, isCurrentStudent
        // sequelize will add id and createdAt columns

        'Feedback', // the table name
        {
            name: {
                type : DataTypes.STRING,
                allowNull: true  //allwed to be empty
            },
            email: {
                type : DataTypes.STRING,
                allowNull: true 
            },
            comments: {
                type : DataTypes.STRING,
                allowNull: false //comments are required 
            },
            isCurrentStudent:{
                type : DataTypes.BOOLEAN,
                allowNull: true,
                get(){
                    // if the database stores false, return 'no', if it stores true, return 'yes'
                    if (this.getDataValue('isCurrentStudent')) {
                        return 'yes'
                    } else {
                        return 'no'
                    }
                },
                set(newValue){
                    // convert 'yes' to true and 'no' to false to store in the database
                    if (newValue === 'yes') {
                        this.setDataValue('isCurrentStudent', true)
                    } else { // the value is 'no'
                        this.setDataValue('isCurrentStudent', false)
                    }
                }
            },
            departments: {
                type : DataTypes.JSON, //store the JSON Array
                allowNull: true,
                defaultValue: []
            }
        }
    )

    Feedback.sync({force: false}).then(() => console.log('Synced feedback table'))

    return Feedback
}

module.exports = createFeedbackTable