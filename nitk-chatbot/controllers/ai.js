const { GoogleGenerativeAI } = require("@google/generative-ai");
const Location = require('../models/location'); // Ensure this path is correct
const data = require('./data'); // Ensure this path is correct

// Function to fetch locations (either from database or local data)
const getLocations = async () => {
    // Uncomment below line to fetch from database
    // const locs = await Location.find();
    let locs = data; // Using local data for now
    return locs;
};

const gemini = async (req, res) => {
    try {
        const { question } = req.body;

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Fetch all locations
        const locations = await getLocations();

        // Construct the prompt
        const prompt = `
        You are a NITK-specific chatbot designed to help students plan their activities on and off campus. Your task is to provide a time-optimized plan based on the user's query and the available locations. Always use the information provided in the locations array and ensure the output is in JSON format.

        Follow these steps:
        1. Analyze the user's question.
        2. Identify relevant locations from the provided list.
        3. Create a time-optimized plan that maximizes the number of places the user can visit.
        4. Provide a textual explanation of the plan in a human-readable format.

        Example:
        Question: "I want to visit the swimming pool, beach, and library today."
        Locations: ${JSON.stringify(locations)}
        Plan: Create a schedule that allows the user to visit all requested locations within their operating hours.

        Rules:
        - Only use information from the locations array.
        - Output must be in JSON format.
        - Ensure the plan is time-optimized.
        - Include a textual explanation of the plan within the JSON object under the key "textualExplanation".

        User's Question: ${question}
        Locations: ${JSON.stringify(locations)}
        `;

        // Generate response using Gemini AI
        const response = await model.generateContent([prompt]);
        const reply = response.response.candidates[0].content.parts[0].text;

        // Preprocess the response to remove Markdown syntax
        const cleanedReply = reply.replace(/```json/g, "").replace(/```/g, "").trim();

        // Parse the cleaned reply to ensure it's valid JSON
        console.log(cleanedReply);
        let parsedReply;
        try {
            parsedReply = JSON.parse(cleanedReply);
        } catch (e) {
            throw new Error("Invalid JSON format in the AI response.");
        }

        // Return the response
        console.log(parsedReply);
        return res.json(parsedReply);
    } catch (error) {
        console.error("Error in gemini function:", error);
        return res.status(400).json({
            error: error.message || "An error occurred while processing your request."
        });
    }
};

module.exports = { gemini };