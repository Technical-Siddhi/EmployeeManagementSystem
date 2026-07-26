const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  logId: {
    type: String,
    required: true,
    unique: true,
    default: () => `LOG-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
  },
  action: {
    type: String,
    required: [true, 'Audit action is required'],
    trim: true
  },
  category: {
    type: String,
    enum: [
      'Authentication',
      'Employee',
      'Attendance',
      'Leave',
      'Payroll',
      'Documents',
      'Performance',
      'Organization',
      'Notifications',
      'Settings',
      'Security',
      'System'
    ],
    required: true,
    default: 'System'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  userEmail: {
    type: String,
    default: 'system@attendx.com'
  },
  employeeName: {
    type: String,
    required: true,
    default: 'Alex Rivera'
  },
  role: {
    type: String,
    default: 'admin'
  },
  department: {
    type: String,
    default: 'Engineering'
  },
  ipAddress: {
    type: String,
    default: '192.168.1.100'
  },
  device: {
    type: String,
    default: 'MacBook Pro 16"'
  },
  browser: {
    type: String,
    default: 'Chrome 122.0'
  },
  operatingSystem: {
    type: String,
    default: 'macOS Sonoma'
  },
  location: {
    type: String,
    default: 'San Francisco, CA (HQ)'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Success', 'Failed', 'Warning', 'Critical'],
    default: 'Success'
  },
  description: {
    type: String,
    required: true
  },
  metadata: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
