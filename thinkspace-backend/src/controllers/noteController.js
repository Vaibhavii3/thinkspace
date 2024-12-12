const Note = require("../models/NoteModel");

//fetch create new note
exports.createNote = async (req, res) => {
    const {title, text} = req.body;
    try {
        const newNote = new Note({
            title, text,
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    }
    catch(error) {
        return res.status(500).json({
            error: "Error while creating note",
        });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ status: "saved"});
        const archivedNotes = await Note.find({ status: "archived"});
        const pinnedNotes = await Note.find({ status: "pinned"});


        console.log("Saved Notes:", notes);
        console.log("Archived Notes:", archivedNotes);
        console.log("Pinned Notes:", pinnedNotes);

        res.status(200).json({ notes, archivedNotes, pinnedNotes });
    } catch (error) {
        console.error("Error fetching notes:", error);
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
            res.status(200).json(updatedNote);
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


exports.archiveNote = async (req, res) => {
    const { id } = req.params;
    try {
        const archivedNote = await Note.findByIdAndUpdate(id, { status: "archived" }, { new: true });

        if (!archivedNote) {    
            return res.status(404).json({ message: "Note not found" });
        } 

        res.status(200).json({ message: "Note archived successfully.", archivedNote});

    }  catch (error) {
        console.error("Error archiving note:", error);
        res.status(500).json({ message: "Error Archiving note", error: error.message || "Unknown error" });
    }
};

exports.pinNote = async (req, res) => {
    const { id } = req.params;
    try {
        const pinnedNote = await Note.findByIdAndUpdate(id, {
            status: "pinned" }, { new: true});
            if (!pinnedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note pinned successfully.", pinnedNote});
    } catch (error) {
        res.status(500).json({ message: "Errir Pinning note", error});
    }
};

exports.getArchivedNotes = async (req, res) => {
    try {
        const archivedNotes = await Note.find({ status: "archived" });

        if (!archivedNotes.length) {
            return res.status(404).json({ message: "No archived notes found."})
        }

        res.status(200).json(archivedNotes);
    } catch (error) {
        console.error("Error fetching archived notes:", error);
        res.status(500).json({ message: "Error fetching archived notes:", error: error.message || "Unknown error" });
    }
};

exports.getPinnedNotes = async (req, res) => {
    try {
        const pinnedNotes = await Note.find({ status: "pinned" });

        if (!pinnedNotes.length) {
            return res.status(404).json({ message: "No pinned notes found."});
        }

        res.status(200).json(pinnedNotes);
    } catch (error) {
        console.error("Error fetching pinned notes:", error);
        res.status(500).json({ message: "Error fetching pinned notes.", error: error.message || "Unknown error" });
    }
};