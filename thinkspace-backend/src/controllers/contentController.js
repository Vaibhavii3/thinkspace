const Content = require('../models/Content');

const saveContent = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Prompt and content are required" });
    }

    try {
        const savedContent = await Content.create({ title, content, createdAt: new Date() });
        res.status(201).json({ message: "Content saved successfully", savedContent });
    } catch (error) {
        console.error("Error saving content:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { saveContent };