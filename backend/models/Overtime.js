const mongoose = require('mongoose');

const overtimeSchema = new mongoose.Schema({
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
    default: Date.now
  },
  hours: {
    type: Number,
    required: true,
    default: 2.5
  },
  ratePerHour: {
    type: Number,
    default: 45
  },
  amount: {
    type: Number,
    default: 112.5
  },
  reason: {
    type: String,
    default: 'Q1 System Release & Server Deployment'
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  approvedBy: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Overtime', overtimeSchema);
