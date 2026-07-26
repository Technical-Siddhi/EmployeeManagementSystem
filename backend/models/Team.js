const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team name is required'],
    trim: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Department is required']
  },
  departmentName: {
    type: String,
    default: ''
  },
  teamLeadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  teamLeadName: {
    type: String,
    default: 'Unassigned'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);
