const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Shift name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['Morning', 'Evening', 'Night', 'General', 'Flexible', 'Work From Home', 'Hybrid', 'Rotational'],
    default: 'General'
  },
  startTime: {
    type: String,
    required: true,
    default: '09:00 AM'
  },
  endTime: {
    type: String,
    required: true,
    default: '06:00 PM'
  },
  breakDurationMinutes: {
    type: Number,
    default: 60
  },
  gracePeriodMinutes: {
    type: Number,
    default: 15
  },
  lateThresholdMinutes: {
    type: Number,
    default: 30
  },
  halfDayThresholdHours: {
    type: Number,
    default: 4
  },
  weeklyOffDays: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    default: ['Saturday', 'Sunday']
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Shift', shiftSchema);
