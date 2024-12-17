const express = require("express");
const router = express.Router();
const { addTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/tasks", addTask);
router.get("/tasks", getTasks);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
