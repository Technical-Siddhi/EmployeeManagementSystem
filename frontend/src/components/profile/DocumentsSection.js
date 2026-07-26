import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FolderPlus, UploadCloud, RefreshCw, AlertCircle } from 'lucide-react';

import DocumentFilter from '../documents/DocumentFilter';
import DocumentGrid from '../documents/DocumentGrid';
import DocumentTable from '../documents/DocumentTable';
import UploadModal from '../documents/UploadModal';
import PreviewModal from '../documents/PreviewModal';
import VersionHistoryModal from '../documents/VersionHistoryModal';
import VerificationModal from '../documents/VerificationModal';
import CategoryManagerModal from '../documents/CategoryManagerModal';
import useAuthStore from '../../stores/useAuthStore';

const DEFAULT_CATEGORIES = [
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

const DocumentsSection = ({ employeeId = 'EMP-1004', documents: initialDocs = [] }) => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const userRole = useAuthStore((state) => state.role) || user?.role || 'admin';

  const [documents, setDocuments] = useState(initialDocs);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expiryFilter, setExpiryFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal States
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [replaceTargetDoc, setReplaceTargetDoc] = useState(null); // Document object to replace
  const [previewDoc, setPreviewDoc] = useState(null);
  const [versionHistoryDoc, setVersionHistoryDoc] = useState(null);
  const [verifyTargetDoc, setVerifyTargetDoc] = useState(null);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [renameTargetDoc, setRenameTargetDoc] = useState(null);
  const [renameTitle, setRenameTitle] = useState('');

  // 1. Fetch Categories & Employee Documents
  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch Custom & Standard Categories
      const catRes = await axios.get('http://localhost:5000/api/documents/categories/all');
      if (catRes.data && catRes.data.all) {
        setCategories(catRes.data.all);
      }

      // Fetch Documents from API
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (selectedStatus !== 'All') params.status = selectedStatus;
      if (expiryFilter !== 'All') params.expired = expiryFilter;
      if (searchQuery) params.search = searchQuery;

      const res = await axios.get(`http://localhost:5000/api/documents/employee/${employeeId}`, {
        params,
        headers: { Authorization: `Bearer ${token}` }
      });

      if (Array.isArray(res.data)) {
        setDocuments(res.data);
      }
    } catch (err) {
      console.warn('API call failed, fallback to local state:', err.message);
      // Fallback state if server endpoint is offline
      if (initialDocs && initialDocs.length > 0 && documents.length === 0) {
        setDocuments(initialDocs);
      }
    } finally {
      setLoading(false);
    }
  }, [employeeId, selectedCategory, selectedStatus, expiryFilter, searchQuery, token]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // 2. Upload / Replace Document Handler
  const handleUploadSubmit = async (formData, replaceId = null) => {
    if (replaceId) {
      // Replace file API
      const res = await axios.post(`http://localhost:5000/api/documents/${replaceId}/replace`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data?.document) {
        setDocuments(prev => prev.map(d => (d._id === replaceId ? res.data.document : d)));
      }
    } else {
      // Upload document API
      formData.append('employeeId', employeeId);
      const res = await axios.post('http://localhost:5000/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data?.documents) {
        setDocuments(prev => [...res.data.documents, ...prev]);
      }
    }
    fetchDocuments();
  };

  // 3. Download Document
  const handleDownload = (doc) => {
    const downloadUrl = doc.fileMetadata?.secureUrl || doc.fileUrl;
    if (!downloadUrl) {
      toast.error('File link not available');
      return;
    }
    toast.success(`Downloading ${doc.title}...`);
    window.open(downloadUrl, '_blank');
  };

  // 4. Verify Document
  const handleVerifySubmit = async (docId, status, comments) => {
    const res = await axios.patch(
      `http://localhost:5000/api/documents/${docId}/verify`,
      { status, comments },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.data?.document) {
      setDocuments(prev => prev.map(d => (d._id === docId ? res.data.document : d)));
    }
  };

  // 5. Rollback Version
  const handleRollbackVersion = async (docId, targetVersion) => {
    const res = await axios.post(
      `http://localhost:5000/api/documents/${docId}/rollback/${targetVersion}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.data?.document) {
      setDocuments(prev => prev.map(d => (d._id === docId ? res.data.document : d)));
    }
  };

  // 6. Delete Document
  const handleDeleteDocument = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document from enterprise storage?')) {
      try {
        await axios.delete(`http://localhost:5000/api/documents/${docId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDocuments(prev => prev.filter(d => d._id !== docId));
        toast.success('Document deleted successfully');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete document');
      }
    }
  };

  // 7. Create Custom Category
  const handleCategoryCreated = async (name, description) => {
    const res = await axios.post(
      'http://localhost:5000/api/documents/categories',
      { name, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.data?.category) {
      setCategories(prev => [...prev, res.data.category.name]);
    }
  };

  // 8. Rename Metadata Submit
  const handleRenameSubmit = async (e) => {
    e.preventDefault();
    if (!renameTargetDoc || !renameTitle.trim()) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/documents/${renameTargetDoc._id}/rename`,
        { title: renameTitle.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.document) {
        setDocuments(prev => prev.map(d => (d._id === renameTargetDoc._id ? res.data.document : d)));
      }
      toast.success('Document renamed successfully');
      setRenameTargetDoc(null);
      setRenameTitle('');
    } catch (err) {
      toast.error('Failed to rename document');
    }
  };

  // Client Filtered Documents
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      !searchQuery ||
      doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.audit?.uploadedBy?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || doc.verification?.status === selectedStatus;

    let matchesExpiry = true;
    if (expiryFilter === 'expired') matchesExpiry = doc.expiryDetails?.isExpired;
    else if (expiryFilter === 'expiring') matchesExpiry = doc.expiryDetails?.isExpiringSoon;

    return matchesSearch && matchesCategory && matchesStatus && matchesExpiry;
  });

  return (
    <div className="space-y-6">
      {/* Document Search & Filter Controls */}
      <DocumentFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        expiryFilter={expiryFilter}
        setExpiryFilter={setExpiryFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        categories={categories}
        userRole={userRole}
        onOpenUpload={() => {
          setReplaceTargetDoc(null);
          setIsUploadOpen(true);
        }}
        onOpenCategoryManager={() => setIsCategoryManagerOpen(true)}
      />

      {/* Main Content Display (Grid or Table View) */}
      {viewMode === 'grid' ? (
        <DocumentGrid
          documents={filteredDocs}
          userRole={userRole}
          onPreview={(doc) => setPreviewDoc(doc)}
          onDownload={handleDownload}
          onReplace={(doc) => {
            setReplaceTargetDoc(doc);
            setIsUploadOpen(true);
          }}
          onRename={(doc) => {
            setRenameTargetDoc(doc);
            setRenameTitle(doc.title);
          }}
          onDelete={handleDeleteDocument}
          onVersionHistory={(doc) => setVersionHistoryDoc(doc)}
          onVerify={(doc) => setVerifyTargetDoc(doc)}
        />
      ) : (
        <DocumentTable
          documents={filteredDocs}
          userRole={userRole}
          onPreview={(doc) => setPreviewDoc(doc)}
          onDownload={handleDownload}
          onReplace={(doc) => {
            setReplaceTargetDoc(doc);
            setIsUploadOpen(true);
          }}
          onRename={(doc) => {
            setRenameTargetDoc(doc);
            setRenameTitle(doc.title);
          }}
          onDelete={handleDeleteDocument}
          onVersionHistory={(doc) => setVersionHistoryDoc(doc)}
          onVerify={(doc) => setVerifyTargetDoc(doc)}
        />
      )}

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => {
          setIsUploadOpen(false);
          setReplaceTargetDoc(null);
        }}
        categories={categories}
        onUploadSuccess={handleUploadSubmit}
        replaceDoc={replaceTargetDoc}
      />

      <PreviewModal
        isOpen={!!previewDoc}
        doc={previewDoc}
        onClose={() => setPreviewDoc(null)}
        onDownload={handleDownload}
      />

      <VersionHistoryModal
        isOpen={!!versionHistoryDoc}
        doc={versionHistoryDoc}
        onClose={() => setVersionHistoryDoc(null)}
        onRollback={handleRollbackVersion}
        userRole={userRole}
      />

      <VerificationModal
        isOpen={!!verifyTargetDoc}
        doc={verifyTargetDoc}
        onClose={() => setVerifyTargetDoc(null)}
        onVerify={handleVerifySubmit}
      />

      <CategoryManagerModal
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        onCategoryCreated={handleCategoryCreated}
      />

      {/* Rename Modal */}
      <AnimatePresence>
        {renameTargetDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card w-full max-w-md bg-slate-900 border-slate-700 p-6 space-y-4 shadow-2xl"
            >
              <h3 className="text-base font-bold text-slate-100">Rename Document</h3>
              <form onSubmit={handleRenameSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  value={renameTitle}
                  onChange={(e) => setRenameTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setRenameTargetDoc(null)}
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs py-1.5 px-4">
                    Save Title
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentsSection;
