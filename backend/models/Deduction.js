const mongoose = require('mongoose');

const deductionSchema = new mongoose.Schema({
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
    enum: ['Tax', 'PF', 'ESI', 'Loan EMI', 'Advance Salary', 'Penalty', 'Other'],
    default: 'Tax'
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
  description: {
    type: String,
    default: 'Monthly Statutory Deduction'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Deduction', deductionSchema);
