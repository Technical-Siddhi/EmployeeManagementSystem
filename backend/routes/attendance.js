const express = require('express');
const auth = require('../middleware/auth');
const Attendance = require('../models/Attendance');
const Shift = require('../models/Shift');
const AttendanceCorrection = require('../models/AttendanceCorrection');
const Holiday = require('../models/Holiday');
const Overtime = require('../models/Overtime');
const BreakSession = require('../models/BreakSession');

const router = express.Router();

// Seed initial benchmark data if empty
const seedAttendanceDataIfEmpty = async () => {
  try {
    const shiftCount = await Shift.countDocuments();
    if (shiftCount === 0) {
      await Shift.insertMany([
        {
          name: 'General Core Shift',
          type: 'General',
          startTime: '09:00 AM',
          endTime: '06:00 PM',
          breakDurationMinutes: 60,
          gracePeriodMinutes: 15,
          lateThresholdMinutes: 30,
          halfDayThresholdHours: 4,
          weeklyOffDays: ['Saturday', 'Sunday']
        },
        {
          name: 'Morning Tech Ops Shift',
          type: 'Morning',
          startTime: '07:00 AM',
          endTime: '04:00 PM',
          breakDurationMinutes: 45,
          gracePeriodMinutes: 15,
          lateThresholdMinutes: 30,
          halfDayThresholdHours: 4,
          weeklyOffDays: ['Saturday', 'Sunday']
        },
        {
          name: 'Night Infrastructure Shift',
          type: 'Night',
          startTime: '09:00 PM',
          endTime: '06:00 AM',
          breakDurationMinutes: 60,
          gracePeriodMinutes: 20,
          lateThresholdMinutes: 45,
          halfDayThresholdHours: 4,
          weeklyOffDays: ['Saturday', 'Sunday']
        },
        {
          name: 'Flexible Remote Band',
          type: 'Work From Home',
          startTime: '10:00 AM',
          endTime: '07:00 PM',
          breakDurationMinutes: 60,
          gracePeriodMinutes: 30,
          lateThresholdMinutes: 60,
          halfDayThresholdHours: 4,
          weeklyOffDays: ['Saturday', 'Sunday']
        }
      ]);

      await Holiday.insertMany([
        { name: 'New Year Day', date: new Date('2026-01-01'), region: 'Global', isPublic: true },
        { name: 'International Labor Day', date: new Date('2026-05-01'), region: 'Global', isPublic: true },
        { name: 'Independence & Liberty Day', date: new Date('2026-07-04'), region: 'US Tier', isPublic: true },
        { name: 'Annual Founder Day', date: new Date('2026-10-15'), region: 'Global', isOptional: true }
      ]);

      await AttendanceCorrection.insertMany([
        {
          employeeName: 'Alex Rivera',
          date: new Date('2026-03-24'),
          originalCheckIn: 'Not Logged',
          originalCheckOut: '06:05 PM',
          requestedCheckIn: '09:02 AM',
          requestedCheckOut: '06:05 PM',
          type: 'Forgot Check-In',
          reason: 'Biometric Scanner Client Timeout at HQ Entry Gate',
          status: 'Approved',
          approvedBy: 'Sarah Connor (HR)',
          adminComment: 'Verified via CCTV entry log.'
        },
        {
          employeeName: 'Elena Rostova',
          date: new Date('2026-03-26'),
          originalCheckIn: '09:10 AM',
          originalCheckOut: 'Not Logged',
          requestedCheckIn: '09:10 AM',
          requestedCheckOut: '06:30 PM',
          type: 'Forgot Check-Out',
          reason: 'Late emergency client release sync',
          status: 'Pending'
        }
      ]);

      await Overtime.insertMany([
        {
          employeeName: 'Alex Rivera',
          date: new Date('2026-03-25'),
          hours: 2.5,
          ratePerHour: 45,
          amount: 112.5,
          reason: 'Production DB Migration & Server Patching',
          status: 'Approved',
          approvedBy: 'Victoria Vance'
        }
      ]);
    }
  } catch (err) {
    console.warn('Seed attendance data notice:', err.message);
  }
};

seedAttendanceDataIfEmpty();

// ==========================================
// 1. LIVE DASHBOARD & STATS
// ==========================================
router.get('/live-stats', auth, async (req, res) => {
  try {
    res.json({
      workingCount: 142,
      onBreakCount: 18,
      lateCount: 6,
      onLeaveCount: 12,
      remoteCount: 34,
      shiftDistribution: [
        { shift: 'General Core', count: 95 },
        { shift: 'Morning Ops', count: 30 },
        { shift: 'Night Shift', count: 12 },
        { shift: 'WFH Band', count: 23 }
      ]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 2. BREAK SESSIONS API
// ==========================================
router.post('/break/start', auth, async (req, res) => {
  try {
    const { breakType, employeeName } = req.body;
    const session = new BreakSession({
      employeeId: req.user._id,
      employeeName: employeeName || req.user.name || 'Alex Rivera',
      breakType: breakType || 'Lunch',
      startTime: new Date(),
      status: 'Active'
    });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/break/end', auth, async (req, res) => {
  try {
    const session = await BreakSession.findOne({
      employeeId: req.user._id,
      status: 'Active'
    }).sort({ createdAt: -1 });

    if (!session) return res.status(404).json({ message: 'No active break session found' });

    session.endTime = new Date();
    session.durationMinutes = Math.round((session.endTime - session.startTime) / 60000);
    session.status = 'Completed';
    await session.save();

    res.json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/break/active', auth, async (req, res) => {
  try {
    const session = await BreakSession.findOne({
      employeeId: req.user._id,
      status: 'Active'
    });
    res.json(session || null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 3. SHIFT MANAGEMENT APIs
// ==========================================
router.get('/shifts', auth, async (req, res) => {
  try {
    const shifts = await Shift.find().sort({ createdAt: -1 });
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/shifts', auth, async (req, res) => {
  try {
    const shift = new Shift(req.body);
    await shift.save();
    res.status(201).json(shift);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 4. ATTENDANCE CORRECTIONS (REGULARIZATION) APIs
// ==========================================
router.get('/corrections', auth, async (req, res) => {
  try {
    const corrections = await AttendanceCorrection.find().sort({ createdAt: -1 });
    res.json(corrections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/corrections', auth, async (req, res) => {
  try {
    const correction = new AttendanceCorrection(req.body);
    await correction.save();
    res.status(201).json(correction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/corrections/:id/approve', auth, async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    const correction = await AttendanceCorrection.findByIdAndUpdate(
      req.params.id,
      {
        status: status || 'Approved',
        approvedBy: req.user?.name || 'Authorized Admin',
        adminComment: adminComment || ''
      },
      { new: true }
    );
    res.json(correction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 5. OVERTIME APIs
// ==========================================
router.get('/overtime', auth, async (req, res) => {
  try {
    const overtimes = await Overtime.find().sort({ createdAt: -1 });
    res.json(overtimes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/overtime', auth, async (req, res) => {
  try {
    const overtime = new Overtime(req.body);
    await overtime.save();
    res.status(201).json(overtime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/overtime/:id/approve', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const overtime = await Overtime.findByIdAndUpdate(
      req.params.id,
      {
        status: status || 'Approved',
        approvedBy: req.user?.name || 'Authorized Admin'
      },
      { new: true }
    );
    res.json(overtime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 6. HOLIDAY MANAGEMENT APIs
// ==========================================
router.get('/holidays', auth, async (req, res) => {
  try {
    const holidays = await Holiday.find().sort({ date: 1 });
    res.json(holidays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/holidays', auth, async (req, res) => {
  try {
    const holiday = new Holiday(req.body);
    await holiday.save();
    res.status(201).json(holiday);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 7. EXISTING CLOCK IN / OUT ENDPOINTS
// ==========================================
router.get('/', auth, async (req, res) => {
  try {
    const { date, status } = req.query;
    const query = {};
    if (date) query.date = { $gte: new Date(date), $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) };
    if (status) query.status = status;

    const attendance = await Attendance.find(query).populate('user', 'name email');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/clockin', auth, async (req, res) => {
  try {
    const existing = await Attendance.findOne({
      user: req.user.userId,
      date: { 
        $gte: new Date().setHours(0,0,0,0),
        $lt: new Date().setHours(23,59,59,999)
      }
    });
    if (existing && existing.clockIn) {
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

router.post('/clockout', auth, async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      user: req.user.userId,
      clockIn: { $exists: true },
      clockOut: { $exists: false }
    });
    if (!attendance) {
      return res.status(400).json({ msg: 'No active clock in record found' });
    }

    attendance.clockOut = {
      time: new Date(),
      location: req.body.location || 'Office',
    };
    attendance.status = 'present';
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
