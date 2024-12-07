const axios = require("axios");
const Content = require('../models/Content');

// Controller for AI content generation
const generateAIContent = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    

    // if (!apiUrl || !apiKey) {
    //     return res.status(500).json({ error: "API URL or API Key is missing in environment variables." });
    // }

    try {
        console.log("Received prompt:", prompt);

        const apiUrl = process.env.URL;
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

        // Extract generated content
        const generatedContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedContent) {
            throw new Error("Empty response from Gemini AI.");
        }

        // Optionally save the content to the database
        // const content = new Content({ inputText: prompt, generatedText: generatedContent });
        // await content.save();

        res.status(200).json({ result: generatedContent });

    } catch (error) {
        console.error("Error with AI content generation:", error);
        res.status(400).json({
            error: error.response?.data?.error?.message || "Invalid request to AI API",

        });
    }
};

module.exports = { generateAIContent };
