import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, Download, RefreshCw, Edit3, Trash2, History, ShieldCheck, File, Clock, Calendar } from 'lucide-react';
import VerificationBadge from './VerificationBadge';

const DocumentGrid = ({
  documents = [],
  userRole = 'admin',
  onPreview,
  onDownload,
  onReplace,
  onRename,
  onDelete,
  onVersionHistory,
  onVerify
}) => {
  if (documents.length === 0) {
    return (
      <div className="glass-card py-16 px-6 text-center space-y-4 border border-slate-800">
        <FileText className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
        <h3 className="text-base font-bold text-slate-200">No Enterprise Documents Found</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No documents match your current filter criteria or have been uploaded to this employee profile yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {documents.map((doc) => {
        const fileExt = doc.fileMetadata?.extension?.toUpperCase() || 'FILE';
        const fileSizeMb = ((doc.fileMetadata?.fileSize || 0) / (1024 * 1024)).toFixed(2);
        const uploadDateStr = new Date(doc.createdAt || doc.uploadDate).toLocaleDateString();

        return (
          <motion.div
            key={doc._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 flex flex-col justify-between group hover:border-indigo-500/40 hover:shadow-xl transition-all relative overflow-hidden"
          >
            {/* Top Bar: Category Pill & Status Badge */}
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider truncate">
                {doc.category}
              </span>
              <VerificationBadge status={doc.verification?.status} expiryDetails={doc.expiryDetails} />
            </div>

            {/* Document Header & Icon */}
            <div className="flex items-start gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <h3
                  className="font-bold text-slate-100 text-sm truncate group-hover:text-indigo-400 transition-colors"
                  title={doc.title}
                >
                  {doc.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>V{doc.version || 1}</span>
                  <span>&bull;</span>
                  <span>{fileExt}</span>
                  <span>&bull;</span>
                  <span>{fileSizeMb} MB</span>
                </div>
              </div>
            </div>

            {/* Metadata Footer Details */}
            <div className="pt-2 border-t border-slate-800/60 space-y-1 text-[11px] text-slate-400">
              <div className="flex items-center justify-between">
                <span>Uploaded By:</span>
                <span className="font-semibold text-slate-200">{doc.audit?.uploadedBy?.name || 'HR Manager'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Upload Date:</span>
                <span className="font-mono text-slate-300">{uploadDateStr}</span>
              </div>

              {doc.expiryDetails?.expiryDate && (
                <div className="flex items-center justify-between text-amber-400 font-medium pt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Expiry:
                  </span>
                  <span className="font-mono">{new Date(doc.expiryDetails.expiryDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex items-center justify-between gap-1.5 pt-3 border-t border-slate-800 flex-wrap">
              {/* Primary Actions: View & Download */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onPreview(doc)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
                  title="View / Preview"
                >
                  <Eye className="w-3.5 h-3.5 text-indigo-400" /> Preview
                </button>

                <button
                  onClick={() => onDownload(doc)}
                  className="p-2 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-xs font-semibold border border-indigo-500/20 transition-colors"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center gap-1">
                {['admin', 'hr'].includes(userRole) && (
                  <button
                    onClick={() => onVerify(doc)}
                    className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs border border-emerald-500/20 transition-colors"
                    title="Verify / Reject Document"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => onVersionHistory(doc)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
                  title="Version History"
                >
                  <History className="w-3.5 h-3.5 text-amber-400" />
                </button>

                <button
                  onClick={() => onReplace(doc)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
                  title="Replace File"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                </button>

                <button
                  onClick={() => onRename(doc)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
                  title="Rename Metadata"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-300" />
                </button>

                {/* Delete button (Employees cannot delete HR/Admin uploaded docs) */}
                {!(userRole === 'employee' && doc.audit?.uploadedBy?.role !== 'employee') && (
                  <button
                    onClick={() => onDelete(doc._id)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs border border-rose-500/20 transition-colors"
                    title="Delete Document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DocumentGrid;
