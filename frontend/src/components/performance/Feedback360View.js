import React, { useState } from 'react';
import { Users, Plus, Star, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const Feedback360View = ({ feedbackList = [], onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFeedback = feedbackList.filter(f => 
    f.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.providerType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.providerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProviderBadge = (type) => {
    switch (type) {
      case 'Manager':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Peer':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Self':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'HR':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search 360° feedback by employee, peer, or manager..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 w-full sm:w-80 focus:outline-none focus:border-indigo-500"
          />
          <span className="text-xs text-slate-400 font-mono">
            {filteredFeedback.length} 360° Entries
          </span>
        </div>

        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Provide 360° Feedback</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFeedback.map((fb, idx) => (
          <motion.div
            key={fb._id || fb.employeeName + idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getProviderBadge(fb.providerType)}`}>
                  {fb.providerType} Review
                </span>
                <h3 className="text-base font-bold text-white tracking-tight mt-2">{fb.employeeName}</h3>
                <p className="text-xs text-slate-400">Feedback by <strong className="text-slate-200">{fb.providerName}</strong></p>
              </div>

              <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-amber-400 font-mono">{fb.score || 4.8} / 5.0</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 italic">
              "{fb.comments || 'Great team player, high accountability and technical execution.'}"
            </p>

            <div className="grid grid-cols-4 gap-2 text-[11px] font-medium text-slate-400 pt-2">
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-center">
                <span className="block text-[9px] uppercase font-bold text-slate-500">Leader</span>
                <span className="text-xs font-bold text-purple-400 font-mono">{fb.ratings?.leadership || 4.8}</span>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-center">
                <span className="block text-[9px] uppercase font-bold text-slate-500">Teamwork</span>
                <span className="text-xs font-bold text-indigo-400 font-mono">{fb.ratings?.teamwork || 5.0}</span>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-center">
                <span className="block text-[9px] uppercase font-bold text-slate-500">Comm</span>
                <span className="text-xs font-bold text-cyan-400 font-mono">{fb.ratings?.communication || 4.7}</span>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-center">
                <span className="block text-[9px] uppercase font-bold text-slate-500">Execution</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">{fb.ratings?.execution || 4.9}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feedback360View;
