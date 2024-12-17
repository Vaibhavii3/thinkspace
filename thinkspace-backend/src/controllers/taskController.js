const Task = require("../models/Task");

// Add Task
const addTask = async (req, res) => {
    try {
        const { description, date, notify } = req.body;
        const newTask = new Task({ description, date, notify });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Task
// const updateTask = async (req, res) => {
//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(task);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const updateTask = async (req, res) => {
    try {
        const updates = {};
        if (req.body.description !== undefined) updates.description = req.body.description;
        if (req.body.completed !== undefined) updates.completed = req.body.completed;

        // const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
        const task = await Task.findByIdAndUpdate(req.params.id, updates, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// Delete Task
const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addTask, getTasks, updateTask, deleteTask };
