const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Signup Controller
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Validate inputs
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12); // 12 salt rounds

        // Create and save user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        //Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "User created successfully", token, user: { id: user._id, name, email } });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });

        console.log('User found:', user); // Check if the user is found correctly

        //compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', isPasswordCorrect);
        
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        //Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

module.exports = { signup, login };
