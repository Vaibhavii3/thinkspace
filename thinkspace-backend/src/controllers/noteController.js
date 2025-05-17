const Note = require("../models/NoteModel");

//fetch create new note
exports.createNote = async (req, res) => {
    const {title, text} = req.body;
    try {
        const newNote = new Note({
            title, text,
        });
        const savedNote = await newNote.save();
        res.status(201).json({ success: true, note: savedNote });
    }
    catch(error) {
        return res.status(500).json({
            error: "Error while creating note",
        });
    }
};

exports.getNotes = async (req, res) => {
    try {
        
        const notes = await Note.find();
        res.status(200).json({ success: true, notes });
    } catch (error) {
        res.status(500).json({ error: "Internal server error."});
    }
};


//update an existing note
exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, text } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, text },
            { new: true}
        );
        if (!updatedNote) return res.status(404).json({
            message: "Note not found" });
            res.status(200).json({success: true, note: updatedNote });
        } catch (error) {
            res.status(500).json({ message: "Error updating note", error });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note", error });
    }
};

