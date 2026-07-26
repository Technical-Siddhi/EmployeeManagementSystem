import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FolderPlus, Plus, Tag, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CategoryManagerModal = ({ isOpen, onClose, onCategoryCreated }) => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error('Category name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await onCategoryCreated(categoryName.trim(), description.trim());
      toast.success(`Custom category "${categoryName.trim()}" created successfully!`);
      setCategoryName('');
      setDescription('');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create custom category');
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
                <FolderPlus className="w-5 h-5 text-indigo-400" />
                Create Custom Document Category
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Add enterprise custom categories for document classification
              </p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-400 uppercase text-[10px] mb-1.5 flex items-center gap-1">
                <Tag className="w-3 h-3 text-indigo-400" /> Category Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Visa & Immigration, Medical Records, Tax Form"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-400 uppercase text-[10px] mb-1.5">
                Description (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Purpose and verification requirements for this document type..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                disabled={isSubmitting || !categoryName.trim()}
                className="btn-primary py-2 px-5 shadow-lg shadow-indigo-600/20"
              >
                {isSubmitting ? 'Creating...' : 'Create Category'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CategoryManagerModal;
