const express = require('express');
const Notification = require('../models/Notification');
const Announcement = require('../models/Announcement');
const NotificationPreference = require('../models/NotificationPreference');
const auth = require('../middleware/auth');
const router = express.Router();

// Seed initial default notifications & announcements if empty
const seedNotificationDataIfEmpty = async () => {
  try {
    const notifCount = await Notification.countDocuments();
    if (notifCount === 0) {
      await Notification.insertMany([
        {
          title: '🎉 Q1 Enterprise Promotion Approved',
          description: 'Congratulations Alex Rivera! Your promotion to Engineering Manager has been finalized.',
          type: 'Success',
          category: 'Performance',
          priority: 'High',
          isRead: false,
          link: '/admin/performance'
        },
        {
          title: '📅 Leave Request Approved by HR',
          description: 'Your 3-day Annual Leave starting next Monday has been approved.',
          type: 'Success',
          category: 'Leave',
          priority: 'Medium',
          isRead: false,
          link: '/admin/leave'
        },
        {
          title: '⏱️ Late Arrival Alert Recorded',
          description: 'Clock-in logged at 09:42 AM (12 minutes past 09:30 AM grace window).',
          type: 'Warning',
          category: 'Attendance',
          priority: 'Medium',
          isRead: true,
          link: '/admin/attendance'
        },
        {
          title: '📑 Document Expiry Reminder',
          description: 'Software Architecture Certification expires in 14 days. Upload updated credentials.',
          type: 'Reminder',
          category: 'Documents',
          priority: 'Urgent',
          isRead: false,
          link: '/admin/employees'
        },
        {
          title: '🎯 Q1 Performance Review Goal Deadline',
          description: 'Upgrade Enterprise React Architecture goal due date is in 5 days.',
          type: 'Reminder',
          category: 'Performance',
          priority: 'High',
          isRead: false,
          link: '/admin/performance'
        }
      ]);

      await Announcement.insertMany([
        {
          title: '🚀 AttendX Enterprise v3.0 Global Launch & All-Hands',
          description: 'We are thrilled to announce the company-wide release of AttendX v3.0 featuring Organization & Performance Management modules! Join us for the virtual All-Hands meeting this Friday at 3:00 PM EST.',
          category: 'Company',
          priority: 'Urgent',
          audience: 'All Employees',
          pinned: true,
          publishedBy: 'Victoria Vance (CEO)',
          reactions: {
            thumbsUp: ['alex.rivera@attendx.com', 'rahul@attendx.com'],
            heart: ['sarah@attendx.com'],
            applaud: ['marcus@attendx.com', 'elena@attendx.com']
          }
        },
        {
          title: '🏥 Annual Healthcare & Benefits Enrollment Open',
          description: 'The annual open enrollment portal for employee health insurance, dental coverage, and wellness reimbursements is now active through next Friday.',
          category: 'HR',
          priority: 'High',
          audience: 'All Employees',
          pinned: false,
          publishedBy: 'Sarah Connor (VP HR)',
          reactions: {
            thumbsUp: ['alex.rivera@attendx.com'],
            heart: ['jessica@attendx.com'],
            applaud: []
          }
        }
      ]);
    }
  } catch (err) {
    console.warn('Seed notification data notice:', err.message);
  }
};

seedNotificationDataIfEmpty();

// ==========================================
// 1. NOTIFICATION CRUD & ACTIONS
// ==========================================
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ isArchived: false }).sort({ createdAt: -1 });
    const unreadCount = await Notification.countDocuments({ isRead: false, isArchived: false });
    res.json({ notifications, unreadCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(notification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/read-all', auth, async (req, res) => {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id/archive', auth, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { isArchived: true }, { new: true });
    res.json(notification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 2. ANNOUNCEMENTS API
// ==========================================
router.get('/announcements', auth, async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ pinned: -1, createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/announcements', auth, async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/announcements/:id/react', auth, async (req, res) => {
  try {
    const { reactionType, userEmail } = req.body;
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

    const key = reactionType; // 'thumbsUp' | 'heart' | 'applaud'
    if (announcement.reactions[key]) {
      const existsIndex = announcement.reactions[key].indexOf(userEmail);
      if (existsIndex > -1) {
        announcement.reactions[key].splice(existsIndex, 1);
      } else {
        announcement.reactions[key].push(userEmail);
      }
      await announcement.save();
    }
    res.json(announcement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// 3. AUTOMATED REMINDERS API
// ==========================================
router.get('/reminders', auth, async (req, res) => {
  try {
    const reminders = [
      { id: 'rem-1', title: '🎉 Work Anniversary: Alex Rivera (3 Years)', type: 'Work Anniversary', date: 'Tomorrow', icon: '🎂' },
      { id: 'rem-2', title: '📑 Passport Document Renewal Expiry', type: 'Document Expiry', date: 'In 7 days', icon: '📄' },
      { id: 'rem-3', title: '🎯 Q1 Architecture Goal Final Target', type: 'Goal Deadline', date: 'In 5 days', icon: '🎯' },
      { id: 'rem-4', title: '📋 Mid-Year Performance Review Due', type: 'Review Due', date: 'In 12 days', icon: '📝' },
    ];
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 4. USER PREFERENCES API
// ==========================================
router.get('/preferences', auth, async (req, res) => {
  try {
    let pref = await NotificationPreference.findOne({ userId: req.user._id });
    if (!pref) {
      pref = new NotificationPreference({
        userId: req.user._id,
        userEmail: req.user.email || 'user@attendx.com'
      });
      await pref.save();
    }
    res.json(pref);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/preferences', auth, async (req, res) => {
  try {
    const pref = await NotificationPreference.findOneAndUpdate(
      { userId: req.user._id },
      req.body,
      { new: true, upsert: true }
    );
    res.json(pref);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
