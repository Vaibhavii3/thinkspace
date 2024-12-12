const AiNote = require("../models/AiNote");

// Save AI Note
exports.saveAiNote = async (req, res) => {

  try {

  console.log("Request Body:", req.body);

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Both title and Content is required" });
  }

    const newNote = await AiNote.create({ title, content });
    res.status(200).json({ note: newNote });
  } catch (error) {
    console.error("Error saving AI note:", error.message || error);
    res.status(500).json({ error: "Failed to save AI note" });
  }
};

// Fetch All AI Notes
exports.getAllAiNotes = async (req, res) => {
  try {
    const notes = await AiNote.find();
    res.status(200).json({ notes });
  } catch (error) {
    console.error("Error fetching AI notes:", error.message || error);
    res.status(500).json({ error: "Failed to fetch AI notes" });
  }
};

