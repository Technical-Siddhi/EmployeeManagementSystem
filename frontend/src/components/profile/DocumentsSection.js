import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, UploadCloud, Download, Eye, Trash2, Shield, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

const DocumentsSection = ({ documents = [], onUploadDocument, onDeleteDocument }) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Resume',
    fileUrl: '',
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error('Document title is required');
      return;
    }
    const fakeCloudinaryUrl = formData.fileUrl || `https://res.cloudinary.com/demo/image/upload/v1/sample_${Date.now()}.pdf`;
    onUploadDocument({
      title: formData.title,
      type: formData.type,
      fileUrl: fakeCloudinaryUrl,
      uploadDate: new Date(),
    });
    setIsUploadOpen(false);
    setFormData({ title: '', type: 'Resume', fileUrl: '' });
    toast.success('Document uploaded successfully to Cloudinary storage');
  };

  const handleDownload = (doc) => {
    toast.success(`Downloading ${doc.title}...`);
    window.open(doc.fileUrl, '_blank');
  };

  return (
    <div className="glass-card space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Documents Repository
          </h2>
          <p className="text-xs text-slate-400">Identity documents, certificates, and employment contracts</p>
        </div>

        <button onClick={() => setIsUploadOpen(true)} className="btn-primary text-xs py-1.5 px-3.5">
          <UploadCloud className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div key={doc._id || doc.title} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-3 flex flex-col justify-between group hover:border-slate-700 transition-all">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold uppercase">
                    {doc.type}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-slate-100 text-sm truncate group-hover:text-indigo-400 transition-colors" title={doc.title}>
                  {doc.title}
                </h3>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
                  title="Preview"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button
                  onClick={() => handleDownload(doc)}
                  className="p-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-xs font-semibold flex items-center gap-1 border border-indigo-500/20 transition-colors"
                  title="Download"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
                <button
                  onClick={() => onDeleteDocument(doc._id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-1 border border-rose-500/20 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-xs text-slate-500">
            No documents uploaded yet. Click "Upload Document" above.
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-md bg-slate-900 border-slate-700 p-6 space-y-5 relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-slate-100">Upload New Document</h3>
                <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Passport Copy 2024"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Document Category</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Resume">Resume / CV</option>
                    <option value="Offer Letter">Offer Letter</option>
                    <option value="Experience Letter">Experience Letter</option>
                    <option value="PAN">PAN Card</option>
                    <option value="Aadhaar">Aadhaar / ID Card</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Other">Other Document</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Cloud File / Upload URL</label>
                  <input
                    type="url"
                    placeholder="https://res.cloudinary.com/..."
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 text-xs"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Simulates direct Cloudinary secure file storage</span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setIsUploadOpen(false)} className="btn-secondary text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs">
                    Upload & Store
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <div className="glass-card w-full max-w-3xl bg-slate-900 border-slate-700 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-slate-100">{previewDoc.title}</h3>
                <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="h-96 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800 text-slate-400 text-xs">
                Document Preview Window &bull; {previewDoc.fileUrl}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentsSection;
