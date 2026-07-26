const express = require('express');
const Goal = require('../models/Goal');
const KPI = require('../models/KPI');
const PerformanceReview = require('../models/PerformanceReview');
const Feedback360 = require('../models/Feedback360');
const Achievement = require('../models/Achievement');
const Badge = require('../models/Badge');
const PromotionHistory = require('../models/PromotionHistory');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Seed initial default performance data if empty
const seedPerformanceDataIfEmpty = async () => {
  try {
    const goalsCount = await Goal.countDocuments();
    if (goalsCount === 0) {
      await Goal.insertMany([
        {
          title: 'Upgrade Enterprise React Architecture to React 18',
          description: 'Refactor dependency resolution tree to guarantee zero peer conflicts on Vercel',
          goalType: 'Department',
          priority: 'High',
          weightage: 30,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          status: 'Completed',
          assignedEmployeeName: 'Alex Rivera',
          assignedManagerName: 'Marcus Holloway',
          progressPercentage: 100
        },
        {
          title: 'Implement Enterprise Document & Org Management Modules',
          description: 'Deliver versioned file uploads and interactive organization chart tree',
          goalType: 'Individual',
          priority: 'Urgent',
          weightage: 40,
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          status: 'In Progress',
          assignedEmployeeName: 'Rahul Sharma',
          assignedManagerName: 'Alex Rivera',
          progressPercentage: 85
        },
        {
          title: 'Maintain 99.9% API Uptime & Sub-200ms Response Times',
          description: 'Optimize MongoDB query indexing and Express middleware pipeline',
          goalType: 'Team',
          priority: 'High',
          weightage: 30,
          dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
          status: 'In Progress',
          assignedEmployeeName: 'Elena Rostova',
          assignedManagerName: 'Alex Rivera',
          progressPercentage: 92
        }
      ]);

      await KPI.insertMany([
        { name: 'Monthly Attendance Rate', category: 'Attendance', targetValue: 98, currentValue: 99.2, unit: '%', status: 'Exceeded', assignedEmployeeName: 'Alex Rivera' },
        { name: 'Sprint Task Completion', category: 'Task Completion', targetValue: 90, currentValue: 94, unit: '%', status: 'Exceeded', assignedEmployeeName: 'Rahul Sharma' },
        { name: 'Quarterly Projects Delivered', category: 'Projects Delivered', targetValue: 4, currentValue: 4, unit: 'projects', status: 'On Track', assignedEmployeeName: 'Alex Rivera' },
        { name: 'Sentry Bug Resolution Ratio', category: 'Bug Fixes', targetValue: 95, currentValue: 98, unit: '%', status: 'Exceeded', assignedEmployeeName: 'Elena Rostova' },
        { name: 'Client CSAT Satisfaction Rating', category: 'Customer Rating', targetValue: 4.5, currentValue: 4.8, unit: '/ 5', status: 'Exceeded', assignedEmployeeName: 'Samantha Wu' }
      ]);

      await PerformanceReview.insertMany([
        {
          reviewCycle: 'Quarterly (Q1)',
          reviewerName: 'Marcus Holloway',
          reviewerRole: 'VP of Engineering',
          employeeName: 'Alex Rivera',
          department: 'Engineering & Technology',
          rating: 4.9,
          overallScore: 98,
          strengths: 'Outstanding technical leadership, proactive architecture scalability, zero-downtime delivery.',
          weaknesses: 'Can delegate initial prototype tasks faster.',
          achievements: 'Engineered Document Management & Organization Module ahead of deadline.',
          improvementPlan: 'Mentor junior full stack developers on microservice patterns.',
          status: 'Approved'
        },
        {
          reviewCycle: 'Quarterly (Q1)',
          reviewerName: 'Alex Rivera',
          reviewerRole: 'Engineering Manager',
          employeeName: 'Rahul Sharma',
          department: 'Frontend Architecture',
          rating: 4.7,
          overallScore: 94,
          strengths: 'Flawless React UI implementation, high-quality Tailwind CSS styling, strong peer collaboration.',
          weaknesses: 'Ensure cross-browser testing for legacy Safari.',
          achievements: 'Delivered glassmorphic dashboard design system.',
          improvementPlan: 'Take ownership of design system documentation.',
          status: 'Approved'
        }
      ]);

      await Feedback360.insertMany([
        { employeeName: 'Alex Rivera', providerType: 'Manager', providerName: 'Marcus Holloway', ratings: { leadership: 5, teamwork: 5, communication: 4.8, execution: 5 }, score: 4.9, comments: 'Exemplary engineering management.' },
        { employeeName: 'Alex Rivera', providerType: 'Peer', providerName: 'Sarah Connor', ratings: { leadership: 4.8, teamwork: 5, communication: 4.9, execution: 4.8 }, score: 4.85, comments: 'Extremely collaborative partner across HR & Engineering.' },
        { employeeName: 'Alex Rivera', providerType: 'Self', providerName: 'Alex Rivera', ratings: { leadership: 4.5, teamwork: 4.8, communication: 4.5, execution: 4.9 }, score: 4.7, comments: 'Focused on team velocity and clean code.' },
        { employeeName: 'Alex Rivera', providerType: 'HR', providerName: 'Jessica Pearson', ratings: { leadership: 5, teamwork: 5, communication: 5, execution: 5 }, score: 5.0, comments: 'Consistently top rated employee.' }
      ]);

      await Achievement.insertMany([
        { employeeName: 'Alex Rivera', title: 'Employee of the Month — Q1 2026', category: 'Employee of the Month', date: new Date(), description: 'Awarded for extraordinary architecture leadership and Module delivery.', badgeIcon: '🏆' },
        { employeeName: 'Rahul Sharma', title: 'AWS Certified Solutions Architect', category: 'Certificate', date: new Date(), description: 'Achieved professional AWS cloud architecture certification.', badgeIcon: '⭐' }
      ]);

      await Badge.insertMany([
        { employeeName: 'Alex Rivera', badgeName: 'Top Performer', icon: '🏆', description: 'Consistently rated in top 5% of workforce' },
        { employeeName: 'Alex Rivera', badgeName: 'Perfect Attendance', icon: '⭐', description: '100% on-time attendance recorded' },
        { employeeName: 'Rahul Sharma', badgeName: 'Goal Crusher', icon: '🎯', description: 'Achieved 100% of quarterly OKRs' },
        { employeeName: 'Elena Rostova', badgeName: 'Team Player', icon: '🤝', description: 'Cross-functional collaboration award' }
      ]);

      await PromotionHistory.insertMany([
        {
          employeeName: 'Alex Rivera',
          promotionDate: new Date('2026-01-15'),
          oldRole: 'Senior Lead Engineer',
          newRole: 'Engineering Manager',
          oldSalaryBand: '$110,000 - $135,000',
          newSalaryBand: '$145,000 - $175,000',
          managerComments: 'Promoted to lead department engineering operations.',
          approvedBy: 'Victoria Vance (CEO)'
        }
      ]);
    }
  } catch (err) {
    console.warn('Seed performance data notice:', err.message);
  }
};

seedPerformanceDataIfEmpty();

// ==========================================
// 1. DASHBOARD STATISTICS API
// ==========================================
router.get('/stats', auth, async (req, res) => {
  try {
    const goals = await Goal.find();
    const reviews = await PerformanceReview.find();
    const achievements = await Achievement.find();
    const badges = await Badge.find();

    const totalGoals = goals.length || 1;
    const completedGoals = goals.filter(g => g.status === 'Completed').length;
    const goalsCompletionRate = Math.round((completedGoals / totalGoals) * 100);

    const avgRating = (reviews.reduce((acc, r) => acc + (r.rating || 4.5), 0) / (reviews.length || 1)).toFixed(1);

    res.json({
      averageRating: avgRating,
      topPerformersCount: 6,
      needingImprovementCount: 1,
      goalsCompletedRate: `${goalsCompletionRate}%`,
      pendingReviewsCount: 2,
      totalAchievements: achievements.length,
      totalBadges: badges.length,
      departmentComparison: [
        { department: 'Engineering', avgScore: 4.8 },
        { department: 'Design & UX', avgScore: 4.6 },
        { department: 'Sales & Revenue', avgScore: 4.4 },
        { department: 'Human Resources', avgScore: 4.7 },
        { department: 'Finance & Ops', avgScore: 4.5 }
      ],
      monthlyTrend: [
        { month: 'Jan', rating: 4.4 },
        { month: 'Feb', rating: 4.5 },
        { month: 'Mar', rating: 4.7 },
        { month: 'Apr', rating: 4.8 }
      ],
      performanceDistribution: [
        { category: 'Exceeds Expectations (5★)', percentage: 40 },
        { category: 'Meets Expectations (4★)', percentage: 45 },
        { category: 'Needs Improvement (3★)', percentage: 12 },
        { category: 'Unsatisfactory (<3★)', percentage: 3 }
      ]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 2. GOALS CRUD APIs
// ==========================================
router.get('/goals', auth, async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/goals', auth, async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/goals/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(goal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/goals/:id', auth, async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 3. KPI CRUD APIs
// ==========================================
router.get('/kpis', auth, async (req, res) => {
  try {
    const kpis = await KPI.find().sort({ createdAt: -1 });
    res.json(kpis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/kpis', auth, async (req, res) => {
  try {
    const kpi = new KPI(req.body);
    await kpi.save();
    res.status(201).json(kpi);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 4. REVIEWS & EVALUATIONS APIs
// ==========================================
router.get('/reviews', auth, async (req, res) => {
  try {
    const reviews = await PerformanceReview.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/reviews', auth, async (req, res) => {
  try {
    const review = new PerformanceReview(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 5. 360° FEEDBACK APIs
// ==========================================
router.get('/feedback', auth, async (req, res) => {
  try {
    const feedbackList = await Feedback360.find().sort({ createdAt: -1 });
    res.json(feedbackList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/feedback', auth, async (req, res) => {
  try {
    const fb = new Feedback360(req.body);
    await fb.save();
    res.status(201).json(fb);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 6. ACHIEVEMENTS & BADGES APIs
// ==========================================
router.get('/achievements', auth, async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ date: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/achievements', auth, async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/badges', auth, async (req, res) => {
  try {
    const badges = await Badge.find().sort({ dateAwarded: -1 });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/badges', auth, async (req, res) => {
  try {
    const badge = new Badge(req.body);
    await badge.save();
    res.status(201).json(badge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 7. PROMOTION HISTORY API
// ==========================================
router.get('/promotions', auth, async (req, res) => {
  try {
    const promotions = await PromotionHistory.find().sort({ promotionDate: -1 });
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/promotions', auth, async (req, res) => {
  try {
    const promotion = new PromotionHistory(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
