import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, RotateCcw, FileText, CheckCircle2, Clock, User, ArrowDown } from 'lucide-react';
import toast from 'react-hot-toast';

const VersionHistoryModal = ({ doc, isOpen, onClose, onRollback, userRole = 'admin' }) => {
  if (!isOpen || !doc) return null;

  const versionHistory = doc.versionHistory || [];

  const handleTriggerRollback = async (vNumber) => {
    if (vNumber === doc.version) {
      toast.error('This is already the active version');
      return;
    }
    if (window.confirm(`Are you sure you want to rollback "${doc.title}" to Version ${vNumber}?`)) {
      try {
        await onRollback(doc._id, vNumber);
        toast.success(`Successfully rolled back to Version ${vNumber}`);
        onClose();
      } catch (e) {
        toast.error('Rollback failed');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="glass-card w-full max-w-xl bg-slate-900 border-slate-700 p-6 space-y-5 relative shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-400" />
                Document Version History
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Audit trail for <strong className="text-slate-200">{doc.title}</strong>
              </p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Timeline List */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {versionHistory.length > 0 ? (
              versionHistory
                .slice()
                .reverse()
                .map((vh, index) => {
                  const isActive = vh.version === doc.version;
                  return (
                    <div
                      key={vh._id || index}
                      className={`p-4 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-indigo-600/10 border-indigo-500/30 ring-1 ring-indigo-500/20'
                          : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800/50">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                              isActive
                                ? 'bg-indigo-600 text-white shadow'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            Version {vh.version}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              Active Version
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {new Date(vh.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="py-2.5 text-xs space-y-1">
                        <p className="text-slate-300 font-medium">
                          {vh.changeNote || 'Standard File Update'}
                        </p>
                        <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-indigo-400" />
                            {vh.uploadedBy?.name || 'HR Admin'} ({vh.uploadedBy?.role || 'Admin'})
                          </span>
                          <span>
                            Size: {((vh.fileMetadata?.fileSize || 0) / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      </div>

                      {!isActive && ['admin', 'hr'].includes(userRole) && (
                        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-end">
                          <button
                            onClick={() => handleTriggerRollback(vh.version)}
                            className="px-3 py-1 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center gap-1.5 border border-indigo-500/20 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Rollback to V{vh.version}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
            ) : (
              <div className="text-center py-6 text-xs text-slate-500">
                No version history recorded yet.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button onClick={onClose} className="btn-secondary text-xs py-1.5 px-4">
              Close History
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VersionHistoryModal;
