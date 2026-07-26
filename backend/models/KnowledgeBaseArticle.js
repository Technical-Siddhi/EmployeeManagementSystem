const mongoose = require('mongoose');

const knowledgeBaseArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Article title is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['IT', 'HR', 'Payroll', 'Attendance', 'Leave', 'Policies'],
    default: 'IT'
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Helpdesk Admin'
  },
  views: {
    type: Number,
    default: 0
  },
  helpfulCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('KnowledgeBaseArticle', knowledgeBaseArticleSchema);
