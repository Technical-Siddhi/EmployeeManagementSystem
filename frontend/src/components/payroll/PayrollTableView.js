import React from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, Clock, ShieldAlert, ArrowRight, Eye, FileText } from 'lucide-react';

const PayrollTableView = ({ payrolls = [], onGenerate, onApprove, onViewPayslip }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Released':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Admin Approval':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Finance Approval':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'HR Review':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getNextStage = (currentStatus) => {
    switch (currentStatus) {
      case 'Draft':
        return { next: 'HR Review', label: 'Submit for HR Review' };
      case 'HR Review':
        return { next: 'Finance Approval', label: 'Finance Signoff' };
      case 'Finance Approval':
        return { next: 'Admin Approval', label: 'Admin Signoff' };
      case 'Admin Approval':
        return { next: 'Released', label: 'Release Salary' };
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Monthly Payroll Batches</h3>
          <p className="text-xs text-slate-400">Track multi-step approval workflow & disbursements</p>
        </div>

        <button
          onClick={onGenerate}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold shadow-lg shadow-amber-600/30 flex items-center gap-2 transition-all"
        >
          <Play className="w-4 h-4" />
          <span>Generate Payroll Batch</span>
        </button>
      </div>

      <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">Attendance / OT</th>
                <th className="px-6 py-4">Gross Pay</th>
                <th className="px-6 py-4">Net Salary</th>
                <th className="px-6 py-4">Approval Stage</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {payrolls.map((payroll) => {
                const stageInfo = getNextStage(payroll.status);
                return (
                  <motion.tr
                    key={payroll._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-white">
                      <div>
                        {payroll.employeeName}
                        <span className="block text-[10px] text-slate-500 font-normal">{payroll.department || 'Engineering'}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono">
                      {payroll.month} {payroll.year}
                      <span className="block text-[10px] text-slate-500 font-normal">{payroll.cycle || 'Monthly'}</span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-mono text-slate-200">
                        {payroll.presentDays}/{payroll.workingDays} Days
                        {payroll.overtimeHours > 0 && (
                          <span className="block text-[10px] text-amber-400 font-semibold">+{payroll.overtimeHours} hrs OT (${payroll.overtimePay})</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono font-semibold text-slate-200">
                      ${(payroll.grossSalary || 120400).toLocaleString()}
                    </td>

                    <td className="px-6 py-4 font-mono font-black text-emerald-400 text-sm">
                      ${(payroll.netSalary || 103400).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(payroll.status)}`}>
                        {payroll.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {stageInfo && (
                          <button
                            onClick={() => onApprove(payroll._id, stageInfo.next)}
                            className="px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
                          >
                            <span>{stageInfo.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}

                        <button
                          onClick={() => onViewPayslip(payroll._id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                          title="View Verified Payslip PDF"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Payslip</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollTableView;
