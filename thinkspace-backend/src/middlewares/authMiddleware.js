const jwt = require('jsonwebtoken');
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    try{

        const token = req.body.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }
    
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch(error) {
        return res.status(401).json({
            success:false,
            message: 'token is invalid',
            error: error.message
        });
    }
    }
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }
}

module.exports = authMiddleware;
