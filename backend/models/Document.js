const mongoose = require('mongoose');

const fileMetadataSchema = new mongoose.Schema({
  publicId: { type: String, default: '' },
  secureUrl: { type: String, required: true },
  originalName: { type: String, required: true },
  fileSize: { type: Number, required: true }, // size in bytes
  mimeType: { type: String, required: true },
  extension: { type: String, default: '' },
  folder: { type: String, default: 'attendx_documents' }
}, { _id: false });

const uploaderSchema = new mongoose.Schema({
  id: { type: String, default: '' },
  name: { type: String, default: 'System' },
  role: { type: String, default: 'admin' }
}, { _id: false });

const versionSchema = new mongoose.Schema({
  version: { type: Number, required: true },
  fileMetadata: { type: fileMetadataSchema, required: true },
  uploadedBy: { type: uploaderSchema, required: true },
  createdAt: { type: Date, default: Date.now },
  changeNote: { type: String, default: '' }
}, { _id: true });

const documentSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, index: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true,
    index: true,
    enum: [
      'Resume',
      'Offer Letter',
      'Appointment Letter',
      'Experience Letter',
      'Aadhaar Card',
      'PAN Card',
      'Passport',
      'Driving License',
      'Educational Certificates',
      'Salary Slips',
      'Relieving Letter',
      'Other Documents'
    ]
  },
  fileMetadata: { type: fileMetadataSchema, required: true },
  version: { type: Number, default: 1 },
  versionHistory: [versionSchema],
  verification: {
    status: { 
      type: String, 
      enum: ['Pending', 'Verified', 'Rejected'], 
      default: 'Pending',
      index: true 
    },
    verifiedBy: { type: uploaderSchema },
    verifiedAt: { type: Date },
    comments: { type: String, default: '' }
  },
  expiryDetails: {
    issueDate: { type: Date },
    expiryDate: { type: Date },
    isExpiringSoon: { type: Boolean, default: false },
    isExpired: { type: Boolean, default: false }
  },
  audit: {
    uploadedBy: { type: uploaderSchema, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
}, {
  timestamps: true
});

// Helper instance method to check expiry status
documentSchema.methods.updateExpiryStatus = function() {
  if (this.expiryDetails && this.expiryDetails.expiryDate) {
    const now = new Date();
    const expiry = new Date(this.expiryDetails.expiryDate);
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

    this.expiryDetails.isExpired = now > expiry;
    this.expiryDetails.isExpiringSoon = !this.expiryDetails.isExpired && (expiry.getTime() - now.getTime() <= thirtyDaysInMs);
  }
};

module.exports = mongoose.model('Document', documentSchema);
