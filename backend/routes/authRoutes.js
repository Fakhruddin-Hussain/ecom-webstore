const express = require('express');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Replace with a secure key in env for production
const SECRET = 'itIsASecret';

router.post('/register', async (req, res) => {
    try {
      const { username, password, role } = req.body;
      // Check if user already exists
      const existing = await User.findOne({ username });
      if (existing) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10); 
      // this is commented out because the password will be hashed before saving in models User.js
      const user = new User({ username, password: password, role });
      await user.save();
      res.status(201).json({ message: 'User created' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

router.post('/login', async (req, res) => {
  const { password, username } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials (user not found)' });
  }
  // Use the model's comparePassword method
  const isMatch = await user.comparePassword(password);
  // console.log(`Entered password: ${password}`);
  // console.log(`Stored hash: ${user.password}`);
  // console.log(`Password match: ${isMatch}`);
  if (!isMatch) {
    return res.status(401).json({ error: `Invalid credentials (wrong password)`});
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;