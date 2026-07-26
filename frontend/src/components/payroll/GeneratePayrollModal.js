import React, { useState } from 'react';
import { X, Play, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GeneratePayrollModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    employeeName: 'Alex Rivera',
    department: 'Engineering',
    month: 'March',
    year: 2026,
    cycle: 'Monthly',
    workingDays: 22,
    presentDays: 21,
    leaveDays: 1,
    overtimeHours: 8,
    basicSalary: 65000,
    allowances: 53000,
    totalDeductions: 17000
  });

  if (!isOpen) return null;

  const overtimePay = formData.overtimeHours * 300; // $300/hr OT rate
  const grossSalary = Number(formData.basicSalary) + Number(formData.allowances) + overtimePay;
  const netSalary = grossSalary - Number(formData.totalDeductions);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      overtimePay,
      grossSalary,
      netSalary
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Play className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Generate Payroll Batch</h3>
                <p className="text-xs text-slate-400">Auto-calculate working days & overtime compensation</p>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="HR Operations">HR Operations</option>
                  <option value="Design">Design</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Month</label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cycle</label>
                <select
                  value={formData.cycle}
                  onChange={(e) => setFormData({ ...formData, cycle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Biweekly">Biweekly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">OT Hours (Auto)</label>
                <input
                  type="number"
                  value={formData.overtimeHours}
                  onChange={(e) => setFormData({ ...formData, overtimeHours: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-400 block mb-1">Working Days</span>
                <input
                  type="number"
                  value={formData.workingDays}
                  onChange={(e) => setFormData({ ...formData, workingDays: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-center"
                />
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Present Days</span>
                <input
                  type="number"
                  value={formData.presentDays}
                  onChange={(e) => setFormData({ ...formData, presentDays: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-center"
                />
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Leave Days</span>
                <input
                  type="number"
                  value={formData.leaveDays}
                  onChange={(e) => setFormData({ ...formData, leaveDays: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-center"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono flex items-center justify-between">
              <div>
                <span className="text-slate-400 block">Calculated OT Rate: $300/hr</span>
                <span className="text-amber-400 font-bold block">OT Pay: +${overtimePay.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Net Payable Batch</span>
                <span className="text-lg font-black text-amber-400">${netSalary.toLocaleString()}</span>
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
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-amber-600/30 transition-all"
              >
                Generate & Submit for HR Review
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GeneratePayrollModal;
