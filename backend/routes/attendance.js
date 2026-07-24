const express = require('express');
const auth = require('../middleware/auth');
const Attendance = require('../models/Attendance');

const router = express.Router();

// @route   GET api/attendance
// @desc    Get attendance records
router.get('/', auth, async (req, res) => {
  try {
    const { date, status } = req.query;
    const query = { user: req.user.userId };
    if (date) query.date = { $gte: new Date(date), $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) };
    if (status) query.status = status;

    const attendance = await Attendance.find(query).populate('user', 'name email');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// @route   POST api/attendance/clockin
// @desc    Clock in
router.post('/clockin', auth, async (req, res) => {
  try {
    const existing = await Attendance.findOne({
      user: req.user.userId,
      date: { 
        $gte: new Date().setHours(0,0,0,0),
        $lt: new Date().setHours(23,59,59,999)
      }
    });
    if (existing.clockIn) {
      return res.status(400).json({ msg: 'Already clocked in today' });
    }

    const attendance = new Attendance({
      user: req.user.userId,
      clockIn: {
        time: new Date(),
        location: req.body.location || 'Office',
      },
    });
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// @route   POST api/attendance/clockout
// @desc    Clock out
router.post('/clockout', auth, async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      user: req.user.userId,
      clockIn: { $exists: true },
      clockOut: { $exists: false }
    });
    if (!attendance) {
      return res.status(400).json({ msg: 'No clock in record found' });
    }

    attendance.clockOut = {
      time: new Date(),
      location: req.body.location || 'Office',
    };
    attendance.status = 'present'; // calculate based on time
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

