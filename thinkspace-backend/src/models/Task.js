const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    description: { type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    // notify: { type: Boolean, default: false }, // notification preference
    // NotificationTime: { type: Boolean, default: false }, // Track if the notification has been sent


    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model("Task", taskSchema);
