import React, { useState, useEffect } from 'react';
import { X, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DesignationModal = ({ isOpen, onClose, onSubmit, designation = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    level: 'L4 - Senior',
    departmentName: 'General / Cross-Functional',
    description: '',
    minSalary: 60000,
    maxSalary: 140000,
    status: 'Active'
  });

  useEffect(() => {
    if (designation) {
      setFormData({
        title: designation.title || '',
        code: designation.code || '',
        level: designation.level || 'L4 - Senior',
        departmentName: designation.departmentName || 'General / Cross-Functional',
        description: designation.description || '',
        minSalary: designation.salaryBand?.min || 60000,
        maxSalary: designation.salaryBand?.max || 140000,
        status: designation.status || 'Active'
      });
    } else {
      setFormData({
        title: '',
        code: '',
        level: 'L4 - Senior',
        departmentName: 'General / Cross-Functional',
        description: '',
        minSalary: 60000,
        maxSalary: 140000,
        status: 'Active'
      });
    }
  }, [designation, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      salaryBand: { min: formData.minSalary, max: formData.maxSalary }
    });
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
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {designation ? 'Edit Designation' : 'Create Designation'}
                </h3>
                <p className="text-xs text-slate-400">Define job title, pay band & hierarchy level</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Designation Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SSE"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hierarchy Level</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="L1 - Intern">L1 - Intern</option>
                <option value="L2 - Junior">L2 - Junior</option>
                <option value="L3 - Mid-Level">L3 - Mid-Level</option>
                <option value="L4 - Senior">L4 - Senior</option>
                <option value="L5 - Tech Lead">L5 - Tech Lead</option>
                <option value="L6 - Manager">L6 - Manager</option>
                <option value="L7 - Director / VP">L7 - Director / VP</option>
                <option value="L8 - C-Executive">L8 - C-Executive</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Min Salary ($)</label>
                <input
                  type="number"
                  value={formData.minSalary}
                  onChange={(e) => setFormData({ ...formData, minSalary: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Max Salary ($)</label>
                <input
                  type="number"
                  value={formData.maxSalary}
                  onChange={(e) => setFormData({ ...formData, maxSalary: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
              <textarea
                rows={2}
                placeholder="Core role expectations and responsibilities..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
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
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-amber-600/30 transition-all"
              >
                {designation ? 'Save Changes' : 'Create Designation'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DesignationModal;
