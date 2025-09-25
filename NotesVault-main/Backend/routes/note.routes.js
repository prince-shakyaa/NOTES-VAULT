const express = require("express");
const {
  addNote,
  editNote,
  getAllNotes,
  deleteNote,
  updatePinned,
  searchNotes,
} = require("../controllers/note.controller");

const { authenticateToken } = require("../utilities/authenticateToken");

const router = express.Router();

router.post("/add-note", authenticateToken, addNote);
router.put("/edit-note/:noteId", authenticateToken, editNote);
router.get("/get-all-notes", authenticateToken, getAllNotes);
router.delete("/delete-note/:noteId", authenticateToken, deleteNote);
router.put("/update-note-pinned/:noteId", authenticateToken, updatePinned);
router.get("/search-notes", authenticateToken, searchNotes);

module.exports = router;
