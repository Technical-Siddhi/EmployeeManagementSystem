const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
    default: () => `TICK-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
  },
  subject: {
    type: String,
    required: [true, 'Ticket subject is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Ticket description is required']
  },
  category: {
    type: String,
    enum: [
      'IT Support',
      'HR Support',
      'Payroll',
      'Attendance',
      'Leave',
      'Hardware',
      'Software',
      'Network',
      'Facilities',
      'General Inquiry',
      'Other'
    ],
    default: 'IT Support'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Open', 'Assigned', 'In Progress', 'Waiting for Employee', 'Resolved', 'Closed', 'Reopened'],
    default: 'Open'
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  employeeName: {
    type: String,
    required: true,
    default: 'Alex Rivera'
  },
  department: {
    type: String,
    default: 'Engineering'
  },
  assignedAgent: {
    type: String,
    default: 'Unassigned Helpdesk'
  },
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileType: String
  }],
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  resolutionDate: {
    type: Date,
    default: null
  },
  slaBreached: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);
