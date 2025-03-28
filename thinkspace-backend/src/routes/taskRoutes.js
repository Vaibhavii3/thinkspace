const express = require("express");
const router = express.Router();
const { addTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/", addTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
