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
    const allowedRoles = ['admin', 'hr', 'manager', 'employee', 'Admin', 'HR', 'Manager', 'Employee'];
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

// @route   POST api/auth/google
// @desc    Google OAuth Sign-In & Registration
router.post('/google', async (req, res) => {
  const { idToken, mode, role, department } = req.body;

  if (!idToken) {
    return res.status(400).json({ success: false, message: 'Google ID Token is required' });
  }

  try {
    const { verifyGoogleToken } = require('../services/googleAuthService');
    const AuditLog = require('../models/AuditLog');

    const googlePayload = await verifyGoogleToken(idToken);
    let user = await User.findOne({ email: googlePayload.email });

    if (!user) {
      if (mode === 'register') {
        // Create new user from Google registration
        user = new User({
          name: googlePayload.name || 'Google User',
          email: googlePayload.email,
          role: role || 'employee',
          department: department || 'General',
          googleId: googlePayload.googleId,
          provider: 'google',
          avatar: googlePayload.avatar,
          emailVerified: true,
        });
        await user.save();

        const token = signToken({ userId: user._id, role: user.role });

        // Log Audit Log Event
        try {
          await AuditLog.create({
            user: user._id,
            userEmail: user.email,
            userName: user.name,
            userRole: user.role,
            action: 'REGISTER_GOOGLE_SUCCESS',
            category: 'Security',
            details: `New user registration via Google OAuth for ${user.email}`,
            ipAddress: req.ip || req.connection.remoteAddress,
            status: 'Success',
          });
        } catch (logErr) {}

        return res.json({
          success: true,
          token,
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            department: user.department,
            avatar: user.avatar,
            provider: user.provider,
          },
        });
      }

      // Log Security Audit Failure Event for un-registered login attempt
      try {
        await AuditLog.create({
          action: 'LOGIN_GOOGLE_FAILED',
          category: 'Security',
          details: `Unregistered Google email authentication attempt: ${googlePayload.email}`,
          ipAddress: req.ip || req.connection.remoteAddress,
          status: 'Failure',
        });
      } catch (logErr) {}

      return res.status(403).json({
        success: false,
        message: 'This email is not registered. Please contact your administrator or register a new account.',
      });
    }

    // Existing employee account found -> Update Google profile fields
    user.googleId = googlePayload.googleId;
    user.provider = 'google';
    if (googlePayload.avatar) user.avatar = googlePayload.avatar;
    user.emailVerified = true;
    await user.save();

    const token = signToken({ userId: user._id, role: user.role });

    // Log Audit Log Success Event
    try {
      await AuditLog.create({
        user: user._id,
        userEmail: user.email,
        userName: user.name,
        userRole: user.role,
        action: 'LOGIN_GOOGLE_SUCCESS',
        category: 'Security',
        details: `Successful Google OAuth login for ${user.email}`,
        ipAddress: req.ip || req.connection.remoteAddress,
        status: 'Success',
      });
    } catch (logErr) {}

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        department: user.department,
        avatar: user.avatar || googlePayload.avatar,
        provider: user.provider,
      },
    });
  } catch (err) {
    res.status(401).json({ success: false, message: `Google authentication failed: ${err.message}` });
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


