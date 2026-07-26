import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SalaryStructureModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    employeeName: 'Alex Rivera',
    templateName: 'Senior Software Engineer Band',
    basicSalary: 65000,
    hra: 26000,
    specialAllowance: 15000,
    medicalAllowance: 3000,
    travelAllowance: 4000,
    internetAllowance: 2000,
    foodAllowance: 3000,
    bonus: 5000,
    providentFund: 7800,
    professionalTax: 200,
    incomeTax: 9000
  });

  if (!isOpen) return null;

  const grossSalary = Number(formData.basicSalary) + Number(formData.hra) + Number(formData.specialAllowance) + Number(formData.medicalAllowance) + Number(formData.travelAllowance) + Number(formData.internetAllowance) + Number(formData.foodAllowance) + Number(formData.bonus);
  const totalDeductions = Number(formData.providentFund) + Number(formData.professionalTax) + Number(formData.incomeTax);
  const netSalary = grossSalary - totalDeductions;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      grossSalary,
      netSalary
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6 my-8"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Configure Salary Structure</h3>
                <p className="text-xs text-slate-400">Define basic, allowances & statutory tax breakdown</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Template Band Name</label>
                <input
                  type="text"
                  value={formData.templateName}
                  onChange={(e) => setFormData({ ...formData, templateName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Earnings & Allowances</h4>
              <div className="grid grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Basic Salary</label>
                  <input
                    type="number"
                    value={formData.basicSalary}
                    onChange={(e) => setFormData({ ...formData, basicSalary: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">HRA Allowance</label>
                  <input
                    type="number"
                    value={formData.hra}
                    onChange={(e) => setFormData({ ...formData, hra: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Special Allowance</label>
                  <input
                    type="number"
                    value={formData.specialAllowance}
                    onChange={(e) => setFormData({ ...formData, specialAllowance: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Medical Allow.</label>
                  <input
                    type="number"
                    value={formData.medicalAllowance}
                    onChange={(e) => setFormData({ ...formData, medicalAllowance: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Travel Allow.</label>
                  <input
                    type="number"
                    value={formData.travelAllowance}
                    onChange={(e) => setFormData({ ...formData, travelAllowance: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Internet Allow.</label>
                  <input
                    type="number"
                    value={formData.internetAllowance}
                    onChange={(e) => setFormData({ ...formData, internetAllowance: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Food Allow.</label>
                  <input
                    type="number"
                    value={formData.foodAllowance}
                    onChange={(e) => setFormData({ ...formData, foodAllowance: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Performance Bonus</label>
                  <input
                    type="number"
                    value={formData.bonus}
                    onChange={(e) => setFormData({ ...formData, bonus: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Deductions Breakdown */}
            <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Statutory Deductions</h4>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Provident Fund (PF)</label>
                  <input
                    type="number"
                    value={formData.providentFund}
                    onChange={(e) => setFormData({ ...formData, providentFund: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Professional Tax</label>
                  <input
                    type="number"
                    value={formData.professionalTax}
                    onChange={(e) => setFormData({ ...formData, professionalTax: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Income Tax (TDS)</label>
                  <input
                    type="number"
                    value={formData.incomeTax}
                    onChange={(e) => setFormData({ ...formData, incomeTax: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono">
              <div>
                <span className="text-slate-400 uppercase block">Gross Earnings: ${grossSalary.toLocaleString()}</span>
                <span className="text-rose-400 uppercase block">Deductions: -${totalDeductions.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 uppercase block text-[10px]">Net Calculated Pay</span>
                <span className="text-xl font-black text-emerald-400">${netSalary.toLocaleString()}</span>
              </div>
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
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/30 transition-all"
              >
                Save Structure Template
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SalaryStructureModal;
