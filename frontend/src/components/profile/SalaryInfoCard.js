import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Edit, Landmark, CreditCard, ShieldCheck, Lock, X } from 'lucide-react';
import toast from 'react-hot-toast';

const SalaryInfoCard = ({ salaryInfo, onUpdateSalary, userRole }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    basicSalary: salaryInfo?.basicSalary || 75000,
    hra: salaryInfo?.hra || 25000,
    allowance: salaryInfo?.allowance || 10000,
    bonus: salaryInfo?.bonus || 15000,
    pf: salaryInfo?.pf || 5000,
    tax: salaryInfo?.tax || 8000,
    bankName: salaryInfo?.bankName || 'JPMorgan Chase',
    accountNumber: salaryInfo?.accountNumber || '•••• •••• 4821',
    ifsc: salaryInfo?.ifsc || 'CHASUS33XXX',
    salaryCycle: salaryInfo?.salaryCycle || 'Monthly',
  });

  // Strict check: return null if user is 'employee'
  if (userRole === 'employee') {
    return null;
  }

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateSalary(formData);
    setIsEditOpen(false);
    toast.success('Salary breakdown updated');
  };

  const totalGross = (formData.basicSalary || 0) + (formData.hra || 0) + (formData.allowance || 0) + (formData.bonus || 0);
  const totalDeductions = (formData.pf || 0) + (formData.tax || 0);
  const netPay = totalGross - totalDeductions;

  return (
    <div className="glass-card bg-gradient-to-br from-slate-900 via-amber-950/10 to-slate-900 border-amber-500/20 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              Salary & Financial Information
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
              Restricted (Admin Only)
            </span>
          </div>
          <p className="text-xs text-slate-400">Compensation structure, tax deductions, and bank payout details</p>
        </div>

        <button onClick={() => setIsEditOpen(true)} className="btn-secondary text-xs px-3.5 py-1.5 border-amber-500/30 text-amber-300">
          <Edit className="w-3.5 h-3.5" /> Edit Salary Structure
        </button>
      </div>

      {/* Gross vs Net Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Gross Compensation</span>
          <p className="text-2xl font-extrabold text-slate-100 font-mono">${totalGross.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Deductions (PF & Tax)</span>
          <p className="text-2xl font-extrabold text-rose-400 font-mono">-${totalDeductions.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-1">
          <span className="text-xs text-emerald-400 uppercase font-semibold">Estimated Net Take-Home</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">${netPay.toLocaleString()}</p>
        </div>
      </div>

      {/* Salary Breakdown Table & Banking details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm pt-2">
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Earnings & Allowances</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400">Basic Salary</span>
              <strong className="text-slate-100 font-mono">${(salaryInfo?.basicSalary || 0).toLocaleString()}</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400">House Rent Allowance (HRA)</span>
              <strong className="text-slate-100 font-mono">${(salaryInfo?.hra || 0).toLocaleString()}</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400">Special Allowance</span>
              <strong className="text-slate-100 font-mono">${(salaryInfo?.allowance || 0).toLocaleString()}</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400">Annual Bonus / Variable</span>
              <strong className="text-emerald-400 font-mono">${(salaryInfo?.bonus || 0).toLocaleString()}</strong>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Banking & Payroll Account</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5"><Landmark className="w-3.5 h-3.5 text-amber-400" /> Bank Name</span>
              <strong className="text-slate-100">{salaryInfo?.bankName || '-'}</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-amber-400" /> Account Number</span>
              <strong className="text-slate-100 font-mono">{salaryInfo?.accountNumber || '-'}</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400">IFSC / Swift Code</span>
              <strong className="text-slate-100 font-mono">{salaryInfo?.ifsc || '-'}</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-slate-400">Salary Payout Cycle</span>
              <strong className="text-indigo-400">{salaryInfo?.salaryCycle || 'Monthly'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-lg bg-slate-900 border-slate-700 p-6 space-y-5 relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-slate-100">Edit Salary & Banking Details</h3>
                <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Basic Salary ($)</label>
                    <input
                      type="number"
                      value={formData.basicSalary}
                      onChange={(e) => setFormData({ ...formData, basicSalary: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">HRA ($)</label>
                    <input
                      type="number"
                      value={formData.hra}
                      onChange={(e) => setFormData({ ...formData, hra: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Allowance ($)</label>
                    <input
                      type="number"
                      value={formData.allowance}
                      onChange={(e) => setFormData({ ...formData, allowance: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Bonus ($)</label>
                    <input
                      type="number"
                      value={formData.bonus}
                      onChange={(e) => setFormData({ ...formData, bonus: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Provident Fund (PF) ($)</label>
                    <input
                      type="number"
                      value={formData.pf}
                      onChange={(e) => setFormData({ ...formData, pf: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Tax Deductions ($)</label>
                    <input
                      type="number"
                      value={formData.tax}
                      onChange={(e) => setFormData({ ...formData, tax: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase">Bank Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Bank Name"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Account Number"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                      className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setIsEditOpen(false)} className="btn-secondary text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-all">
                    Save Salary Setup
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SalaryInfoCard;
