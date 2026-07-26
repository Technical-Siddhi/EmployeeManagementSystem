const mongoose = require('mongoose');

const archivedAuditLogSchema = new mongoose.Schema({
  retentionDays: {
    type: Number,
    required: true,
    enum: [30, 90, 180, 365],
    default: 90
  },
  archivedAt: {
    type: Date,
    default: Date.now
  },
  logCount: {
    type: Number,
    required: true
  },
  archivedLogs: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ArchivedAuditLog', archivedAuditLogSchema);
