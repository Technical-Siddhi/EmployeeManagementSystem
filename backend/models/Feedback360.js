const mongoose = require('mongoose');

const feedback360Schema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  },
  providerType: {
    type: String,
    enum: ['Manager', 'Peer', 'Self', 'HR'],
    required: true
  },
  providerName: {
    type: String,
    required: true
  },
  ratings: {
    leadership: { type: Number, default: 4 },
    teamwork: { type: Number, default: 5 },
    communication: { type: Number, default: 4 },
    execution: { type: Number, default: 5 }
  },
  comments: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.5
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback360', feedback360Schema);
