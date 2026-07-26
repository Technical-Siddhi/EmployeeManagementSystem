import React, { useState, useEffect } from 'react';
import { X, Award, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewModal = ({ isOpen, onClose, onSubmit, review = null }) => {
  const [formData, setFormData] = useState({
    reviewCycle: 'Quarterly (Q1)',
    reviewerName: 'Marcus Holloway',
    reviewerRole: 'VP of Engineering',
    employeeName: 'Alex Rivera',
    department: 'Engineering & Technology',
    rating: 4.8,
    overallScore: 96,
    strengths: '',
    weaknesses: '',
    achievements: '',
    improvementPlan: '',
    comments: '',
    status: 'Approved'
  });

  useEffect(() => {
    if (review) {
      setFormData({
        reviewCycle: review.reviewCycle || 'Quarterly (Q1)',
        reviewerName: review.reviewerName || 'Marcus Holloway',
        reviewerRole: review.reviewerRole || 'VP of Engineering',
        employeeName: review.employeeName || 'Alex Rivera',
        department: review.department || 'Engineering & Technology',
        rating: review.rating || 4.8,
        overallScore: review.overallScore || 96,
        strengths: review.strengths || '',
        weaknesses: review.weaknesses || '',
        achievements: review.achievements || '',
        improvementPlan: review.improvementPlan || '',
        comments: review.comments || '',
        status: review.status || 'Approved'
      });
    } else {
      setFormData({
        reviewCycle: 'Quarterly (Q1)',
        reviewerName: 'Marcus Holloway',
        reviewerRole: 'VP of Engineering',
        employeeName: 'Alex Rivera',
        department: 'Engineering & Technology',
        rating: 4.8,
        overallScore: 96,
        strengths: 'Architectural excellence, proactive initiative, great leadership.',
        weaknesses: 'Can delegate initial prototype builds.',
        achievements: 'Engineered Document & Org Management modules ahead of schedule.',
        improvementPlan: 'Conduct architecture sync workshops with junior engineers.',
        comments: 'Outstanding performance across all core metrics.',
        status: 'Approved'
      });
    }
  }, [review, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6 my-8"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {review ? 'Edit Performance Review' : 'Create Performance Review'}
                </h3>
                <p className="text-xs text-slate-400">Record quarterly / annual employee evaluation</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Review Cycle *</label>
                <select
                  value={formData.reviewCycle}
                  onChange={(e) => setFormData({ ...formData, reviewCycle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Quarterly (Q1)">Quarterly (Q1)</option>
                  <option value="Quarterly (Q2)">Quarterly (Q2)</option>
                  <option value="Quarterly (Q3)">Quarterly (Q3)</option>
                  <option value="Quarterly (Q4)">Quarterly (Q4)</option>
                  <option value="Half-Yearly (H1)">Half-Yearly (H1)</option>
                  <option value="Half-Yearly (H2)">Half-Yearly (H2)</option>
                  <option value="Annual Review 2026">Annual Review 2026</option>
                </select>
              </div>

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
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Rating (1.0 - 5.0)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Overall Score (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.overallScore}
                  onChange={(e) => setFormData({ ...formData, overallScore: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Reviewer</label>
                <input
                  type="text"
                  value={formData.reviewerName}
                  onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Key Strengths</label>
              <textarea
                rows={2}
                value={formData.strengths}
                onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Areas for Improvement</label>
              <textarea
                rows={2}
                value={formData.weaknesses}
                onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Growth & Improvement Plan</label>
              <textarea
                rows={2}
                value={formData.improvementPlan}
                onChange={(e) => setFormData({ ...formData, improvementPlan: e.target.value })}
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
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-amber-600/30 transition-all"
              >
                {review ? 'Save Changes' : 'Submit Review'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReviewModal;
