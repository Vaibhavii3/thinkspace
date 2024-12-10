const Quote = require('../models/Quote');

// Get all quotes
const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quotes', error: err.message });
  }
};

// Add a new quote
const addQuote = async (req, res) => {
  const { text, author } = req.body;
  const quote = new Quote({ text, author });

  try {
    const newQuote = await quote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(400).json({ message: 'Error adding quote', error: err.message });
  }
};

module.exports = { getQuotes, addQuote };
