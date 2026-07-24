const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clockIn: {
    time: Date,
    location: String, // optional GPS
  },
  clockOut: {
    time: Date,
    location: String,
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half-day'],
    default: 'absent',
  },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);

