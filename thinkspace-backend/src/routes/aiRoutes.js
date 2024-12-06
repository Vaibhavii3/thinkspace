const express = require("express");
const { generateAIContent } = require("../controllers/aiController");

const router = express.Router();

const validatePrompt = (req, res, next) => {
    if (!req.body.prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }
    next();
};



// Route for AI content generation
router.post("/generate-ai", validatePrompt, generateAIContent);

module.exports = router;
