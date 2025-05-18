const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String},
    completed: { type: Boolean, default: false },
    emailReminder: { type: Boolean, default: false},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model("Task", taskSchema);
