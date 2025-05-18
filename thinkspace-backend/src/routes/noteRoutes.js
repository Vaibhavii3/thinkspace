const express = require("express");
const router = express.Router();

const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const auth = require('../middlewares/authMiddleware.js');

router.use(auth);

router.get("/", getNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);



module.exports = router;
