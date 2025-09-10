const express = require("express");
const router = express.Router();
const User = require("../model/User");

// Register (no password hashing)
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username exists" });

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login (no hashing, plain text comparison)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.password !== password) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ userId: user._id, username: user.username, history: user.history });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Save typing history
router.post("/history/:userId", async (req, res) => {
  const { userId } = req.params;
  const { snippet, timeTaken, charsPerMinute, date, totalChars, correctChars, wrongChars } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.history.push({ snippet, timeTaken, charsPerMinute, date, totalChars, correctChars, wrongChars });
    await user.save();

    res.status(200).json({ message: "History saved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
