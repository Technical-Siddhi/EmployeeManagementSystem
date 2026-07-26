const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary if environment variables are set
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Ensure local upload directory exists as fallback
const uploadDir = path.join(__dirname, '..', 'uploads', 'documents');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Disk Storage configuration for local upload mode
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `doc-${uniqueSuffix}${ext}`);
  }
});

// File filter (Accepted: PDF, PNG, JPG, JPEG, DOC, DOCX)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.doc', '.docx'];
  const allowedMimeTypes = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext) || allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed formats: PDF, PNG, JPG, JPEG, DOC, DOCX`), false);
  }
};

// Multer upload middleware (20MB limit)
const upload = multer({
  storage: diskStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max
  fileFilter: fileFilter
});

// Helper function to upload file to Cloudinary (or return local file URL)
const uploadToCloudinary = async (filePath, folder = 'attendx_documents') => {
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        resource_type: 'auto'
      });
      // Delete local temporary file after uploading to Cloudinary
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return {
        publicId: result.public_id,
        secureUrl: result.secure_url,
        fileSize: result.bytes,
        mimeType: result.format ? `image/${result.format}` : 'application/octet-stream'
      };
    } catch (error) {
      console.warn('⚠️ Cloudinary upload failed, falling back to local file storage:', error.message);
    }
  }

  // Fallback: Return local static URL
  const filename = path.basename(filePath);
  const stats = fs.statSync(filePath);
  const ext = path.extname(filename).toLowerCase().replace('.', '');
  
  let mimeType = 'application/octet-stream';
  if (['png', 'jpg', 'jpeg'].includes(ext)) mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  else if (ext === 'pdf') mimeType = 'application/pdf';
  else if (['doc', 'docx'].includes(ext)) mimeType = 'application/msword';

  return {
    publicId: filename,
    secureUrl: `http://localhost:5000/uploads/documents/${filename}`,
    fileSize: stats.size,
    mimeType: mimeType
  };
};

// Helper function to delete file from Cloudinary (or local disk)
const deleteFromCloudinary = async (publicId, secureUrl) => {
  if (process.env.CLOUDINARY_CLOUD_NAME && publicId && !secureUrl?.includes('localhost:5000')) {
    try {
      await cloudinary.uploader.destroy(publicId);
      return;
    } catch (err) {
      console.warn('Could not delete from Cloudinary:', err.message);
    }
  }

  // Delete local file if present
  if (secureUrl && secureUrl.includes('localhost:5000')) {
    const filename = path.basename(secureUrl);
    const localPath = path.join(uploadDir, filename);
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }
  }
};

module.exports = {
  upload,
  uploadToCloudinary,
  deleteFromCloudinary
};
