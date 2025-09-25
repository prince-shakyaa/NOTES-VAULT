const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) return res.status(400).json({ error: true, message: "Full name is required" });
  if (!email) return res.status(400).json({ error: true, message: "Email is required" });
  if (!password) return res.status(400).json({ error: true, message: "Password is required" });

  const isUser = await User.findOne({ email });
  if (isUser) return res.json({ error: true, message: "User already exists" });

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3600m" });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration successful",
  });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password) return res.status(400).json({ message: "Password is required" });

  const userInfo = await User.findOne({ email });
  if (!userInfo) return res.status(400).json({ message: "User not found" });

  if (userInfo.email === email && userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3600m" });

    return res.json({ error: false, message: "Login successful", email, accessToken });
  }

  return res.status(400).json({ error: true, message: "Invalid credentials" });
};

// Get User
exports.getUser = async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findById(user._id);
  if (!isUser) return res.sendStatus(401);

  return res.json({
    user: { fullName: isUser.fullName, email: isUser.email, _id: isUser._id, createdOn: isUser.createdOn },
    message: "",
  });
};
