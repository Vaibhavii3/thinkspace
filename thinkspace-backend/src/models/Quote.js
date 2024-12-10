const mongoose = require('mongoose');

// Define the schema for quotes
const QuoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'Unknown',
  },
});

// Export the model
module.exports = mongoose.model('Quote', QuoteSchema);
