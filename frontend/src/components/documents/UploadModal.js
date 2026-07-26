import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, X, CheckCircle2, AlertTriangle, Calendar, FileText, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ALLOWED_TYPES = ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx'];
const MAX_SIZE_MB = 20;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const UploadModal = ({
  isOpen,
  onClose,
  categories = [],
  onUploadSuccess,
  replaceDoc = null // If passed, modal acts in "Replace File" mode
}) => {
  const [selectedCategory, setSelectedCategory] = useState(replaceDoc?.category || 'Resume');
  const [documentTitle, setDocumentTitle] = useState(replaceDoc?.title || '');
  const [issueDate, setIssueDate] = useState(replaceDoc?.expiryDetails?.issueDate ? new Date(replaceDoc.expiryDetails.issueDate).toISOString().split('T')[0] : '');
  const [expiryDate, setExpiryDate] = useState(replaceDoc?.expiryDetails?.expiryDate ? new Date(replaceDoc.expiryDetails.expiryDate).toISOString().split('T')[0] : '');
  const [changeNote, setChangeNote] = useState('');
  
  const [filesQueue, setFilesQueue] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const validateFile = (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_TYPES.includes(ext)) {
      toast.error(`File "${file.name}" is not supported. Allowed formats: PDF, PNG, JPG, JPEG, DOC, DOCX`);
      return false;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error(`File "${file.name}" exceeds the maximum limit of ${MAX_SIZE_MB}MB (${(file.size / (1024 * 1024)).toFixed(1)}MB)`);
      return false;
    }
    return true;
  };

  const handleFilesAdded = (filesList) => {
    const validFiles = Array.from(filesList).filter(validateFile);
    if (validFiles.length > 0) {
      if (replaceDoc) {
        setFilesQueue([validFiles[0]]); // In replace mode, only take 1 file
      } else {
        setFilesQueue((prev) => [...prev, ...validFiles]);
      }
      if (!documentTitle && validFiles[0]) {
        const nameWithoutExt = validFiles[0].name.substring(0, validFiles[0].name.lastIndexOf('.')) || validFiles[0].name;
        setDocumentTitle(nameWithoutExt);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFileFromQueue = (index) => {
    setFilesQueue((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (filesQueue.length === 0) {
      toast.error('Please select or drag at least one file to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);

    try {
      // Simulate step progress animation for user experience
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => (prev < 90 ? prev + 15 : prev));
      }, 200);

      const formData = new FormData();
      if (replaceDoc) {
        formData.append('file', filesQueue[0]);
        formData.append('changeNote', changeNote || `Replaced file with ${filesQueue[0].name}`);
      } else {
        filesQueue.forEach((file) => formData.append('files', file));
        formData.append('category', selectedCategory);
        formData.append('title', documentTitle);
        if (issueDate) formData.append('issueDate', issueDate);
        if (expiryDate) formData.append('expiryDate', expiryDate);
      }

      await onUploadSuccess(formData, replaceDoc ? replaceDoc._id : null);

      clearInterval(progressInterval);
      setUploadProgress(100);
      toast.success(replaceDoc ? 'Document replaced successfully!' : 'Document(s) uploaded successfully!');

      setTimeout(() => {
        setIsUploading(false);
        setFilesQueue([]);
        setUploadProgress(0);
        onClose();
      }, 400);
    } catch (err) {
      setIsUploading(false);
      setUploadProgress(0);
      toast.error(err.response?.data?.message || 'Error processing document upload');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-card w-full max-w-xl bg-slate-900 border-slate-700 p-6 space-y-6 relative shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-indigo-400" />
              {replaceDoc ? `Replace File — ${replaceDoc.title}` : 'Upload Employee Documents'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {replaceDoc
                ? `Current Version ${replaceDoc.version} will be archived into version history.`
                : 'Upload PDFs, Images, or DOC files (Max 20MB per file)'}
            </p>
          </div>
          <button onClick={onClose} disabled={isUploading} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!replaceDoc && (
            <>
              {/* Category & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">
                    Document Category *
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">
                    Document Title / Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Passport scan 2024"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Optional Issue & Expiry Dates (for Passport, Driving License, Visa, etc.) */}
              {['Passport', 'Driving License', 'Aadhaar Card', 'PAN Card', 'Other Documents'].includes(selectedCategory) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-800/40 rounded-xl border border-slate-800">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-400" /> Issue Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" /> Expiry Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {replaceDoc && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">
                Version Change Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Updated document with signed signature block"
                value={changeNote}
                onChange={(e) => setChangeNote(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {/* Drag and Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFilesAdded(e.target.files)}
              multiple={!replaceDoc}
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              className="hidden"
            />
            <UploadCloud className="w-10 h-10 text-indigo-400 mx-auto mb-2 animate-bounce" />
            <p className="text-xs font-bold text-slate-200">
              Drag & Drop your {replaceDoc ? 'replacement file' : 'files'} here, or <span className="text-indigo-400 hover:underline">Browse</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports PDF, PNG, JPG, JPEG, DOC, DOCX up to 20 MB
            </p>
          </div>

          {/* Upload Queue List */}
          {filesQueue.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Selected Files ({filesQueue.length})</span>
              {filesQueue.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2.5 truncate max-w-[80%]">
                    <File className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <div className="truncate">
                      <span className="font-semibold text-slate-200 block truncate">{file.name}</span>
                      <span className="text-[10px] text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFileFromQueue(idx)}
                    disabled={isUploading}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
                <span className="flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" /> Uploading & Processing...
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="btn-secondary text-xs py-2 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || filesQueue.length === 0}
              className="btn-primary text-xs py-2 px-5 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : replaceDoc ? 'Upload Replacement' : 'Upload to Enterprise Storage'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadModal;
