const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name is required'],
    trim: true,
    unique: true
  },
  code: {
    type: String,
    required: [true, 'Department code is required'],
    uppercase: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  businessUnit: {
    type: String,
    trim: true,
    default: 'Core Corporate'
  },
  headId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  headName: {
    type: String,
    default: 'Unassigned'
  },
  budget: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Department', departmentSchema);
