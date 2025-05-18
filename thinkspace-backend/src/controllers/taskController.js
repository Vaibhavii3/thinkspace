const Task = require("../models/Task");

// Add Task
const addTask = async (req, res) => {
    try {
        // Debug what's in the request
        console.log("Request body:", req.body);
        console.log("Auth user:", req.user);
        
        const { description, date } = req.body;
        
        // Verify user ID exists in req.user
        if (!req.user || !req.user.id) {
            console.error("Missing user ID in token payload");
            return res.status(400).json({ 
                message: "Invalid user authentication - ID missing from token" 
            });
        }
        
        const userId = req.user.id;
        
        console.log(`Creating task for user: ${userId}, description: ${description}`);
        
        const newTask = new Task({ 
            description, 
            date, 
            userId 
        });
        
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Add task error:", error);
        res.status(500).json({ 
            message: error.message,
            stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
        });
    }
};

// Get Tasks
const getTasks = async (req, res) => {
    try {
        // Debug auth info
        console.log("Auth user in getTasks:", req.user);
        
        // Check if user ID exists
        if (!req.user || !req.user.id) {
            console.error("Missing user ID in token payload");
            return res.status(400).json({ 
                message: "Invalid user authentication - ID missing from token" 
            });
        }
        
        const userId = req.user.id;
        console.log(`Fetching tasks for user: ${userId}`);
        
        // Only fetch tasks belonging to the authenticated user
        const tasks = await Task.find({ userId });
        console.log(`Found ${tasks.length} tasks`);
        
        res.json(tasks);
    } catch (error) {
        console.error("Get tasks error:", error);
        res.status(500).json({ 
            message: error.message,
            stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
        });
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {
        const updates = req.body;
        
        if (!req.user || !req.user.id) {
            return res.status(400).json({ 
                message: "Invalid user authentication - ID missing from token" 
            });
        }
        
        const userId = req.user.id;
        
        // Find the task and ensure it belongs to the user
        const task = await Task.findOne({ 
            _id: req.params.id, 
            userId 
        });
        
        if (!task) return res.status(404).json({ message: "Task not found or access denied" });
        
        // Apply updates
        Object.keys(updates).forEach(key => {
            task[key] = updates[key];
        });
        
        await task.save();
        res.json(task);
    } catch (error) {
        console.error("Update task error:", error);
        res.status(500).json({ 
            message: error.message,
            stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
        });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ 
                message: "Invalid user authentication - ID missing from token" 
            });
        }
        
        const userId = req.user.id;
        
        // First find the task to verify ownership
        const task = await Task.findOne({ 
            _id: req.params.id, 
            userId 
        });
        
        if (!task) return res.status(404).json({ message: "Task not found or access denied" });
        
        // Then delete it
        await Task.findByIdAndDelete(req.params.id);
        
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Delete task error:", error);
        res.status(500).json({ 
            message: error.message,
            stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
        });
    }
};

module.exports = { addTask, getTasks, updateTask, deleteTask };