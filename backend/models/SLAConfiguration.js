const mongoose = require('mongoose');

const slaConfigurationSchema = new mongoose.Schema({
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    required: true,
    unique: true
  },
  responseTimeHours: {
    type: Number,
    required: true
  },
  resolutionTimeHours: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SLAConfiguration', slaConfigurationSchema);
