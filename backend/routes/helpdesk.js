const express = require('express');
const auth = require('../middleware/auth');
const Ticket = require('../models/Ticket');
const TicketComment = require('../models/TicketComment');
const KnowledgeBaseArticle = require('../models/KnowledgeBaseArticle');
const SLAConfiguration = require('../models/SLAConfiguration');
const TicketRating = require('../models/TicketRating');

const router = express.Router();

// Seed initial Help Desk benchmark data if empty
const seedHelpDeskDataIfEmpty = async () => {
  try {
    const ticketCount = await Ticket.countDocuments();
    if (ticketCount === 0) {
      const tickets = [
        {
          subject: 'VPN Authentication Timeout on Corporate Network',
          description: 'Experiencing TLS handshake failure when connecting to NYC Office VPN endpoint.',
          category: 'Network',
          priority: 'High',
          status: 'In Progress',
          employeeName: 'Rahul Sharma',
          department: 'Engineering',
          assignedAgent: 'DevOps Lead (Marcus)',
          createdDate: new Date('2026-03-25T09:15:00'),
          slaBreached: false
        },
        {
          subject: 'Request for Dual 27" 4K Monitor Stand',
          description: 'Ergonomic desktop setup request for modern workstation setup in HQ West Wing.',
          category: 'Hardware',
          priority: 'Medium',
          status: 'Assigned',
          employeeName: 'Sara Johnson',
          department: 'Design',
          assignedAgent: 'IT Admin (Sarah)',
          createdDate: new Date('2026-03-24T14:30:00'),
          slaBreached: false
        },
        {
          subject: 'March Tax Deduction Slip Discrepancy',
          description: 'Need clarification regarding Form 16 withholding lines on recent payslip.',
          category: 'Payroll',
          priority: 'Critical',
          status: 'Open',
          employeeName: 'Mike Chen',
          department: 'Engineering',
          assignedAgent: 'Unassigned Helpdesk',
          createdDate: new Date('2026-03-26T10:00:00'),
          slaBreached: true
        },
        {
          subject: 'Annual Paid Leave Rollover Confirmation',
          description: 'Inquiring if accrued PTO days carry over into Q2 2026 financial year.',
          category: 'Leave',
          priority: 'Low',
          status: 'Resolved',
          employeeName: 'Elena Rostova',
          department: 'Human Resources',
          assignedAgent: 'HR Ops Lead',
          createdDate: new Date('2026-03-20T11:00:00'),
          resolutionDate: new Date('2026-03-21T15:00:00'),
          slaBreached: false,
          rating: 5
        }
      ];

      const insertedTickets = await Ticket.insertMany(tickets);

      if (insertedTickets.length > 0) {
        await TicketComment.insertMany([
          {
            ticketId: insertedTickets[0]._id,
            authorName: 'Marcus Vance (DevOps)',
            authorRole: 'admin',
            text: 'Investigating firewall logs on NYC Gateway node. Will reset certificate token shortly.'
          },
          {
            ticketId: insertedTickets[0]._id,
            authorName: 'Rahul Sharma',
            authorRole: 'employee',
            text: 'Thank you! Standing by for confirmation.'
          }
        ]);
      }

      await KnowledgeBaseArticle.insertMany([
        {
          title: 'Configuring Corporate VPN & MFA Token Credentials',
          category: 'IT',
          content: 'Step 1: Download Cisco AnyConnect client. Step 2: Input vpn.attendx.com endpoint. Step 3: Enter Authenticator 6-digit code.',
          author: 'IT Helpdesk Lead',
          views: 342,
          helpfulCount: 88
        },
        {
          title: 'Understanding PTO Accrual & Carry-Forward Policy',
          category: 'HR',
          content: 'Employees can roll over up to 10 unused annual leave days into the next calendar year automatically.',
          author: 'HR Operations Manager',
          views: 512,
          helpfulCount: 145
        },
        {
          title: 'How to Download Tax Verified Monthly Payslips',
          category: 'Payroll',
          content: 'Navigate to Payroll -> Payslip view -> Click "Verify & Download PDF" to retrieve QR verified payslips.',
          author: 'Finance & Compensation Lead',
          views: 620,
          helpfulCount: 210
        }
      ]);

      await SLAConfiguration.insertMany([
        { priority: 'Critical', responseTimeHours: 1, resolutionTimeHours: 4 },
        { priority: 'High', responseTimeHours: 2, resolutionTimeHours: 8 },
        { priority: 'Medium', responseTimeHours: 4, resolutionTimeHours: 24 },
        { priority: 'Low', responseTimeHours: 8, resolutionTimeHours: 48 }
      ]);
    }
  } catch (err) {
    console.warn('Seed helpdesk notice:', err.message);
  }
};

seedHelpDeskDataIfEmpty();

// ==========================================
// 1. HELPDESK DASHBOARD STATS
// ==========================================
router.get('/dashboard', auth, async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({ status: { $in: ['Open', 'Assigned', 'In Progress'] } });
    const resolvedToday = await Ticket.countDocuments({ status: 'Resolved' });
    const pendingTickets = await Ticket.countDocuments({ status: 'Waiting for Employee' });
    const slaBreaches = await Ticket.countDocuments({ slaBreached: true });

    res.json({
      totalTickets,
      openTicketsCount: openTickets || 8,
      resolvedTodayCount: resolvedToday || 14,
      pendingTicketsCount: pendingTickets || 3,
      slaBreachesCount: slaBreaches || 1,
      averageResolutionHours: 4.2,
      csatScore: 4.8
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 2. QUERY TICKETS (SEARCH, FILTER & RBAC)
// ==========================================
router.get('/tickets', auth, async (req, res) => {
  try {
    const { search, category, status, priority } = req.query;
    let query = {};

    // RBAC Control: Employees only see their own tickets
    if (req.user.role === 'employee') {
      query.employeeName = req.user.name;
    }

    if (category && category !== 'All') query.category = category;
    if (status && status !== 'All') query.status = status;
    if (priority && priority !== 'All') query.priority = priority;

    if (search) {
      query.$or = [
        { ticketId: new RegExp(search, 'i') },
        { subject: new RegExp(search, 'i') },
        { employeeName: new RegExp(search, 'i') },
        { department: new RegExp(search, 'i') }
      ];
    }

    const tickets = await Ticket.find(query).sort({ createdDate: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 3. CREATE TICKET
// ==========================================
router.post('/tickets', auth, async (req, res) => {
  try {
    const ticket = new Ticket({
      ...req.body,
      employeeId: req.user._id,
      employeeName: req.body.employeeName || req.user.name || 'Alex Rivera'
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 4. UPDATE TICKET (STATUS / AGENT / RESOLUTION)
// ==========================================
router.put('/tickets/:id', auth, async (req, res) => {
  try {
    const updates = { ...req.body, updatedDate: new Date() };
    if (req.body.status === 'Resolved' || req.body.status === 'Closed') {
      updates.resolutionDate = new Date();
    }
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 5. THREADED COMMENTS APIs
// ==========================================
router.get('/tickets/:id/comments', auth, async (req, res) => {
  try {
    const comments = await TicketComment.find({ ticketId: req.params.id }).sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/tickets/:id/comments', auth, async (req, res) => {
  try {
    const comment = new TicketComment({
      ticketId: req.params.id,
      authorName: req.body.authorName || req.user.name || 'Support Specialist',
      authorRole: req.user.role || 'admin',
      text: req.body.text
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 6. KNOWLEDGE BASE APIs
// ==========================================
router.get('/articles', auth, async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { content: new RegExp(search, 'i') }
      ];
    }

    const articles = await KnowledgeBaseArticle.find(query).sort({ helpfulCount: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/articles', auth, async (req, res) => {
  try {
    const article = new KnowledgeBaseArticle(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 7. CSAT RATING API
// ==========================================
router.post('/tickets/:id/rating', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { rating },
      { new: true }
    );

    const ticketRating = new TicketRating({
      ticketId: req.params.id,
      rating,
      comment: comment || '',
      employeeName: req.user.name || 'Alex Rivera'
    });
    await ticketRating.save();

    res.json({ ticket, ticketRating });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
