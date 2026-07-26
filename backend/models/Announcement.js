const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Announcement title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Announcement description is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['Company', 'HR', 'Event', 'Urgent', 'Policy'],
    default: 'Company'
  },
  priority: {
    type: String,
    enum: ['Normal', 'High', 'Urgent'],
    default: 'Normal'
  },
  audience: {
    type: String,
    enum: ['All Employees', 'Engineering', 'HR', 'Management'],
    default: 'All Employees'
  },
  pinned: {
    type: Boolean,
    default: false
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    default: null
  },
  publishedBy: {
    type: String,
    default: 'HR Operations / Victoria Vance'
  },
  attachmentUrl: {
    type: String,
    default: ''
  },
  reactions: {
    thumbsUp: [{ type: String }],
    heart: [{ type: String }],
    applaud: [{ type: String }]
  },
  readBy: [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Announcement', announcementSchema);
