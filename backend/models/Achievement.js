const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: [true, 'Achievement title is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['Award', 'Certificate', 'Recognition', 'Employee of the Month', 'Milestone'],
    default: 'Award'
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  },
  badgeIcon: {
    type: String,
    default: '🏆'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', achievementSchema);
