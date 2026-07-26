const express = require('express');
const mongoose = require('mongoose');
const os = require('os');

const router = express.Router();

// ==========================================
// ENTERPRISE HEALTH CHECK ENDPOINT (GET /health)
// ==========================================
router.get('/', async (req, res) => {
  const startTime = Date.now();
  let dbStatus = 'Disconnected';
  let dbPingMs = 0;

  try {
    if (mongoose.connection.readyState === 1) {
      const pingStart = Date.now();
      await mongoose.connection.db.admin().ping();
      dbPingMs = Date.now() - pingStart;
      dbStatus = 'Connected';
    }
  } catch (err) {
    dbStatus = `Error: ${err.message}`;
  }

  const memoryUsage = process.memoryUsage();
  const cpus = os.cpus();

  res.status(200).json({
    status: 'UP',
    service: 'AttendX Enterprise Workforce Management Platform API',
    version: '2.5.0',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStatus,
      pingMs: `${dbPingMs}ms`,
      name: mongoose.connection.name || 'employee_attendance'
    },
    system: {
      platform: process.platform,
      arch: os.arch(),
      cpus: cpus.length,
      freeMemoryMB: Math.round(os.freemem() / (1024 * 1024)),
      totalMemoryMB: Math.round(os.totalmem() / (1024 * 1024))
    },
    process: {
      pid: process.pid,
      heapUsedMB: Math.round(memoryUsage.heapUsed / (1024 * 1024)),
      rssMB: Math.round(memoryUsage.rss / (1024 * 1024))
    },
    responseTimeMs: `${Date.now() - startTime}ms`
  });
});

module.exports = router;
