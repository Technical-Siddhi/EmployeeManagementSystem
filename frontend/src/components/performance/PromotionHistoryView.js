import React, { useState } from 'react';
import { TrendingUp, Plus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PromotionHistoryView = ({ promotions = [], onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPromotions = promotions.filter(p => 
    p.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.oldRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.newRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search promotion records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 w-full sm:w-80 focus:outline-none focus:border-indigo-500"
          />
          <span className="text-xs text-slate-400 font-mono">
            {filteredPromotions.length} Promotion Logs
          </span>
        </div>

        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Promotion</span>
        </button>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {filteredPromotions.map((p, idx) => (
          <motion.div
            key={p._id || p.employeeName + idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 flex items-center justify-center text-white font-bold shadow-md">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{p.employeeName}</h3>
                  <p className="text-xs text-slate-400">
                    Approved by <strong className="text-slate-200">{p.approvedBy || 'Victoria Vance (CEO)'}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-xs">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Old Role</span>
                  <span className="font-semibold text-slate-300">{p.oldRole}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase font-bold block">Promoted Role</span>
                  <span className="font-bold text-white">{p.newRole}</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Salary Band Elevation</p>
                <p className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                  {p.oldSalaryBand} ➔ {p.newSalaryBand}
                </p>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Manager Citation</p>
                <p className="text-slate-300 mt-0.5">{p.managerComments}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PromotionHistoryView;
