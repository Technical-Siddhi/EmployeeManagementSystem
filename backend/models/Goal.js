const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Goal title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  goalType: {
    type: String,
    enum: ['Individual', 'Team', 'Department', 'Company'],
    default: 'Individual'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  weightage: {
    type: Number,
    min: 1,
    max: 100,
    default: 20
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Under Review', 'Completed'],
    default: 'In Progress'
  },
  assignedEmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  assignedEmployeeName: {
    type: String,
    required: [true, 'Assigned employee name is required']
  },
  assignedManagerName: {
    type: String,
    default: 'Marcus Holloway'
  },
  progressPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);
