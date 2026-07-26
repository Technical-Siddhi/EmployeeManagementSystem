import React from 'react';
import { FileText, Eye, Download, RefreshCw, Edit3, Trash2, History, ShieldCheck, Calendar } from 'lucide-react';
import VerificationBadge from './VerificationBadge';

const DocumentTable = ({
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
        <FileText className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-base font-bold text-slate-200">No Enterprise Documents Found</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No documents match your current filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-0 overflow-hidden border border-slate-800 rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <th className="py-3.5 px-4">Document Details</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Version</th>
              <th className="py-3.5 px-4">Verification</th>
              <th className="py-3.5 px-4">Uploaded By</th>
              <th className="py-3.5 px-4">Expiry Date</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {documents.map((doc) => {
              const fileExt = doc.fileMetadata?.extension?.toUpperCase() || 'FILE';
              const fileSizeMb = ((doc.fileMetadata?.fileSize || 0) / (1024 * 1024)).toFixed(2);
              const uploadDateStr = new Date(doc.createdAt || doc.uploadDate).toLocaleDateString();

              return (
                <tr key={doc._id} className="hover:bg-slate-900/40 transition-colors">
                  {/* Name & Ext */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-indigo-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 max-w-[200px]">
                        <span className="font-bold text-slate-100 block truncate" title={doc.title}>
                          {doc.title}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {fileExt} &bull; {fileSizeMb} MB
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold uppercase">
                      {doc.category}
                    </span>
                  </td>

                  {/* Version */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-300 whitespace-nowrap">
                    V{doc.version || 1}
                  </td>

                  {/* Verification */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <VerificationBadge status={doc.verification?.status} expiryDetails={doc.expiryDetails} />
                  </td>

                  {/* Uploaded By & Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="text-slate-200 font-semibold">{doc.audit?.uploadedBy?.name || 'HR Manager'}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{uploadDateStr}</div>
                  </td>

                  {/* Expiry Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {doc.expiryDetails?.expiryDate ? (
                      <span className="font-mono text-amber-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(doc.expiryDetails.expiryDate).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onPreview(doc)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition-colors"
                        title="Preview Document"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-400" />
                      </button>

                      <button
                        onClick={() => onDownload(doc)}
                        className="p-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-xs border border-indigo-500/20 transition-colors"
                        title="Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      {['admin', 'hr'].includes(userRole) && (
                        <button
                          onClick={() => onVerify(doc)}
                          className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs border border-emerald-500/20 transition-colors"
                          title="Verify Status"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => onVersionHistory(doc)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
                        title="Version History"
                      >
                        <History className="w-3.5 h-3.5 text-amber-400" />
                      </button>

                      <button
                        onClick={() => onReplace(doc)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
                        title="Replace File"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                      </button>

                      <button
                        onClick={() => onRename(doc)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
                        title="Rename"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-slate-300" />
                      </button>

                      {!(userRole === 'employee' && doc.audit?.uploadedBy?.role !== 'employee') && (
                        <button
                          onClick={() => onDelete(doc._id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs border border-rose-500/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentTable;
