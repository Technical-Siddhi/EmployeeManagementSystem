const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institute: { type: String, required: true },
  university: { type: String },
  passingYear: { type: Number, required: true },
  percentage: { type: String, required: true },
}, { timestamps: true });

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  responsibilities: { type: String },
}, { timestamps: true });

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Resume', 'Offer Letter', 'Experience Letter', 'PAN', 'Aadhaar', 'Certificate', 'Other'], default: 'Other' },
  fileUrl: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});

const timelineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  iconType: { type: String, default: 'check' }
});

const employeeProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  // Section 1: Header
  designation: { type: String, default: 'Software Engineer' },
  department: { type: String, default: 'Engineering' },
  team: { type: String, default: 'Core Product' },
  employmentType: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract', 'Intern'], default: 'Full-Time' },
  joiningDate: { type: Date, default: Date.now },
  confirmationDate: { type: Date },
  reportingManager: { type: String, default: 'Alex Rivera' },
  status: { type: String, enum: ['Active', 'On Leave', 'Inactive'], default: 'Active' },
  photoUrl: { type: String, default: '' },

  // Section 2: Personal Information
  personalInfo: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
    dateOfBirth: { type: Date },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    currentAddress: { type: String, default: '' },
    permanentAddress: { type: String, default: '' },
    nationality: { type: String, default: 'American' },
    bloodGroup: { type: String, default: 'O+' },
    maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced'], default: 'Single' },
    emergencyContact: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      relationship: { type: String, default: '' }
    }
  },

  // Section 3: Professional Information
  professionalInfo: {
    officeLocation: { type: String, default: 'New York HQ' },
    workEmail: { type: String, default: '' },
    totalExperience: { type: String, default: '3+ Years' }
  },

  // Section 4: Education
  education: [educationSchema],

  // Section 5: Work Experience
  experience: [experienceSchema],

  // Section 6: Skills
  skills: [{ type: String }],

  // Section 7: Salary Information (Admin Only)
  salaryInfo: {
    basicSalary: { type: Number, default: 75000 },
    hra: { type: Number, default: 25000 },
    allowance: { type: Number, default: 10000 },
    bonus: { type: Number, default: 15000 },
    pf: { type: Number, default: 5000 },
    tax: { type: Number, default: 8000 },
    bankName: { type: String, default: 'JPMorgan Chase' },
    accountNumber: { type: String, default: '•••• •••• 4821' },
    ifsc: { type: String, default: 'CHASUS33XXX' },
    salaryCycle: { type: String, default: 'Monthly' }
  },

  // Section 8: Documents
  documents: [documentSchema],

  // Section 11: Performance
  performance: {
    rating: { type: Number, default: 4.8 },
    attendanceScore: { type: Number, default: 96 },
    punctualityScore: { type: Number, default: 98 },
    managerFeedback: { type: String, default: 'Consistently delivers high-quality features with excellent team collaboration.' },
    promotionHistory: [
      {
        title: { type: String },
        date: { type: Date },
        details: { type: String }
      }
    ]
  },

  // Section 12: Activity Timeline
  timeline: [timelineSchema]
}, { timestamps: true });

module.exports = mongoose.model('EmployeeProfile', employeeProfileSchema);
