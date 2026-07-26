const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  employeeName: {
    type: String,
    required: [true, 'Employee name is required'],
    trim: true
  },
  department: {
    type: String,
    default: 'Engineering'
  },
  month: {
    type: String,
    required: true,
    default: 'March'
  },
  year: {
    type: Number,
    required: true,
    default: 2026
  },
  cycle: {
    type: String,
    enum: ['Monthly', 'Biweekly', 'Weekly', 'Quarterly', 'Custom'],
    default: 'Monthly'
  },
  workingDays: { type: Number, default: 22 },
  presentDays: { type: Number, default: 21 },
  leaveDays: { type: Number, default: 1 },
  overtimeHours: { type: Number, default: 8 },
  overtimePay: { type: Number, default: 2400 },
  basicSalary: { type: Number, default: 60000 },
  allowances: { type: Number, default: 48000 },
  grossSalary: { type: Number, default: 110400 },
  totalDeductions: { type: Number, default: 15900 },
  netSalary: { type: Number, default: 94500 },
  status: {
    type: String,
    enum: ['Draft', 'HR Review', 'Finance Approval', 'Admin Approval', 'Released'],
    default: 'Draft'
  },
  bankDetails: {
    bankName: { type: String, default: 'Silicon Valley National Bank' },
    accountHolder: { type: String, default: 'Alex Rivera' },
    accountNumber: { type: String, default: 'XXXX-XXXX-9842' },
    ifscCode: { type: String, default: 'SVNB0004921' },
    branch: { type: String, default: 'San Francisco Tech Core' },
    upiId: { type: String, default: 'alexrivera@svnb' }
  },
  approvalTimeline: [
    {
      step: String,
      status: String,
      updatedBy: String,
      date: { type: Date, default: Date.now }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Payroll', payrollSchema);
