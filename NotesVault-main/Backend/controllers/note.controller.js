const Note = require("../models/note.model");

// Add Note
exports.addNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) return res.status(400).json({ error: true, message: "Title is required" });
  if (!content) return res.status(400).json({ error: true, message: "Content is required" });

  try {
    const note = new Note({ title, content, tags: tags || [], userId: user._id });
    await note.save();
    return res.json({ error: false, note, message: "Note added successfully" });
  } catch {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Edit Note
exports.editNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();
    return res.json({ error: false, note, message: "Note updated successfully" });
  } catch {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Get All Notes
exports.getAllNotes = async (req, res) => {
  const { user } = req.user;
  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.status(200).json({ error: false, notes, message: "All notes retrieved successfully" });
  } catch {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    await Note.deleteOne({ _id: noteId, userId: user._id });
    return res.json({ error: false, message: "Note deleted successfully" });
  } catch {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Update Pinned
exports.updatePinned = async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    note.isPinned = isPinned;
    await note.save();
    return res.json({ error: false, note, message: "Note updated successfully" });
  } catch {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Search Notes
exports.searchNotes = async (req, res) => {
  const user = req.user;
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: true, message: "Search query is required" });
  }

  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });
    return res.json({ error: false, notes: matchingNotes, message: "Notes retrieved successfully" });
  } catch {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};
