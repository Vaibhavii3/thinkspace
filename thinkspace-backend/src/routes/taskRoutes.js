const express = require("express");
const router = express.Router();
const { addTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");

const auth = require('../middlewares/authMiddleware.js');

router.use(auth);

router.post("/", addTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
