const express = require("express");
const router = express.Router();
const Note = require("../models/NoteModel");

// Create a new note
router.post("/api/notes", async (req, res) => {
  try {
    const { title, text } = req.body;

    // Validate fields
    if (!title || !text) {
      return res.status(400).json({ message: "Title and text are required." });
    }

    // Save note to DB
    const newNote = await Note.create({ title, text });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Get all notes
router.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find(); // Retrieve all notes
    res.json(notes); // Respond with notes
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Get a specific note by ID
router.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Update a note by ID
router.put("/api/notes/:id", async (req, res) => {
  const { title, text } = req.body;

  // Validate fields
  if (!title || !text) {
    return res.status(400).json({ message: "Title and text are required." });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, text, updatedAt: Date.now() },
      { new: true } // Return the updated note
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Delete a note by ID
router.delete("/api/notes/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
