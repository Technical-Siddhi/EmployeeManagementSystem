const mongoose = require('mongoose');

const promotionHistorySchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  },
  promotionDate: {
    type: Date,
    default: Date.now
  },
  oldRole: {
    type: String,
    required: true
  },
  newRole: {
    type: String,
    required: true
  },
  oldSalaryBand: {
    type: String,
    default: '$80,000 - $110,000'
  },
  newSalaryBand: {
    type: String,
    default: '$120,000 - $155,000'
  },
  managerComments: {
    type: String,
    default: 'Exceptional architectural contribution and team mentorship.'
  },
  approvedBy: {
    type: String,
    default: 'Victoria Vance (CEO)'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PromotionHistory', promotionHistorySchema);
