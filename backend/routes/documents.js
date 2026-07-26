const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');
const DocumentCategory = require('../models/DocumentCategory');
const { upload, uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const { verifyToken } = require('./auth'); // Assuming JWT auth middleware exist or middleware helper

// Helper middleware for auth if token is optional/verified
const authCheck = (req, res, next) => {
  // If user object already populated by verifyToken, proceed
  if (req.user) return next();
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.user = decoded;
    } catch (e) {
      req.user = { id: 'usr_guest', name: 'HR Admin', role: 'admin' };
    }
  } else {
    req.user = { id: 'usr_default', name: 'System Admin', role: 'admin' };
  }
  next();
};

// -------------------------------------------------------------
// 1. UPLOAD DOCUMENT
// -------------------------------------------------------------
router.post('/upload', authCheck, upload.array('files', 10), async (req, res) => {
  try {
    const { employeeId, category, title, issueDate, expiryDate } = req.body;

    if (!employeeId || !category) {
      return res.status(400).json({ message: 'employeeId and category are required' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadedDocs = [];

    for (const file of req.files) {
      const cloudResult = await uploadToCloudinary(file.path, 'attendx_documents');
      const ext = path.extname(file.originalname).toLowerCase();
      const docTitle = title || file.originalname.replace(ext, '');

      const expiryObj = {
        issueDate: issueDate ? new Date(issueDate) : undefined,
        expiryDate: expiryDate ? new Date(expiryDate) : undefined
      };

      const now = new Date();
      if (expiryObj.expiryDate) {
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        expiryObj.isExpired = now > expiryObj.expiryDate;
        expiryObj.isExpiringSoon = !expiryObj.isExpired && (expiryObj.expiryDate.getTime() - now.getTime() <= thirtyDays);
      }

      const uploader = {
        id: req.user?.id || 'admin',
        name: req.user?.name || req.user?.email || 'HR Manager',
        role: req.user?.role || 'admin'
      };

      const initialMetadata = {
        ...cloudResult,
        originalName: file.originalname,
        extension: ext.replace('.', ''),
        folder: 'attendx_documents'
      };

      const newDocument = new Document({
        employeeId,
        title: docTitle,
        category,
        fileMetadata: initialMetadata,
        version: 1,
        versionHistory: [
          {
            version: 1,
            fileMetadata: initialMetadata,
            uploadedBy: uploader,
            createdAt: new Date(),
            changeNote: 'Initial Upload'
          }
        ],
        verification: {
          status: 'Pending',
          comments: ''
        },
        expiryDetails: expiryObj,
        audit: {
          uploadedBy: uploader,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      await newDocument.save();
      uploadedDocs.push(newDocument);
    }

    return res.status(201).json({
      message: `Successfully uploaded ${uploadedDocs.length} document(s)`,
      documents: uploadedDocs
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return res.status(500).json({ message: error.message || 'Error uploading document' });
  }
});

// -------------------------------------------------------------
// 2. GET DOCUMENTS FOR AN EMPLOYEE (with filters & search)
// -------------------------------------------------------------
router.get('/employee/:employeeId', authCheck, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { category, status, search, expired } = req.query;

    const query = { employeeId };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (status && status !== 'All') {
      query['verification.status'] = status;
    }

    if (expired === 'true') {
      query['expiryDetails.isExpired'] = true;
    } else if (expired === 'expiring') {
      query['expiryDetails.isExpiringSoon'] = true;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const documents = await Document.find(query).sort({ createdAt: -1 });

    // Refresh expiry flags dynamically
    documents.forEach(doc => {
      doc.updateExpiryStatus();
    });

    return res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res.status(500).json({ message: 'Server error fetching documents' });
  }
});

// -------------------------------------------------------------
// 3. GET SINGLE DOCUMENT (with complete version history)
// -------------------------------------------------------------
router.get('/:id', authCheck, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    document.updateExpiryStatus();
    return res.json(document);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching document' });
  }
});

// -------------------------------------------------------------
// 4. RENAME DOCUMENT METADATA
// -------------------------------------------------------------
router.put('/:id/rename', authCheck, async (req, res) => {
  try {
    const { title, category, issueDate, expiryDate } = req.body;
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (title) document.title = title;
    if (category) document.category = category;

    if (issueDate !== undefined) document.expiryDetails.issueDate = issueDate ? new Date(issueDate) : undefined;
    if (expiryDate !== undefined) document.expiryDetails.expiryDate = expiryDate ? new Date(expiryDate) : undefined;

    document.updateExpiryStatus();
    document.audit.updatedAt = new Date();

    await document.save();
    return res.json({ message: 'Document updated successfully', document });
  } catch (error) {
    return res.status(500).json({ message: 'Error renaming document' });
  }
});

// -------------------------------------------------------------
// 5. REPLACE DOCUMENT (Increments version & saves version history)
// -------------------------------------------------------------
router.post('/:id/replace', authCheck, upload.single('file'), async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Replacement file is required' });
    }

    const cloudResult = await uploadToCloudinary(req.file.path, 'attendx_documents');
    const ext = path.extname(req.file.originalname).toLowerCase().replace('.', '');

    const newMetadata = {
      ...cloudResult,
      originalName: req.file.originalname,
      extension: ext,
      folder: 'attendx_documents'
    };

    const newVersionNum = document.version + 1;
    const uploader = {
      id: req.user?.id || 'admin',
      name: req.user?.name || req.user?.email || 'HR Manager',
      role: req.user?.role || 'admin'
    };

    // Update main metadata
    document.fileMetadata = newMetadata;
    document.version = newVersionNum;

    // Push new version to history
    document.versionHistory.push({
      version: newVersionNum,
      fileMetadata: newMetadata,
      uploadedBy: uploader,
      createdAt: new Date(),
      changeNote: req.body.changeNote || `Replaced with ${req.file.originalname}`
    });

    // Reset verification status to Pending on document replace
    document.verification.status = 'Pending';
    document.verification.comments = 'New version uploaded. Re-verification required.';
    document.audit.updatedAt = new Date();

    await document.save();
    return res.json({ message: `Successfully replaced document with version ${newVersionNum}`, document });
  } catch (error) {
    console.error('Error replacing document:', error);
    return res.status(500).json({ message: 'Error replacing document' });
  }
});

// -------------------------------------------------------------
// 6. ROLLBACK DOCUMENT TO PREVIOUS VERSION
// -------------------------------------------------------------
router.post('/:id/rollback/:targetVersion', authCheck, async (req, res) => {
  try {
    const { id, targetVersion } = req.params;
    const versionNum = parseInt(targetVersion, 10);

    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const targetVersionObj = document.versionHistory.find(v => v.version === versionNum);
    if (!targetVersionObj) {
      return res.status(400).json({ message: `Version ${versionNum} not found in document history` });
    }

    const newVersionNum = document.version + 1;
    const uploader = {
      id: req.user?.id || 'admin',
      name: req.user?.name || req.user?.email || 'HR Admin',
      role: req.user?.role || 'admin'
    };

    // Revert file metadata to target version's metadata
    document.fileMetadata = targetVersionObj.fileMetadata;
    document.version = newVersionNum;

    document.versionHistory.push({
      version: newVersionNum,
      fileMetadata: targetVersionObj.fileMetadata,
      uploadedBy: uploader,
      createdAt: new Date(),
      changeNote: `Rolled back to Version ${versionNum}`
    });

    document.audit.updatedAt = new Date();
    await document.save();

    return res.json({ message: `Document rolled back to Version ${versionNum} (now Version ${newVersionNum})`, document });
  } catch (error) {
    return res.status(500).json({ message: 'Error rolling back document' });
  }
});

// -------------------------------------------------------------
// 7. VERIFY DOCUMENT (Admin / HR)
// -------------------------------------------------------------
router.patch('/:id/verify', authCheck, async (req, res) => {
  try {
    const { status, comments } = req.body;
    if (!['Pending', 'Verified', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid verification status' });
    }

    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    document.verification.status = status;
    document.verification.comments = comments || '';
    document.verification.verifiedBy = {
      id: req.user?.id || 'admin',
      name: req.user?.name || req.user?.email || 'HR Specialist',
      role: req.user?.role || 'admin'
    };
    document.verification.verifiedAt = new Date();
    document.audit.updatedAt = new Date();

    await document.save();
    return res.json({ message: `Document status marked as ${status}`, document });
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying document' });
  }
});

// -------------------------------------------------------------
// 8. DELETE DOCUMENT
// -------------------------------------------------------------
router.delete('/:id', authCheck, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Role restriction check
    if (req.user?.role === 'employee' && document.audit?.uploadedBy?.role !== 'employee') {
      return res.status(403).json({ message: 'Employees cannot delete HR/Admin documents' });
    }

    // Delete file from Cloudinary/disk storage
    if (document.fileMetadata?.publicId) {
      await deleteFromCloudinary(document.fileMetadata.publicId, document.fileMetadata.secureUrl);
    }

    await Document.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Document deleted successfully', id: req.params.id });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting document' });
  }
});

// -------------------------------------------------------------
// 9. DOCUMENT CATEGORIES API
// -------------------------------------------------------------
router.get('/categories/all', async (req, res) => {
  try {
    const defaultCategories = [
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
    ];

    const customCategories = await DocumentCategory.find().select('name description isCustom');
    const customNames = customCategories.map(c => c.name);

    // Merge standard & custom categories
    const allCategories = [...new Set([...defaultCategories, ...customNames])];

    return res.json({
      standard: defaultCategories,
      custom: customCategories,
      all: allCategories
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching categories' });
  }
});

router.post('/categories', authCheck, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const existing = await DocumentCategory.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new DocumentCategory({
      name: name.trim(),
      description: description || '',
      isCustom: true,
      createdBy: {
        id: req.user?.id || 'admin',
        name: req.user?.name || 'Admin'
      }
    });

    await newCategory.save();
    return res.status(201).json({ message: 'Custom category created successfully', category: newCategory });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Error creating category' });
  }
});

module.exports = router;
