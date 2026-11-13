require('dotenv').config() // Read API keys and other configuration values from the .env file

let { GoogleGenAI, Type, Environment } = require('@google/genai') 
const departments = require('./departments.json')

const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY}) // Create a Gemini client using environment variables

module.exports = (feedbackComments) => {
    
    const departmentString = JSON.stringify(departments) //text form of the JSON
    
    //ask LLM to return a array of matching departments for feedbackComments 
    const prompt = `Return a list of the most likely college department
    or departments to handle these feedback comments. A list of possible 
    departments and a description of their services is included. 
    Only include departments that seem to be a good fit for the feedback comments. 
    If there does not seem to be a good match, return an empty list. 
    Feedback Comments: ${feedbackComments}
    Department Choices: ${departmentString}`

    return genAI.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING
                }
            }
        }
    }).then(response => {
        return JSON.parse(response.text)
    })
}

// sorter('how to make appointment with advisor?').then(response => console.log(response))