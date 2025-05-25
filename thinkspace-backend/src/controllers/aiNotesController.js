const AiNote = require("../models/AiNote");

// Save AI Note
exports.saveAiNote = async (req, res) => {

  try {

  console.log("Request Body:", req.body);

  const {title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Both title and Content is required" });
  }

    const newNote = AiNote({ title, content, userId: req.user.id });

    const savedNote = await newNote.save();
    res.status(200).json({ success:true ,note: savedNote });

  } catch (error) {
    console.error("Error saving AI note:", error.message || error);
    res.status(500).json({ error: "Failed to save AI note" });
  }
};

// Fetch All AI Notes
exports.getAllAiNotes = async (req, res) => {
  try {
    const notes = await AiNote.find({ userId: req.user.id });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Error fetching AI notes:", error.message || error);
    res.status(500).json({ error: "Failed to fetch AI notes" });
  }
};

exports.deleteAiNote = async (req, res) => {
  const { id } = req.params;
  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const deletedNote = await AiNote.findByIdAndDelete({ _id: id, userId: req.user.id });

    if (!deletedNote) {
      return res.status(404).json({ message: "AI note not found or unauthorized" });
    }

    res.status(200).json({ message: "AI not deleted successfully" });
    
  } catch (error) {
    console.error("Error deleting AI note:", error);
    res.status(500).json({ message: "Error deleting AI note", error });
  }
};

