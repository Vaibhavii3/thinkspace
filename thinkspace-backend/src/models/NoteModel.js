const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: null },
    },
    
);

module.exports = mongoose.model('Note', noteSchema);