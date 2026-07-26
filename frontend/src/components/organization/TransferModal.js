import React, { useState } from 'react';
import { X, ArrowRightLeft, Clock, History, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransferModal = ({ isOpen, onClose, onTransfer, departments = [], teams = [], history = [] }) => {
  const [formData, setFormData] = useState({
    employeeName: 'Alex Rivera',
    fromDepartment: 'Engineering & Technology',
    toDepartment: 'Finance & Operations',
    fromTeam: 'Backend & Cloud APIs',
    toTeam: 'Core Financial Systems',
    fromManager: 'Marcus Holloway',
    toManager: 'Victoria Vance',
    reason: 'Strategic Internal Mobility'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransfer(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6 my-8"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Reassign / Transfer Employee</h3>
                <p className="text-xs text-slate-400">Move employee across Departments, Teams, and Managers</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Employee Name *</label>
              <input
                type="text"
                required
                value={formData.employeeName}
                onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Current Position</span>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Current Dept"
                    value={formData.fromDepartment}
                    onChange={(e) => setFormData({ ...formData, fromDepartment: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300"
                  />
                  <input
                    type="text"
                    placeholder="Current Team"
                    value={formData.fromTeam}
                    onChange={(e) => setFormData({ ...formData, fromTeam: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-pink-400 block mb-2">New Target Destination</span>
                <div className="space-y-2">
                  <select
                    value={formData.toDepartment}
                    onChange={(e) => setFormData({ ...formData, toDepartment: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Finance & Operations">Finance & Operations</option>
                    <option value="Sales & Revenue">Sales & Revenue</option>
                    <option value="Design & UX">Design & UX</option>
                    <option value="Engineering & Technology">Engineering & Technology</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Target Team Name"
                    value={formData.toTeam}
                    onChange={(e) => setFormData({ ...formData, toTeam: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Transfer Reason / Business Justification</label>
              <textarea
                rows={2}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
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
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-lg shadow-pink-600/30 transition-all"
              >
                Confirm Transfer & Record Log
              </button>
            </div>
          </form>

          {/* Transfer Audit History Timeline */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-indigo-400" /> Transfer Audit History
            </h4>
            <div className="space-y-2.5 max-h-40 overflow-y-auto pr-2">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-200">Engineering & Tech ➔ Finance & Ops</p>
                  <p className="text-[10px] text-slate-500">Reason: Strategic Internal Mobility • Approved by: Administrator</p>
                </div>
                <span className="text-[10px] text-indigo-400 font-mono">Today</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TransferModal;
