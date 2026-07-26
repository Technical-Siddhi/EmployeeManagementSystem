const mongoose = require('mongoose');

const officeLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Office name is required'],
    trim: true,
    unique: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  timezone: {
    type: String,
    default: 'UTC-5 (EST)'
  },
  workingHours: {
    type: String,
    default: '09:00 AM - 06:00 PM'
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  managerName: {
    type: String,
    default: 'Unassigned'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('OfficeLocation', officeLocationSchema);
