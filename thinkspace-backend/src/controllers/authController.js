const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();

// Signup Controller
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required' 
            });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: 'User already exists' 
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword 
        });
        
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({ 
            success:true,
            message: "User created successfully", 
            token,
        });
            
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        });
    }
};

// Login Controller
const login = async (req, res) => {
    
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details carefully',
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found' 
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(403).json({
                success: false,
                message: "Password Incorrect"
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
        };

        
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: "2h" }
        );

        const userResponse = {
            ...user.toObject(),
            token,
            password: undefined
        };
            // user = user.toObject();
            // user.token = token;
            // user.password = undefined;

            // const options = {
            //     expires: new Date( Date.now() + 3*24*60*60*1000),
            //     httpOnly:true,
            // }

            return res.status(200).json({
                success:true,
                token,
                user: userResponse,
                message: 'User Logged in successfully',
            });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ 
            success:false,
            message: "Something went wrong", 
            error: error.message
        });
    }
};

module.exports = { signup, login };
