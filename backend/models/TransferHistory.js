const mongoose = require('mongoose');

const transferHistorySchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    index: true
  },
  employeeName: {
    type: String,
    required: true
  },
  fromDepartment: { type: String, default: 'N/A' },
  toDepartment: { type: String, required: true },
  fromTeam: { type: String, default: 'N/A' },
  toTeam: { type: String, default: 'N/A' },
  fromManager: { type: String, default: 'N/A' },
  toManager: { type: String, default: 'N/A' },
  reason: { type: String, default: 'Internal Restructuring' },
  transferDate: { type: Date, default: Date.now },
  approvedBy: {
    id: String,
    name: String,
    role: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TransferHistory', transferHistorySchema);
