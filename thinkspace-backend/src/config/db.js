const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
        mongoose.connect(process.env.MONGODB_URI)
                .then(console.log("DB Connected Successfully"))
                .catch( (error) => {
                        console.log("DB Facing Connection Issues");
                        console.log(error);
                        process.exit(1);
        } ) 
};

module.exports = connectDB;