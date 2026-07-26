import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShiftModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: 'Morning Tech Shift',
    type: 'Morning',
    startTime: '07:00 AM',
    endTime: '04:00 PM',
    breakDurationMinutes: 45,
    gracePeriodMinutes: 15,
    lateThresholdMinutes: 30,
    halfDayThresholdHours: 4,
    weeklyOffDays: ['Saturday', 'Sunday']
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Create Shift Template</h3>
                <p className="text-xs text-slate-400">Configure working hours, grace period & off days</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Shift Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Shift Category</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="General">General</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Work From Home">Work From Home</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Rotational">Rotational</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Start Time</label>
                <input
                  type="text"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">End Time</label>
                <input
                  type="text"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-400 block mb-1">Grace (Mins)</span>
                <input
                  type="number"
                  value={formData.gracePeriodMinutes}
                  onChange={(e) => setFormData({ ...formData, gracePeriodMinutes: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-center"
                />
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Late Threshold</span>
                <input
                  type="number"
                  value={formData.lateThresholdMinutes}
                  onChange={(e) => setFormData({ ...formData, lateThresholdMinutes: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-center"
                />
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Half-Day (Hrs)</span>
                <input
                  type="number"
                  value={formData.halfDayThresholdHours}
                  onChange={(e) => setFormData({ ...formData, halfDayThresholdHours: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-center"
                />
              </div>
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
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/30 transition-all"
              >
                Create Shift Template
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ShiftModal;
