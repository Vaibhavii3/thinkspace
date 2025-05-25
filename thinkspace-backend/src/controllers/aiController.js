const axios = require("axios");
const Content = require('../models/Content');

// Controller for AI content generation
const generateAIContent = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        console.log("Received prompt:", prompt);

        const apiUrl = process.env.URL;
        const apiKey = process.env.API_KEY;

        // Prepare the request body
        const requestBody = {
            contents: [
                { 
                    role: "user", 
                    parts: [{ text: prompt }] 
                }
            ],
            generationConfig: {
                maxOutputTokens: 250,
                temperature: 0.7,
            },
        };

        // Make the API request using axios
        const response = await axios.post(`${apiUrl}?key=${apiKey}`, requestBody, { 
            headers: {
                "Content-Type": "application/json",
                // "x-goog-api-key": apiKey,
            }
        });

        console.log("Gemini AI response:", response.data);

        // Extract generated content
        const generatedContent = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated";

        if (!generatedContent) {
            console.error("Empty response from Gemini AI.");
            return res.status(500).json({ error: "No content generated. Check your prompt or API configuration." });
        }

        res.status(200).json({ result: generatedContent });

    } catch (error) {
        console.error("Error with AI content generation:", error.response?.data || error.messsage);

        res.status(400).json({
            error: error.response?.data?.error || "Invalid request to Gemini AI API",
        });
    }
};

module.exports = { generateAIContent };
