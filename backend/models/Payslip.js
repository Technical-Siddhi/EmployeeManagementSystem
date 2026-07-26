const mongoose = require('mongoose');

const payslipSchema = new mongoose.Schema({
  payrollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payroll',
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  employeeName: {
    type: String,
    required: true
  },
  payslipNumber: {
    type: String,
    required: true,
    unique: true
  },
  monthYear: {
    type: String,
    required: true
  },
  qrCodeData: {
    type: String,
    default: ''
  },
  downloadUrl: {
    type: String,
    default: ''
  },
  netPayable: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Payslip', payslipSchema);
