const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: { type: String, default: "Untitled Note" },
        text: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);