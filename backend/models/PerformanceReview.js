const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
  reviewCycle: {
    type: String,
    enum: ['Quarterly (Q1)', 'Quarterly (Q2)', 'Quarterly (Q3)', 'Quarterly (Q4)', 'Half-Yearly (H1)', 'Half-Yearly (H2)', 'Annual Review 2026'],
    default: 'Quarterly (Q1)'
  },
  reviewerName: {
    type: String,
    required: true,
    default: 'Marcus Holloway'
  },
  reviewerRole: {
    type: String,
    default: 'Engineering Manager'
  },
  employeeName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    default: 'Engineering & Technology'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
    default: 4.5
  },
  strengths: {
    type: String,
    default: ''
  },
  weaknesses: {
    type: String,
    default: ''
  },
  achievements: {
    type: String,
    default: ''
  },
  improvementPlan: {
    type: String,
    default: ''
  },
  comments: {
    type: String,
    default: ''
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 90
  },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Approved'],
    default: 'Approved'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PerformanceReview', performanceReviewSchema);
