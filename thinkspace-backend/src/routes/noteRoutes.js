const express = require("express");
const router = express.Router();

const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  archiveNote,
  pinNote,
  getArchivedNotes,
  getPinnedNotes,
} = require("../controllers/noteController");

router.get("/", getNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

router.post("/:id/archive", archiveNote);
router.post("/:id/pin", pinNote);

router.get("/archived", getArchivedNotes);
router.get("/pinned", getPinnedNotes);

module.exports = router;
