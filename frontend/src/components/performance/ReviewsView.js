import React, { useState } from 'react';
import { Star, Plus, UserCheck, Shield, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewsView = ({ reviews, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviews = reviews.filter(r => 
    r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.reviewCycle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.reviewerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search reviews by employee or cycle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 w-full sm:w-80 focus:outline-none focus:border-indigo-500"
          />
          <span className="text-xs text-slate-400 font-mono">
            {filteredReviews.length} Performance Reviews
          </span>
        </div>

        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Review Cycle</span>
        </button>
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {filteredReviews.map((rev, idx) => (
          <motion.div
            key={rev._id || rev.employeeName + idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-200 shadow-xl space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 p-0.5 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {rev.employeeName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-tight">{rev.employeeName}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700">
                      {rev.department || 'Engineering'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Evaluated by <strong className="text-slate-200">{rev.reviewerName}</strong> ({rev.reviewerRole || 'Manager'})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Overall Rating</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="text-xl font-black text-white font-mono">{rev.rating || 4.8} / 5.0</span>
                  </div>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Score</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{rev.overallScore || 95}%</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <h4 className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Key Strengths
                </h4>
                <p className="text-slate-300">{rev.strengths || 'Technical foresight, architecture quality & mentoring.'}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <h4 className="font-bold text-indigo-400 mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Growth & Improvement Plan
                </h4>
                <p className="text-slate-300">{rev.improvementPlan || 'Expand cross-functional design architecture workshops.'}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsView;
