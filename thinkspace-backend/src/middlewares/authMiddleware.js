const jwt = require('jsonwebtoken');
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    try{

        const authHeader = req.header("authorization");
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Authorization header is missing'
            });
        }


        const token = authHeader.replace("Bearer ", "");
        if(!token) {
            return res.status(401).json({
            success:false,
            message:'Token Missing',
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
