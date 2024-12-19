const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config(); 

const noteRoutes = require("./src/routes/noteRoutes");
const aiRoutes = require("./src/routes/aiRoutes");
const quotesRoutes = require('./src/routes/quotes');
const aiNotesRoutes = require('./src/routes/aiNotes');
const authRoutes = require("./src/routes/auth");
const taskRoutes = require("./src/routes/taskRoutes");
const userRoutes = require("./src/routes/userRoutes");
// const notificationRoutes = require("./src/routes/notificationRoutes");


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
app.use("/api/quotes", quotesRoutes);
app.use("/api", aiNotesRoutes);

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);
app.use("/api/users", userRoutes);

// app.use("/notifications", notificationRoutes);


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});  

//start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





