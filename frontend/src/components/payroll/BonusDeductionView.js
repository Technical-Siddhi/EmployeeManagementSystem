import React from 'react';
import { motion } from 'framer-motion';
import { Gift, ShieldAlert, Plus } from 'lucide-react';

const BonusDeductionView = ({ bonuses = [], deductions = [], onAddBonus, onAddDeduction }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Bonuses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Bonuses & Performance Rewards</h3>
          </div>
          <button
            onClick={onAddBonus}
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Award Bonus</span>
          </button>
        </div>

        <div className="space-y-3">
          {bonuses.map((b) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex items-center justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-white">{b.employeeName}</h4>
                <span className="text-[10px] font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full inline-block mt-1">
                  {b.type}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">{b.remarks}</p>
              </div>

              <div className="text-right font-mono">
                <span className="text-sm font-black text-purple-400">+${(b.amount || 5000).toLocaleString()}</span>
                <span className="text-[10px] text-slate-500 block">{b.month} {b.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deductions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Statutory & Loan Deductions</h3>
          </div>
          <button
            onClick={onAddDeduction}
            className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Deduction</span>
          </button>
        </div>

        <div className="space-y-3">
          {deductions.map((d) => (
            <motion.div
              key={d._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex items-center justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-white">{d.employeeName}</h4>
                <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full inline-block mt-1">
                  {d.type}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">{d.description}</p>
              </div>

              <div className="text-right font-mono">
                <span className="text-sm font-black text-rose-400">-${(d.amount || 9000).toLocaleString()}</span>
                <span className="text-[10px] text-slate-500 block">{d.month} {d.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BonusDeductionView;
