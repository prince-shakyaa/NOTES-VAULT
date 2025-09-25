require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");

const app = express();

// Middleware
app.use(express.json());
app.set("json spaces", 2);

const allowedOrigins = [
  "https://notes-vault-delta.vercel.app",
  "http://localhost:5173",
];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => res.json({ data: "hello" }));
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

