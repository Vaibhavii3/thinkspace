const express = require("express");
const router = express.Router();
const { saveAiNote, getAllAiNotes, deleteAiNote } = require("../controllers/aiNotesController");
const auth = require('../middlewares/authMiddleware.js');

router.use(auth);

router.post("/save", saveAiNote);

router.get("/", getAllAiNotes);

router.delete('/:id', deleteAiNote);

module.exports = router;
