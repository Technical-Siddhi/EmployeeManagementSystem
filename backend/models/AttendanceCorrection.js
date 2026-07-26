const mongoose = require('mongoose');

const attendanceCorrectionSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  employeeName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  originalCheckIn: {
    type: String,
    default: 'Not Logged'
  },
  originalCheckOut: {
    type: String,
    default: 'Not Logged'
  },
  requestedCheckIn: {
    type: String,
    required: true,
    default: '09:00 AM'
  },
  requestedCheckOut: {
    type: String,
    required: true,
    default: '06:00 PM'
  },
  type: {
    type: String,
    enum: ['Forgot Check-In', 'Forgot Check-Out', 'Wrong Time', 'Device Error'],
    default: 'Forgot Check-In'
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  approvedBy: {
    type: String,
    default: null
  },
  adminComment: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AttendanceCorrection', attendanceCorrectionSchema);
