const mongoose = require('mongoose');

const incrementHistorySchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  employeeName: {
    type: String,
    required: true
  },
  oldSalary: {
    type: Number,
    required: true
  },
  newSalary: {
    type: Number,
    required: true
  },
  effectiveDate: {
    type: Date,
    default: Date.now
  },
  reason: {
    type: String,
    default: 'Annual Performance Appraisal & Market Adjustment'
  },
  approvedBy: {
    type: String,
    default: 'Victoria Vance (CEO)'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('IncrementHistory', incrementHistorySchema);
