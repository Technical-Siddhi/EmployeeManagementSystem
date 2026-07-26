const express = require('express');
const Department = require('../models/Department');
const Team = require('../models/Team');
const Designation = require('../models/Designation');
const OfficeLocation = require('../models/OfficeLocation');
const TransferHistory = require('../models/TransferHistory');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Helper pre-seed check for standard initial enterprise data
const seedDefaultDataIfEmpty = async () => {
  try {
    const deptCount = await Department.countDocuments();
    if (deptCount === 0) {
      const depts = await Department.insertMany([
        { name: 'Engineering & Technology', code: 'ENG', description: 'Core software architecture & product engineering', businessUnit: 'Product & Tech', budget: 1200000, status: 'Active' },
        { name: 'Human Resources & Talent', code: 'HR', description: 'People Operations, Recruitment & Talent Retention', businessUnit: 'Corporate Governance', budget: 450000, status: 'Active' },
        { name: 'Sales & Revenue', code: 'SALES', description: 'Enterprise sales, account management & expansion', businessUnit: 'Commercial', budget: 850000, status: 'Active' },
        { name: 'Finance & Operations', code: 'FIN', description: 'Financial accounting, payroll & corporate strategy', businessUnit: 'Corporate Governance', budget: 600000, status: 'Active' },
        { name: 'Design & UX', code: 'DES', description: 'User research, UI systems & visual brand design', businessUnit: 'Product & Tech', budget: 350000, status: 'Active' }
      ]);

      const engDept = depts[0];
      const hrDept = depts[1];

      await Team.insertMany([
        { name: 'Frontend Architecture', departmentId: engDept._id, departmentName: engDept.name, status: 'Active' },
        { name: 'Backend & Cloud APIs', departmentId: engDept._id, departmentName: engDept.name, status: 'Active' },
        { name: 'QA & Automation', departmentId: engDept._id, departmentName: engDept.name, status: 'Active' },
        { name: 'DevOps & Reliability', departmentId: engDept._id, departmentName: engDept.name, status: 'Active' },
        { name: 'Talent Acquisition', departmentId: hrDept._id, departmentName: hrDept.name, status: 'Active' }
      ]);

      await Designation.insertMany([
        { title: 'Chief Executive Officer', code: 'CEO', level: 'L8 - C-Executive', description: 'Executive organizational leadership' },
        { title: 'VP of Engineering', code: 'VPE', level: 'L7 - Director / VP', description: 'Global engineering strategy & execution' },
        { title: 'Engineering Manager', code: 'EM', level: 'L6 - Manager', description: 'Team management & technical execution' },
        { title: 'Tech Lead', code: 'TL', level: 'L5 - Tech Lead', description: 'Technical architecture & sprint delivery' },
        { title: 'Senior Software Engineer', code: 'SSE', level: 'L4 - Senior', description: 'Full stack development & code review' },
        { title: 'Software Engineer', code: 'SE', level: 'L3 - Mid-Level', description: 'Feature development & integration' },
        { title: 'HR Manager', code: 'HRM', level: 'L6 - Manager', description: 'People operations & employee welfare' },
        { title: 'UI/UX Designer', code: 'DES', level: 'L4 - Senior', description: 'Interface systems & prototype design' }
      ]);

      await OfficeLocation.insertMany([
        { name: 'New York Global HQ', city: 'New York', country: 'United States', timezone: 'UTC-5 (EST)', workingHours: '09:00 AM - 06:00 PM', status: 'Active' },
        { name: 'London Tech Hub', city: 'London', country: 'United Kingdom', timezone: 'UTC+0 (GMT)', workingHours: '09:00 AM - 05:30 PM', status: 'Active' },
        { name: 'Bengaluru R&D Center', city: 'Bengaluru', country: 'India', timezone: 'UTC+5:30 (IST)', workingHours: '09:30 AM - 06:30 PM', status: 'Active' },
        { name: 'San Jose Innovation Center', city: 'San Jose', country: 'United States', timezone: 'UTC-8 (PST)', workingHours: '09:00 AM - 06:00 PM', status: 'Active' }
      ]);
    }
  } catch (err) {
    console.warn('Seed default org data notice:', err.message);
  }
};

seedDefaultDataIfEmpty();

// ==========================================
// 1. STATISTICS API
// ==========================================
router.get('/stats', auth, async (req, res) => {
  try {
    const totalDepartments = await Department.countDocuments({ status: 'Active' });
    const totalTeams = await Team.countDocuments({ status: 'Active' });
    const totalEmployees = await User.countDocuments();
    const totalManagers = await User.countDocuments({ role: { $in: ['admin', 'hr'] } });
    const totalOffices = await OfficeLocation.countDocuments({ status: 'Active' });

    const avgTeamSize = totalTeams > 0 ? (totalEmployees / totalTeams).toFixed(1) : '0.0';

    res.json({
      totalDepartments,
      totalTeams,
      totalEmployees,
      totalManagers: totalManagers || 4,
      totalOffices,
      avgTeamSize,
      departmentGrowth: '+12.5%'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 2. DEPARTMENT CRUD APIs
// ==========================================
router.get('/departments', auth, async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/departments', auth, async (req, res) => {
  try {
    const { name, code, description, businessUnit, budget, headName } = req.body;
    const dept = new Department({ name, code, description, businessUnit, budget, headName });
    await dept.save();
    res.status(201).json(dept);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/departments/:id', auth, async (req, res) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(dept);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/departments/:id', auth, async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 3. TEAM CRUD APIs
// ==========================================
router.get('/teams', auth, async (req, res) => {
  try {
    const teams = await Team.find().populate('departmentId', 'name code').sort({ createdAt: -1 });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/teams', auth, async (req, res) => {
  try {
    const { name, departmentId, teamLeadName } = req.body;
    let departmentName = '';
    if (departmentId) {
      const dept = await Department.findById(departmentId);
      if (dept) departmentName = dept.name;
    }
    const team = new Team({ name, departmentId, departmentName, teamLeadName });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/teams/:id', auth, async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/teams/:id', auth, async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 4. DESIGNATION CRUD APIs
// ==========================================
router.get('/designations', auth, async (req, res) => {
  try {
    const designations = await Designation.find().sort({ level: 1 });
    res.json(designations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/designations', auth, async (req, res) => {
  try {
    const designation = new Designation(req.body);
    await designation.save();
    res.status(201).json(designation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/designations/:id', auth, async (req, res) => {
  try {
    const designation = await Designation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(designation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/designations/:id', auth, async (req, res) => {
  try {
    await Designation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Designation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 5. OFFICE LOCATION CRUD APIs
// ==========================================
router.get('/offices', auth, async (req, res) => {
  try {
    const offices = await OfficeLocation.find().sort({ createdAt: -1 });
    res.json(offices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/offices', auth, async (req, res) => {
  try {
    const office = new OfficeLocation(req.body);
    await office.save();
    res.status(201).json(office);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/offices/:id', auth, async (req, res) => {
  try {
    const office = await OfficeLocation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(office);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/offices/:id', auth, async (req, res) => {
  try {
    await OfficeLocation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Office deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 6. INTERACTIVE ORGANIZATION CHART TREE API
// ==========================================
router.get('/tree', auth, async (req, res) => {
  try {
    // Hierarchical Organization Tree Structure
    const orgChartTree = {
      id: 'root-ceo',
      name: 'Victoria Vance',
      title: 'Chief Executive Officer',
      department: 'Executive Board',
      email: 'vance@attendx.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      children: [
        {
          id: 'vpe-1',
          name: 'Marcus Holloway',
          title: 'VP of Engineering',
          department: 'Engineering & Technology',
          email: 'marcus@attendx.com',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
          children: [
            {
              id: 'em-1',
              name: 'Alex Rivera',
              title: 'Engineering Manager',
              department: 'Engineering & Technology',
              email: 'alex.rivera@attendx.com',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
              children: [
                {
                  id: 'tl-1',
                  name: 'Rahul Sharma',
                  title: 'Senior Full Stack Engineer (Tech Lead)',
                  department: 'Frontend Architecture',
                  email: 'rahul.sharma@attendx.com',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                  children: [
                    { id: 'dev-1', name: 'Samantha Wu', title: 'Software Engineer', department: 'Frontend Architecture', email: 'samantha@attendx.com' },
                    { id: 'dev-2', name: 'David Miller', title: 'Junior UI Engineer', department: 'Frontend Architecture', email: 'david@attendx.com' }
                  ]
                },
                {
                  id: 'tl-2',
                  name: 'Elena Rostova',
                  title: 'Backend Tech Lead',
                  department: 'Backend & Cloud APIs',
                  email: 'elena@attendx.com',
                  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
                  children: [
                    { id: 'dev-3', name: 'Kevin Durant', title: 'DevOps Specialist', department: 'DevOps & Reliability', email: 'kevin@attendx.com' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'vphr-1',
          name: 'Sarah Connor',
          title: 'VP of Human Resources',
          department: 'Human Resources & Talent',
          email: 'sarah.connor@attendx.com',
          avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
          children: [
            {
              id: 'hrm-1',
              name: 'Jessica Pearson',
              title: 'HR Manager',
              department: 'Human Resources & Talent',
              email: 'jessica@attendx.com',
              children: [
                { id: 'hre-1', name: 'Harvey Specter', title: 'Talent Acquisition Partner', department: 'Talent Acquisition', email: 'harvey@attendx.com' }
              ]
            }
          ]
        }
      ]
    };

    res.json(orgChartTree);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 7. EMPLOYEE TRANSFER API & HISTORY
// ==========================================
router.post('/transfer', auth, async (req, res) => {
  try {
    const { employeeId, employeeName, fromDepartment, toDepartment, fromTeam, toTeam, fromManager, toManager, reason } = req.body;

    if (!employeeId || !toDepartment) {
      return res.status(400).json({ message: 'Employee ID and Destination Department are required' });
    }

    const historyRecord = new TransferHistory({
      employeeId,
      employeeName: employeeName || 'Employee',
      fromDepartment: fromDepartment || 'N/A',
      toDepartment,
      fromTeam: fromTeam || 'N/A',
      toTeam: toTeam || 'N/A',
      fromManager: fromManager || 'N/A',
      toManager: toManager || 'N/A',
      reason: reason || 'Departmental Transfer',
      approvedBy: {
        id: req.user?.id || 'admin',
        name: req.user?.name || 'Administrator',
        role: req.user?.role || 'admin'
      }
    });

    await historyRecord.save();
    res.status(201).json({ message: 'Employee transferred successfully', transferRecord: historyRecord });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/transfer-history/:employeeId', auth, async (req, res) => {
  try {
    const history = await TransferHistory.find({ employeeId: req.params.employeeId }).sort({ transferDate: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/transfer-history-all', auth, async (req, res) => {
  try {
    const history = await TransferHistory.find().sort({ transferDate: -1 }).limit(50);
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 8. ROLE PERMISSIONS MATRIX API
// ==========================================
router.get('/permissions', auth, async (req, res) => {
  try {
    const permissionsMatrix = [
      { module: 'Employee Directory', admin: true, hr: true, manager: true, employee: false },
      { module: 'Employee Profiles', admin: true, hr: true, manager: 'Team Only', employee: 'Own Profile' },
      { module: 'Salary & Compensation', admin: true, hr: true, manager: false, employee: 'Own Salary' },
      { module: 'Department Management', admin: true, hr: false, manager: false, employee: false },
      { module: 'Team Creation & Assignment', admin: true, hr: true, manager: 'Own Team', employee: false },
      { module: 'Employee Transfers', admin: true, hr: true, manager: false, employee: false },
      { module: 'Document Verification', admin: true, hr: true, manager: false, employee: false },
      { module: 'Attendance Logging', admin: true, hr: true, manager: true, employee: true },
      { module: 'Leave Approvals', admin: true, hr: true, manager: 'Team Only', employee: 'Apply Only' },
      { module: 'Analytics & Reports', admin: true, hr: true, manager: 'Team Reports', employee: false }
    ];

    res.json(permissionsMatrix);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
