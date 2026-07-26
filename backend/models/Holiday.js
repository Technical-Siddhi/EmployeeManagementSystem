const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Holiday name is required'],
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  region: {
    type: String,
    default: 'Global Enterprise'
  },
  department: {
    type: String,
    default: 'All Departments'
  },
  isOptional: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Holiday', holidaySchema);
