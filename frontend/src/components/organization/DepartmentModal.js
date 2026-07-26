import React, { useState, useEffect } from 'react';
import { X, Building2, DollarSign, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DepartmentModal = ({ isOpen, onClose, onSubmit, department = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    businessUnit: 'Product & Tech',
    description: '',
    headName: '',
    budget: 500000,
    status: 'Active'
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || '',
        code: department.code || '',
        businessUnit: department.businessUnit || 'Product & Tech',
        description: department.description || '',
        headName: department.headName || '',
        budget: department.budget || 500000,
        status: department.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        code: '',
        businessUnit: 'Product & Tech',
        description: '',
        headName: '',
        budget: 500000,
        status: 'Active'
      });
    }
  }, [department, isOpen]);

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
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {department ? 'Edit Department' : 'Create New Department'}
                </h3>
                <p className="text-xs text-slate-400">Configure organizational unit & budget allocations</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engineering & Technology"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ENG"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Business Unit</label>
                <input
                  type="text"
                  placeholder="e.g. Product & Tech"
                  value={formData.businessUnit}
                  onChange={(e) => setFormData({ ...formData, businessUnit: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department Head</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={formData.headName}
                  onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Annual Budget ($)</label>
                <input
                  type="number"
                  placeholder="500000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
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
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
              <textarea
                rows={3}
                placeholder="Brief summary of department objectives and operational scope..."
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
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition-all"
              >
                {department ? 'Save Changes' : 'Create Department'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DepartmentModal;
