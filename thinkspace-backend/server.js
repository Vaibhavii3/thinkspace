// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const connectDB = require("./src/config/db");
const noteRoutes = require("./src/routes/noteRoutes");
const app = express();

connectDB();

const mongoose = require("mongoose");

//connect to mongoose
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("ThinkSpace Backend is running!");
});

app.use("/api/notes", noteRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
