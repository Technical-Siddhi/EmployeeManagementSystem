import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, XCircle, Clock, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const VerificationModal = ({ doc, isOpen, onClose, onVerify }) => {
  const [status, setStatus] = useState(doc?.verification?.status || 'Verified');
  const [comments, setComments] = useState(doc?.verification?.comments || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !doc) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onVerify(doc._id, status, comments);
      toast.success(`Document marked as ${status}`);
      onClose();
    } catch (e) {
      toast.error('Verification status update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="glass-card w-full max-w-md bg-slate-900 border-slate-700 p-6 space-y-5 relative shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                Document Verification Workflow
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[280px]">
                {doc.title} ({doc.category})
              </p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Status Selection Cards */}
            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-400 uppercase text-[10px]">
                Verification Status *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'Verified', label: 'Approve', icon: CheckCircle2, color: 'emerald' },
                  { value: 'Pending', label: 'Pending', icon: Clock, color: 'amber' },
                  { value: 'Rejected', label: 'Reject', icon: XCircle, color: 'rose' },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isSelected = status === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setStatus(item.value)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 font-bold transition-all ${
                        isSelected
                          ? item.color === 'emerald'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow'
                            : item.color === 'rose'
                            ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow'
                            : 'bg-amber-500/20 border-amber-500 text-amber-400 shadow'
                          : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comments / Reason */}
            <div>
              <label className="block font-semibold text-slate-400 uppercase text-[10px] mb-1.5 flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-indigo-400" /> Verification Remarks / Notes
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Document verified against official identity registry numbers..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button type="button" onClick={onClose} disabled={isSubmitting} className="btn-secondary py-2 px-4">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary py-2 px-5 shadow-lg shadow-indigo-600/20"
              >
                {isSubmitting ? 'Saving...' : 'Save Verification Status'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VerificationModal;
