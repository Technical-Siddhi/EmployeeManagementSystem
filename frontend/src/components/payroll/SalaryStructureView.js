import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, ShieldCheck, DollarSign, Award } from 'lucide-react';

const SalaryStructureView = ({ structures = [], onAddStructure }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Salary Templates & Bands</h3>
          <p className="text-xs text-slate-400">Configured earning allowances & statutory deduction structures</p>
        </div>

        <button
          onClick={onAddStructure}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Structure Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {structures.map((struct) => (
          <motion.div
            key={struct._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{struct.employeeName}</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {struct.templateName || 'Engineering Band'}
                  </span>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] text-slate-400 block uppercase">Net Monthly</span>
                <span className="text-base font-black text-emerald-400">${(struct.netSalary || 99100).toLocaleString()}</span>
              </div>
            </div>

            {/* Earnings Grid */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Earnings & Allowances</span>
              <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[10px]">Basic Pay</span>
                  <span className="text-slate-200 font-mono font-semibold">${(struct.basicSalary || 60000).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">HRA</span>
                  <span className="text-slate-200 font-mono font-semibold">${(struct.hra || 24000).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Special Allow.</span>
                  <span className="text-slate-200 font-mono font-semibold">${(struct.specialAllowance || 12000).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Deductions Grid */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Statutory Deductions</span>
              <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[10px]">Provident Fund</span>
                  <span className="text-rose-400 font-mono font-semibold">-${(struct.providentFund || 7200).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Prof. Tax</span>
                  <span className="text-rose-400 font-mono font-semibold">-${(struct.professionalTax || 200).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Income Tax</span>
                  <span className="text-rose-400 font-mono font-semibold">-${(struct.incomeTax || 8500).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SalaryStructureView;
