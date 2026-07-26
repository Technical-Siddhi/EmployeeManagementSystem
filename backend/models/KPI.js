const mongoose = require('mongoose');

const kpiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'KPI name is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['Attendance', 'Task Completion', 'Projects Delivered', 'Bug Fixes', 'Customer Rating', 'Sales', 'Quality'],
    default: 'Task Completion'
  },
  targetValue: {
    type: Number,
    required: true,
    default: 100
  },
  currentValue: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    default: '%'
  },
  weightage: {
    type: Number,
    default: 25
  },
  assignedEmployeeName: {
    type: String,
    default: 'Alex Rivera'
  },
  status: {
    type: String,
    enum: ['On Track', 'At Risk', 'Exceeded', 'Behind Target'],
    default: 'On Track'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('KPI', kpiSchema);
