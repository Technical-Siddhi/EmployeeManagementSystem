const express = require('express');
const auth = require('../middleware/auth');
const Leave = require('../models/Leave');

const router = express.Router();

// POST /api/leaves
// Employee creates own leave
// Admin/HR can create for any employeeId if provided
router.post('/', auth, async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason, employeeId } = req.body;

    if (!leaveType || !startDate || !endDate) {
      return res.status(400).json({ msg: 'leaveType, startDate, and endDate are required' });
    }

    const targetEmployeeId = req.user.role === 'employee' ? req.user.userId : employeeId;
    if (!targetEmployeeId) {
      return res.status(400).json({ msg: 'employeeId is required for this operation' });
    }

    const leave = new Leave({
      employeeId: targetEmployeeId,
      leaveType,
      startDate,
      endDate,
      reason: reason || '',
      status: 'pending',
    });

    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET /api/leaves
// Employee: only own leaves
// Admin/HR: all leaves
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'employee' ? { employeeId: req.user.userId } : {};

    const leaves = await Leave.find(query).populate('employeeId', 'name email role');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

function ensureApprover(req, res) {
  if (!['admin', 'hr'].includes(req.user.role)) {
    res.status(403).json({ msg: 'Forbidden' });
    return false;
  }
  return true;
}

// PUT /api/leaves/:id/approve
router.put('/:id/approve', auth, async (req, res) => {
  try {
    if (!ensureApprover(req, res)) return;

    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ msg: 'Leave not found' });

    leave.status = 'approved';
    await leave.save();

    res.json(leave);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// PUT /api/leaves/:id/reject
router.put('/:id/reject', auth, async (req, res) => {
  try {
    if (!ensureApprover(req, res)) return;

    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ msg: 'Leave not found' });

    leave.status = 'rejected';
    await leave.save();

    res.json(leave);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

