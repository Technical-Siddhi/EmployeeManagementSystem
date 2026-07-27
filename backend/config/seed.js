const User = require('../models/User');

const seedDefaultUsers = async () => {
  try {
    const demoUsers = [
      {
        name: 'System Admin',
        email: 'admin@company.com',
        password: 'Password123!',
        role: 'admin',
        department: 'Executive Management',
      },
      {
        name: 'HR Manager',
        email: 'hr@company.com',
        password: 'Password123!',
        role: 'hr',
        department: 'Human Resources',
      },
      {
        name: 'Engineering Manager',
        email: 'manager@company.com',
        password: 'Password123!',
        role: 'manager',
        department: 'Engineering',
      },
      {
        name: 'John Employee',
        email: 'employee@company.com',
        password: 'Password123!',
        role: 'employee',
        department: 'Engineering',
      },
    ];

    for (const demoUser of demoUsers) {
      const existing = await User.findOne({ email: demoUser.email });
      if (!existing) {
        await User.create(demoUser);
        console.log(`✅ Demo user created: ${demoUser.email} (${demoUser.role})`);
      } else {
        existing.role = demoUser.role;
        existing.password = demoUser.password;
        await existing.save();
        console.log(`🔄 Demo user updated: ${demoUser.email} (${demoUser.role})`);
      }
    }
  } catch (err) {
    console.error('❌ Error seeding demo users:', err.message);
  }
};

module.exports = seedDefaultUsers;
