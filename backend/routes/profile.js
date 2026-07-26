const express = require('express');
const auth = require('../middleware/auth');
const EmployeeProfile = require('../models/EmployeeProfile');
const User = require('../models/User');

const router = express.Router();

// Helper to seed a default profile if not found
const getOrCreateProfile = async (identifier) => {
  let profile = await EmployeeProfile.findOne({
    $or: [{ _id: identifier.match(/^[0-9a-fA-F]{24}$/) ? identifier : null }, { employeeId: identifier }]
  });

  if (!profile) {
    // Check if matching user exists
    let user = null;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(identifier);
    }

    const defaultEmpId = user ? `EMP-${user._id.toString().substring(18).toUpperCase()}` : (identifier.startsWith('EMP') ? identifier : `EMP-${identifier}`);
    const nameParts = (user?.name || 'Rahul Sharma').split(' ');

    profile = new EmployeeProfile({
      userId: user ? user._id : null,
      employeeId: defaultEmpId,
      designation: 'Senior Developer',
      department: user?.department || 'Engineering',
      team: 'Frontend Architecture',
      employmentType: 'Full-Time',
      status: 'Active',
      photoUrl: '',
      personalInfo: {
        firstName: nameParts[0] || 'Rahul',
        lastName: nameParts[1] || 'Sharma',
        gender: 'Male',
        dateOfBirth: new Date('1995-06-15'),
        phone: '+1 (555) 987-6543',
        email: user?.email || 'rahul@company.com',
        currentAddress: '742 Evergreen Terrace, New York, NY',
        permanentAddress: '128 Innovation Way, San Jose, CA',
        nationality: 'American',
        bloodGroup: 'O+',
        maritalStatus: 'Single',
        emergencyContact: {
          name: 'Anjali Sharma',
          phone: '+1 (555) 123-4567',
          relationship: 'Sister'
        }
      },
      professionalInfo: {
        officeLocation: 'New York HQ',
        workEmail: user?.email || 'rahul@company.com',
        totalExperience: '4.5 Years'
      },
      education: [
        {
          degree: 'B.Tech in Computer Science',
          institute: 'Stanford University',
          university: 'Stanford',
          passingYear: 2018,
          percentage: '3.9 GPA'
        }
      ],
      experience: [
        {
          company: 'Acme Software Corp',
          role: 'Full Stack Engineer',
          startDate: new Date('2019-01-10'),
          endDate: new Date('2022-12-20'),
          responsibilities: 'Architected microservices and built React dashboard UI.'
        }
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Tailwind CSS'],
      salaryInfo: {
        basicSalary: 85000,
        hra: 30000,
        allowance: 12000,
        bonus: 18000,
        pf: 6000,
        tax: 9500,
        bankName: 'JPMorgan Chase',
        accountNumber: '•••• •••• 9921',
        ifsc: 'CHASUS33XXX',
        salaryCycle: 'Monthly'
      },
      documents: [
        {
          title: 'Offer Letter 2023.pdf',
          type: 'Offer Letter',
          fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          uploadDate: new Date()
        }
      ],
      performance: {
        rating: 4.9,
        attendanceScore: 97,
        punctualityScore: 99,
        managerFeedback: 'Exceptional technical execution and strong ownership across team deliverables.',
        promotionHistory: [
          { title: 'Promoted to Senior Developer', date: new Date('2023-07-01'), details: 'Recognized for leading frontend modernization.' }
        ]
      },
      timeline: [
        { title: 'Joined AttendX System', description: 'Onboarded as Senior Developer', date: new Date('2023-01-15'), iconType: 'user' },
        { title: 'Completed Probation', description: 'Confirmed full-time employment', date: new Date('2023-04-15'), iconType: 'check' },
        { title: 'Promoted to Senior Developer', description: 'Merit-based promotion', date: new Date('2023-07-01'), iconType: 'award' }
      ]
    });

    await profile.save();
  }

  return profile;
};

// GET /api/profile/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.params.id);
    
    // Privacy check for salary info: hide salary from non-admin/non-hr users if requesting someone else's profile
    const profileObj = profile.toObject();
    if (req.user.role === 'employee') {
      delete profileObj.salaryInfo;
    }

    res.json(profileObj);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// PUT /api/profile/:id - Update main profile
router.put('/:id', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.params.id);
    const { designation, department, team, employmentType, reportingManager, personalInfo, professionalInfo } = req.body;

    if (designation) profile.designation = designation;
    if (department) profile.department = department;
    if (team) profile.team = team;
    if (employmentType) profile.employmentType = employmentType;
    if (reportingManager) profile.reportingManager = reportingManager;

    if (personalInfo) {
      profile.personalInfo = { ...profile.personalInfo, ...personalInfo };
    }
    if (professionalInfo) {
      profile.professionalInfo = { ...profile.professionalInfo, ...professionalInfo };
    }

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// PATCH /api/profile/:id/status - Toggle Activate / Deactivate
router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (!['admin', 'hr'].includes(req.user.role)) {
      return res.status(403).json({ msg: 'Forbidden' });
    }
    const profile = await getOrCreateProfile(req.params.id);
    const { status } = req.body;
    if (status) profile.status = status;
    
    // Record timeline entry
    profile.timeline.unshift({
      title: `Status Changed to ${status}`,
      description: `Updated by ${req.user.role.toUpperCase()}`,
      date: new Date(),
      iconType: 'shield'
    });

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// PUT /api/profile/:id/salary - Admin only
router.put('/:id/salary', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Forbidden: Admin access required' });
    }
    const profile = await getOrCreateProfile(req.params.id);
    if (req.body.salaryInfo) {
      profile.salaryInfo = { ...profile.salaryInfo, ...req.body.salaryInfo };
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// POST /api/profile/:id/education
router.post('/:id/education', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.params.id);
    profile.education.push(req.body);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE /api/profile/:id/education/:eduId
router.delete('/:id/education/:eduId', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.params.id);
    profile.education = profile.education.filter(e => e._id.toString() !== req.params.eduId);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// POST /api/profile/:id/experience
router.post('/:id/experience', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.params.id);
    profile.experience.push(req.body);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE /api/profile/:id/experience/:expId
router.delete('/:id/experience/:expId', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.params.id);
    profile.experience = profile.experience.filter(e => e._id.toString() !== req.params.expId);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// POST /api/profile/:id/skills
router.post('/:id/skills', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.params.id);
    const { skill } = req.body;
    if (skill && !profile.skills.includes(skill)) {
      profile.skills.push(skill);
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE /api/profile/:id/skills/:skill
router.delete('/:id/skills/:skill', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.params.id);
    profile.skills = profile.skills.filter(s => s !== req.params.skill);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// POST /api/profile/:id/documents
router.post('/:id/documents', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.params.id);
    profile.documents.push(req.body);
    profile.timeline.unshift({
      title: `Document Uploaded: ${req.body.title || 'Attachment'}`,
      description: `Uploaded by ${req.user.name || 'User'}`,
      date: new Date(),
      iconType: 'file'
    });
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE /api/profile/:id/documents/:docId
router.delete('/:id/documents/:docId', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.params.id);
    profile.documents = profile.documents.filter(d => d._id.toString() !== req.params.docId);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
