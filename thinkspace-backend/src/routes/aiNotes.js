const express = require("express");
const router = express.Router();
const { saveAiNote, getAllAiNotes } = require("../controllers/aiNotesController");
// const { saveAiNote } = require("../controllers/aiNotesController");

// Route to save AI-generated notes
router.post("/save-ai-note", saveAiNote);

// Route to fetch all AI-generated notes
router.get("/ai-notes", getAllAiNotes);

module.exports = router;
