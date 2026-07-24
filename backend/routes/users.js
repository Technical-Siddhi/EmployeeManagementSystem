const express = require('express');
const auth = require('../middleware/auth');
const { requirePermission } = require('../middleware/roles');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// GET /api/users
// Admin: manage all users
// HR: view users only
// Employee: forbidden
router.get('/', auth, async (req, res) => {
  try {
    if (!['admin', 'hr'].includes(req.user.role)) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET /api/users/:id
router.get('/:id', auth, async (req, res) => {
  try {
    if (!['admin', 'hr'].includes(req.user.role)) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// POST /api/users
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    const { email, password, name, role, department } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ msg: 'email, password, and name are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Create user; schema pre-save will hash password.
    const user = new User({ email, password, name, role, department });
    await user.save();

    res.status(201).json({
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      department: user.department,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// PUT /api/users/:id
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    const { email, password, name, role, department } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (email !== undefined) user.email = email;
    if (name !== undefined) user.name = name;
    if (role !== undefined) user.role = role;
    if (department !== undefined) user.department = department;

    if (password) {
      // Ensure password hashing even when updating.
      user.password = await bcrypt.hash(password, 12);
    }

    await user.save();

    const updated = await User.findById(req.params.id).select('-password');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE /api/users/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'User not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

