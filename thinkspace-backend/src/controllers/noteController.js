const Note = require("../models/NoteModel");

//fetch create new note
exports.createNote = async (req, res) => {
    const {title, text} = req.body;
    try {
        const newNote = new Note({
            title, text, userId: req.user.id
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
        console.log("Fetching notes for user:", req.user.id);
        const notes = await Note.find({ userId: req.user.id });
        console.log("Fetched notes:", notes);
        res.status(200).json({ success: true, notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Internal server error."});
    }
};

//update an existing note
// exports.updateNote = async (req, res) => {
//     const { id } = req.params;
//     const { title, text } = req.body;
//     try {
//         const updatedNote = await Note.findByIdAndUpdate(
//             id,
//             { title, text },
//             { new: true}
//         );
//         if (!updatedNote) return res.status(404).json({
//             message: "Note not found" });
//             res.status(200).json({success: true, note: updatedNote });
//         } catch (error) {
//             res.status(500).json({ message: "Error updating note", error });
//     }
// };
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;

  try {
    const note = await Note.findOne({ _id: id, userId: req.user.id });

    if (!note) return res.status(404).json({ message: "Note not found or unauthorized" });

    note.title = title;
    note.text = text;
    const updatedNote = await note.save();

    res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete({_id: id, userId: req.user.id });
        
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note", error });
    }
};

