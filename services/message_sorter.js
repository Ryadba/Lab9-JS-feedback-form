let { GoogleGenAI, Type } = require('@google/genai')
const departments = require('./departments.json')
const departmentsString = JSON.stringify(departments) //text form of the JSON

const genAI = new GoogleGenAI({})


module.exports = (feedbackComments) => {
    //ask LLM to return a array of matching departments for feedbackComments 

    let prompt = `Return a list of the most likely college department
    or departments to handle these feedback comments. A list of possible 
    departments and a description of their services is included. 
    Only include departments that seem to be a good fit for the feedback comments. 
    If there does not seem to be a good match, return an empty list. 
    Feedback comments: ${feedbackComments} 
    Department choices: ${departmentsString}`

    return genAI.models.generateContent({
        model: 'gemini-3.5-flash-lite',
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

