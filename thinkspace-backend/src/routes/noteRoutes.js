const express = require("express");
const router = express.Router();
const Note = require('../models/NoteModel');

// Placeholder data
// let notes = [];

// Create a new note
router.post('/', async (req, res) => {
    try {
        const newNote = new Note({
            text: req.body.text,
            priority: req.body.priority,
        });
        await newNote.save(); // Save the note to the database
        res.status(201).json(newNote); // Respond with the newly created note
    } catch (err) {
        res.status(500).json({ message: 'Error creating note', error: err });
    }
});


// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find(); // Get all notes from the database
        res.json(notes); // Respond with the notes
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notes', error: err });
    }
});

// Get a specific note by ID
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id); // Find a note by its ID
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note); // Respond with the note
    } catch (err) {
        res.status(500).json({ message: 'Error fetching note', error: err });
    }
});

// Update a note by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text, priority: req.body.priority },
            { new: true } // Return the updated document
        );
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(updatedNote); // Respond with the updated note
    } catch (err) {
        res.status(500).json({ message: 'Error updating note', error: err });
    }
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id); // Delete a note by its ID
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted' }); // Respond with a success message
    } catch (err) {
        res.status(500).json({ message: 'Error deleting note', error: err });
    }
});


module.exports = router;
