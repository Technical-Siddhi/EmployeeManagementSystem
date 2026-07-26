const mongoose = require('mongoose');

const securityEventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    enum: [
      'Failed Login Attempt',
      'Account Lockout',
      'Password Reset Requested',
      'Role Modification',
      'Permission Escalation',
      'Multiple Location Logins',
      'Suspicious IP Traffic',
      'Unauthorized API Access'
    ],
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  employeeName: {
    type: String,
    default: 'Unknown User'
  },
  ipAddress: {
    type: String,
    default: '192.168.1.1'
  },
  device: {
    type: String,
    default: 'Unknown Device'
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  resolved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SecurityEvent', securityEventSchema);
