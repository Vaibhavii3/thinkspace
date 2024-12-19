const Task = require("../models/Task");
const { scheduleNotification } = require('../utils/scheduler');

// Add Task
const addTask = async (req, res) => {
    try {
        const { description, date, notify, userId } = req.body;
        const newTask = new Task({ description, date, notify, userId });
        await newTask.save();

        if (notify) {
            await scheduleNotification(newTask);
        }

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
        if (req.body.notify !== undefined) updates.notify = req.body.notify;
        if (req.body.date !== undefined) updates.date = req.body.date;

        const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
        // const task = await Task.findByIdAndUpdate(req.params.id, updates, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);

        if (task.notify && task.date) {
            await scheduleNotification(task);
        }

        res.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: error.message });
    }
};





// Delete Task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found"});

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addTask, getTasks, updateTask, deleteTask };
