const mongoose = require("mongoose");

const AiNoteSchema = new mongoose.Schema({
  // title: { type: String, default: "Untitled Note" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("AiNote", AiNoteSchema);
