const mongoose = require('mongoose');

const notificationPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  userEmail: {
    type: String,
    required: true
  },
  attendanceAlerts: {
    type: Boolean,
    default: true
  },
  leaveAlerts: {
    type: Boolean,
    default: true
  },
  performanceAlerts: {
    type: Boolean,
    default: true
  },
  announcementAlerts: {
    type: Boolean,
    default: true
  },
  payrollAlerts: {
    type: Boolean,
    default: true
  },
  emailNotifications: {
    type: Boolean,
    default: true
  },
  browserNotifications: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NotificationPreference', notificationPreferenceSchema);
