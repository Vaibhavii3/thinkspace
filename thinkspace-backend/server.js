// server.js
const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const noteRoutes = require("./src/routes/noteRoutes");
require("dotenv").config(); 

const connectDB = require("../thinkspace-backend/src/config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

//connect to mongoose
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("Failed to connect to MongoDB", err));

// Routes    
app.use("/api/v1/notes", noteRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});  

//start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





