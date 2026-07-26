const mongoose = require('mongoose');

const bonusSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  employeeName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Performance Bonus', 'Festival Bonus', 'Referral Bonus', 'Joining Bonus', 'Retention Bonus', 'Custom Bonus'],
    default: 'Performance Bonus'
  },
  amount: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    default: 'March'
  },
  year: {
    type: Number,
    default: 2026
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Paid'],
    default: 'Approved'
  },
  remarks: {
    type: String,
    default: 'Q1 OKR Performance Benchmark Reward'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bonus', bonusSchema);
