const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  },
  badgeName: {
    type: String,
    enum: ['Top Performer', 'Perfect Attendance', 'Fast Learner', 'Goal Crusher', 'Team Player'],
    required: true
  },
  icon: {
    type: String,
    default: '🏆'
  },
  description: {
    type: String,
    default: ''
  },
  dateAwarded: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Badge', badgeSchema);
