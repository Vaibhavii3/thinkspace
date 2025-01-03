const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    description: { type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model("Task", taskSchema);
