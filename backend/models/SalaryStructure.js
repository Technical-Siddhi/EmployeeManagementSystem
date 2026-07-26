const mongoose = require('mongoose');

const salaryStructureSchema = new mongoose.Schema({
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
  templateName: {
    type: String,
    default: 'Standard Software Engineer Band'
  },
  basicSalary: { type: Number, required: true, default: 60000 },
  hra: { type: Number, default: 24000 },
  specialAllowance: { type: Number, default: 12000 },
  medicalAllowance: { type: Number, default: 3000 },
  travelAllowance: { type: Number, default: 4000 },
  internetAllowance: { type: Number, default: 2000 },
  foodAllowance: { type: Number, default: 3000 },
  bonus: { type: Number, default: 5000 },
  incentive: { type: Number, default: 0 },
  overtimePay: { type: Number, default: 0 },
  providentFund: { type: Number, default: 7200 },
  professionalTax: { type: Number, default: 200 },
  incomeTax: { type: Number, default: 8500 },
  otherDeductions: { type: Number, default: 0 },
  grossSalary: { type: Number, default: 115000 },
  netSalary: { type: Number, default: 99100 }
}, {
  timestamps: true
});

module.exports = mongoose.model('SalaryStructure', salaryStructureSchema);
