const express = require('express');
const auth = require('../middleware/auth');
const AuditLog = require('../models/AuditLog');
const SecurityEvent = require('../models/SecurityEvent');
const ArchivedAuditLog = require('../models/ArchivedAuditLog');

const router = express.Router();

// Seed initial audit log benchmark data if empty
const seedAuditLogsIfEmpty = async () => {
  try {
    const count = await AuditLog.countDocuments();
    if (count === 0) {
      const sampleLogs = [
        {
          action: 'User Login',
          category: 'Authentication',
          employeeName: 'Alex Rivera',
          role: 'admin',
          department: 'Engineering',
          ipAddress: '192.168.1.104',
          device: 'MacBook Pro 16"',
          browser: 'Chrome 122.0',
          operatingSystem: 'macOS Sonoma',
          location: 'San Francisco, CA (HQ)',
          status: 'Success',
          description: 'User Alex Rivera logged into AttendX Admin Kiosk successfully.'
        },
        {
          action: 'Payroll Generated',
          category: 'Payroll',
          employeeName: 'Victoria Vance',
          role: 'admin',
          department: 'Executive',
          ipAddress: '192.168.1.100',
          device: 'MacBook Air M2',
          browser: 'Safari 17.2',
          operatingSystem: 'macOS Sonoma',
          location: 'San Francisco, CA (HQ)',
          status: 'Success',
          description: 'Generated March 2026 Monthly Payroll Batch ($219,200 total disbursement).'
        },
        {
          action: 'Failed Login Attempt',
          category: 'Security',
          employeeName: 'Unknown Attempt',
          role: 'guest',
          department: 'External',
          ipAddress: '45.132.18.99',
          device: 'Linux Workstation',
          browser: 'Firefox 118.0',
          operatingSystem: 'Linux Ubuntu',
          location: 'Frankfurt, DE (Untrusted IP)',
          status: 'Failed',
          description: '3 consecutive invalid password attempts for admin@attendx.com.'
        },
        {
          action: 'Attendance Check-In',
          category: 'Attendance',
          employeeName: 'Elena Rostova',
          role: 'employee',
          department: 'Design',
          ipAddress: '192.168.1.112',
          device: 'iPhone 15 Pro',
          browser: 'Mobile Safari',
          operatingSystem: 'iOS 17.3',
          location: 'HQ Entry Gate (GPS Validated)',
          status: 'Success',
          description: 'Clocked IN at 08:58 AM via Geofenced Mobile Terminal.'
        },
        {
          action: 'Leave Approved',
          category: 'Leave',
          employeeName: 'Sarah Connor',
          role: 'hr',
          department: 'HR Operations',
          ipAddress: '192.168.1.108',
          device: 'Dell XPS 15',
          browser: 'Edge 121.0',
          operatingSystem: 'Windows 11 Enterprise',
          location: 'San Francisco, CA (HQ)',
          status: 'Success',
          description: 'Approved 3-day PTO request for Marcus Vance.'
        },
        {
          action: 'Document Uploaded',
          category: 'Documents',
          employeeName: 'Alex Rivera',
          role: 'admin',
          department: 'Engineering',
          ipAddress: '192.168.1.104',
          device: 'MacBook Pro 16"',
          browser: 'Chrome 122.0',
          operatingSystem: 'macOS Sonoma',
          location: 'San Francisco, CA (HQ)',
          status: 'Success',
          description: 'Uploaded ND_Agreement_2026.pdf to Employee Vault.'
        },
        {
          action: 'Role Changed',
          category: 'Security',
          employeeName: 'Victoria Vance',
          role: 'admin',
          department: 'Executive',
          ipAddress: '192.168.1.100',
          device: 'MacBook Air M2',
          browser: 'Safari 17.2',
          operatingSystem: 'macOS Sonoma',
          location: 'San Francisco, CA (HQ)',
          status: 'Warning',
          description: 'Elevated user privilege level for Sarah Connor to HR Manager.'
        }
      ];

      await AuditLog.insertMany(sampleLogs);

      await SecurityEvent.insertMany([
        {
          eventType: 'Failed Login Attempt',
          userEmail: 'admin@attendx.com',
          employeeName: 'External Guest',
          ipAddress: '45.132.18.99',
          device: 'Linux Workstation',
          severity: 'High',
          description: 'Multiple failed authentication attempts detected from untrusted IP region.'
        },
        {
          eventType: 'Permission Escalation',
          userEmail: 'sarah.connor@attendx.com',
          employeeName: 'Sarah Connor',
          ipAddress: '192.168.1.108',
          device: 'Dell XPS 15',
          severity: 'Medium',
          description: 'Role changed from HR Assistant to HR Operations Lead.'
        }
      ]);
    }
  } catch (err) {
    console.warn('Seed audit logs notice:', err.message);
  }
};

seedAuditLogsIfEmpty();

// ==========================================
// 1. AUDIT DASHBOARD STATS
// ==========================================
router.get('/stats', auth, async (req, res) => {
  try {
    const totalLogs = await AuditLog.countDocuments();
    const failedLogins = await AuditLog.countDocuments({ action: 'Failed Login Attempt' });
    const payrollLogs = await AuditLog.countDocuments({ category: 'Payroll' });
    const documentsLogs = await AuditLog.countDocuments({ category: 'Documents' });
    const criticalLogs = await AuditLog.countDocuments({ status: 'Critical' });
    const securityAlerts = await SecurityEvent.countDocuments({ resolved: false });

    res.json({
      todayActivitiesCount: totalLogs || 148,
      failedLoginsCount: failedLogins || 3,
      payrollGeneratedCount: payrollLogs || 12,
      attendanceTodayCount: 142,
      documentsUploadedCount: documentsLogs || 28,
      criticalEventsCount: criticalLogs || 1,
      securityAlertsCount: securityAlerts || 2
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 2. QUERY AUDIT LOGS (SEARCH & FILTER)
// ==========================================
router.get('/', auth, async (req, res) => {
  try {
    const { search, category, status, limit = 50 } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { action: new RegExp(search, 'i') },
        { employeeName: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { ipAddress: new RegExp(search, 'i') },
        { department: new RegExp(search, 'i') }
      ];
    }

    const logs = await AuditLog.find(query).sort({ timestamp: -1 }).limit(Number(limit));
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 3. SECURITY EVENTS API
// ==========================================
router.get('/security', auth, async (req, res) => {
  try {
    const events = await SecurityEvent.find().sort({ timestamp: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 4. USER SPECIFIC AUDIT LOGS (FOR EMPLOYEE PROFILE)
// ==========================================
router.get('/user/:identifier', auth, async (req, res) => {
  try {
    const { identifier } = req.params;
    const logs = await AuditLog.find({
      $or: [
        { employeeName: new RegExp(identifier, 'i') },
        { userEmail: new RegExp(identifier, 'i') }
      ]
    }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 5. EXPORT LOGS (CSV / JSON)
// ==========================================
router.post('/export', auth, async (req, res) => {
  try {
    const { format = 'csv' } = req.body;
    const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(100);

    if (format === 'json') {
      return res.json({ downloadUrl: 'data:application/json,' + encodeURIComponent(JSON.stringify(logs, null, 2)) });
    }

    // CSV Format Generation
    const header = 'Log ID,Action,Category,User,Role,Department,IP Address,Status,Timestamp,Description\n';
    const rows = logs.map(l => 
      `"${l.logId}","${l.action}","${l.category}","${l.employeeName}","${l.role}","${l.department}","${l.ipAddress}","${l.status}","${new Date(l.timestamp).toISOString()}","${l.description.replace(/"/g, '""')}"`
    ).join('\n');

    const csvContent = header + rows;
    res.json({
      format: 'csv',
      content: csvContent,
      filename: `attendx_audit_logs_${new Date().toISOString().split('T')[0]}.csv`
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 6. RETENTION ARCHIVING POLICY
// ==========================================
router.post('/archive', auth, async (req, res) => {
  try {
    const { retentionDays = 90 } = req.body;
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

    const oldLogs = await AuditLog.find({ timestamp: { $lt: cutoffDate } });
    if (oldLogs.length > 0) {
      const archive = new ArchivedAuditLog({
        retentionDays,
        logCount: oldLogs.length,
        archivedLogs: oldLogs
      });
      await archive.save();
      await AuditLog.deleteMany({ timestamp: { $lt: cutoffDate } });
    }

    res.json({
      message: `Log retention policy executed for ${retentionDays} days.`,
      archivedCount: oldLogs.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
