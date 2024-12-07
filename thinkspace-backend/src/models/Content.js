const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    inputText: { type: String, required: true },
    generatedText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', ContentSchema);
