import React, { useState } from 'react';
import { X, Trash2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RetentionModal = ({ isOpen, onClose, onApplyRetention }) => {
  const [retentionDays, setRetentionDays] = useState(90);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyRetention(retentionDays);
    onClose();
  };

  const options = [
    { days: 30, label: '30 Days' },
    { days: 90, label: '90 Days (Recommended)' },
    { days: 180, label: '180 Days (6 Months)' },
    { days: 365, label: '1 Year (365 Days)' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Log Retention & Archiving</h3>
                <p className="text-xs text-slate-400">Configure auto-archive policy for old audit logs</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Select Retention Window</label>
              <div className="space-y-2">
                {options.map((opt) => (
                  <label
                    key={opt.days}
                    onClick={() => setRetentionDays(opt.days)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs font-semibold cursor-pointer transition-all ${
                      retentionDays === opt.days
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <input
                      type="radio"
                      name="retention"
                      checked={retentionDays === opt.days}
                      onChange={() => setRetentionDays(opt.days)}
                      className="text-amber-500 focus:ring-0 bg-slate-950"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
              <p>• Logs older than {retentionDays} days will be safely moved to <strong className="text-amber-400 font-mono">ArchivedAuditLog</strong>.</p>
              <p>• Ensures optimal query performance and DB storage efficiency.</p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-amber-600/30 transition-all"
              >
                Execute Retention Policy
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RetentionModal;
