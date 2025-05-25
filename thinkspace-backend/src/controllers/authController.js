const User = require('../models/User');
const OTP = require("../models/OTP");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

//send otp

const sendotp = async(req, res) => {
    try {
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent) {
            return res.status(401).json({
                success:false,
                message:'User already registered',
            })
        }

        //generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        //check unique otp or not
        let result = await OTP.findOne({otp: otp});
        console.log("OTP generated: ", OTP);
        console.log("Result", result);
        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            result = await OTP.findOne({ otp: otp});
        }

        const otpPayload = {email, otp};

        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

         // Send OTP via email
        const emailBody = `<h1>Your OTP is: ${otp}</h1>`;
        await mailSender(email, "Your OTP for ThinkSpace", emailBody);

        res.status(200).json({
            success:true,
            message:'OTP Sent Successfully',
            otp,
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



// Signup Controller
const signup = async (req, res) => {
    try {
        console.log("Incoming request:", req.body);
        const { name, email, password, confirmPassword, otp } = req.body;


        if (!name || !email || !password || !confirmPassword || !otp) {
            console.log("Missing fields");
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required' 
            });
        }

        //match password
        if(password !== confirmPassword) {
            console.log("Password mismatch");
            return res.status(400).json({
                success:false,
                message:'Password and confirmPassword value does not match, please try again',
            });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists:", email);
            return res.status(400).json({ 
                success: false,
                message: 'User already exists' 
            });
        }

        //OTP
        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOtp);

        //validate OTP
        if(recentOtp.length == 0) {
            console.log("OTP not found");
            //Otp not found
            return res.status(400).json({
                success:false,
                message:'The OTP is not valid',
            })
        } else if(otp !== recentOtp[0].otp) {
            console.log("OTP mismatch:", otp, "!=", recentOtp[0].otp);
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            })
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed");

        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
        });
        
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        console.log("User created:", user._id);

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
            name: user.name
        };

        
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: "2h" }
        );

        const userResponse = {
            name: user.name,
            email: user.email,
            image: user.image,
            _id: user._id,
            token,
        };

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


const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id; // This comes from the auth middleware

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Both current password and new password are required'
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 8 characters long'
            });
        }

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(403).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        existingUser.password = hashedNewPassword;
        await existingUser.save();

        // Generate new token with updated info
        const payload = {
            email: existingUser.email,
            id: existingUser._id,
        };
        
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: "2h" }
        );

        return res.status(200).json({
            success: true,
            message: 'Password changed successfully',
            token 
        });

    } catch (error) {
        console.error("Change password error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while changing password",
            error: error.message
        });
    }
};

module.exports = { signup, login, sendotp, changePassword };
