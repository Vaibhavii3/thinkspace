const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: { 
        type: String, 
        required: true,
    },
    token:{
        type: String,
    },
    resetPasswordExpires:{
        type: Date,
    },
    image:{
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
