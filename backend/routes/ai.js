const express = require('express');
const auth = require('../middleware/auth');
const { processAIQuery } = require('../services/aiService');
const AuditLog = require('../models/AuditLog');

const router = express.Router();

// ==========================================
// 1. CHAT RESPONSE GENERATOR API
// ==========================================
router.post('/chat', auth, async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const userRole = req.user.role || 'admin';
    const userName = req.user.name || 'Alex Rivera';

    const aiResponse = await processAIQuery(prompt, userRole, userName);
    res.json(aiResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 2. CONFIRMED ACTION EXECUTION API
// ==========================================
router.post('/action', auth, async (req, res) => {
  try {
    const { actionType, details, payload } = req.body;

    // Log the confirmed AI execution into AuditLog
    const auditLog = new AuditLog({
      action: `AI Executed: ${actionType}`,
      category: 'System',
      employeeName: req.user.name || 'Alex Rivera',
      role: req.user.role || 'admin',
      status: 'Success',
      description: `AI Assistant executed action "${actionType}" (${details}) upon user confirmation.`
    });
    await auditLog.save();

    res.json({
      message: `Action "${actionType}" executed successfully.`,
      auditLogId: auditLog.logId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
