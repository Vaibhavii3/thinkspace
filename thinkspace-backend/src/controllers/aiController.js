// const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Controller for AI content generation
const generateAIContent = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        console.log("Received prompt:", prompt);
    // Call API
        const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
        const apiKey = process.env.API_KEY;

        // Prepare the request body
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        };

        // Make the API request using axios
        const response = await axios.post(`${apiUrl}?key=${apiKey}`, requestBody, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Gemini AI response:", response.data);
        
        const generatedContent = response.data?.cantents?.[0]?.parts?.[0]?.text;

        if (!generatedContent) {
            throw new Error("Empty response from Google Generative AI");
        }

        res.status(200).json({ result: generatedContent });
        
    } catch (error) {
        console.error("Error with AI content generation:", error.response?.data || error.message);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }

};

module.exports = { generateAIContent };
