import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Plus, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const IncrementHistoryView = ({ increments = [], onAddIncrement }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Salary Increment & Revision History</h3>
          <p className="text-xs text-slate-400">Track historical pay revisions, promotion raises & approvals</p>
        </div>

        <button
          onClick={onAddIncrement}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Record Salary Revision</span>
        </button>
      </div>

      <div className="space-y-4">
        {increments.map((inc) => {
          const diff = (inc.newSalary || 106000) - (inc.oldSalary || 95000);
          const percent = Math.round((diff / (inc.oldSalary || 95000)) * 100);

          return (
            <motion.div
              key={inc._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">{inc.employeeName}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" /> +{percent}% Raise
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{inc.reason}</p>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Approved by <strong className="text-slate-400">{inc.approvedBy}</strong> • Effective: {new Date(inc.effectiveDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono bg-slate-950/60 p-3 rounded-2xl border border-slate-800 shrink-0">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Previous Salary</span>
                  <span className="text-xs text-slate-400 line-through">${(inc.oldSalary || 95000).toLocaleString()}</span>
                </div>
                <span className="text-slate-600 font-bold">➔</span>
                <div>
                  <span className="text-[10px] text-emerald-400 block uppercase font-bold">New Net Salary</span>
                  <span className="text-base font-black text-emerald-400">${(inc.newSalary || 106000).toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default IncrementHistoryView;
