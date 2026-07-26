const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Designation title is required'],
    trim: true,
    unique: true
  },
  code: {
    type: String,
    required: [true, 'Designation code is required'],
    uppercase: true,
    trim: true
  },
  level: {
    type: String,
    enum: ['L1 - Intern', 'L2 - Junior', 'L3 - Mid-Level', 'L4 - Senior', 'L5 - Tech Lead', 'L6 - Manager', 'L7 - Director / VP', 'L8 - C-Executive'],
    default: 'L4 - Senior'
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null
  },
  departmentName: {
    type: String,
    default: 'General / Cross-Functional'
  },
  description: {
    type: String,
    default: ''
  },
  salaryBand: {
    min: { type: Number, default: 40000 },
    max: { type: Number, default: 180000 }
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Designation', designationSchema);
