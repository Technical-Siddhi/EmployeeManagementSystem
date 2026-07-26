const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  userEmail: {
    type: String,
    default: 'all'
  },
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Notification description is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['Success', 'Warning', 'Info', 'Error', 'Reminder'],
    default: 'Info'
  },
  category: {
    type: String,
    enum: ['System', 'HR', 'Performance', 'Attendance', 'Payroll', 'Leave', 'Documents'],
    default: 'System'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  link: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
