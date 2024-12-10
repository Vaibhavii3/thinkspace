const express = require('express');
const router = express.Router();
const { getQuotes, addQuote } = require('../controllers/quotesController');

// Route to fetch all quotes
router.get('/', getQuotes);

// Route to add a new quote
router.post('/', addQuote);

module.exports = router;
