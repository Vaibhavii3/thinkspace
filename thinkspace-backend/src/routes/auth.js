const express = require('express');
const router = express.Router();
const { signup, login, sendotp } = require('../controllers/authController');


// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

router.post('/sendotp', sendotp);

module.exports = router;
