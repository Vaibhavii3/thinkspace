const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    description: { type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    notify: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
