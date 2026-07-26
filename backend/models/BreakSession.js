const mongoose = require('mongoose');

const breakSessionSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  employeeName: {
    type: String,
    required: true
  },
  breakType: {
    type: String,
    enum: ['Lunch', 'Tea', 'Meeting', 'Personal'],
    default: 'Lunch'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    default: null
  },
  durationMinutes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Completed'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BreakSession', breakSessionSchema);
