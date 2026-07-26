import React, { useState, useEffect } from 'react';
import { X, Layers, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TeamModal = ({ isOpen, onClose, onSubmit, team = null, departments = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    departmentId: '',
    teamLeadName: '',
    status: 'Active'
  });

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name || '',
        departmentId: team.departmentId?._id || team.departmentId || '',
        teamLeadName: team.teamLeadName || '',
        status: team.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        departmentId: departments[0]?._id || '',
        teamLeadName: '',
        status: 'Active'
      });
    }
  }, [team, isOpen, departments]);

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
          className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {team ? 'Edit Team' : 'Create New Team'}
                </h3>
                <p className="text-xs text-slate-400">Assign departmental group & team lead</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Team Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Frontend Architecture"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Parent Department *</label>
              <select
                required
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>{d.name} ({d.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Team Lead Name</label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={formData.teamLeadName}
                onChange={(e) => setFormData({ ...formData, teamLeadName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all"
              >
                {team ? 'Save Changes' : 'Create Team'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TeamModal;
