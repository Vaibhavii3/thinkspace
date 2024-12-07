const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config(); 

const noteRoutes = require("./src/routes/noteRoutes");
const aiRoutes = require("./src/routes/aiRoutes");

const connectDB = require("../thinkspace-backend/src/config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());

// Routes    
app.use("/api/v1/notes", noteRoutes);
app.use("/api", aiRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});  

//start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





