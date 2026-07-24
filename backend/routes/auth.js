const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { signToken } = require('../utils/jwt');

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role, department } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ msg: 'email, password, and name are required' });
    }

    // Allow only known roles. Default will be handled by schema.
    const allowedRoles = ['admin', 'hr', 'employee'];
    const safeRole = role && allowedRoles.includes(role) ? role : undefined;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const user = new User({ email, password, name, role: safeRole, department });
    await user.save();

    const token = signToken({ userId: user._id, role: user.role });

    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, role: user.role, name: user.name, department: user.department },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = signToken({ userId: user._id, role: user.role });

    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role, name: user.name, department: user.department },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// @route   POST api/auth/logout
// @desc    Client-side logout (stateless JWT)
router.post('/logout', async (_req, res) => {
  return res.status(200).json({ msg: 'Logged out' });
});

// @route   GET api/auth/me
// @desc    Get current user
router.get('/me', auth, async (req, res) => {
  try {
    // auth middleware already validated token and loaded req.user identity
    res.json({
      id: req.user.userId,
      email: req.user.email,
      role: req.user.role,
      name: req.user.name,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;


