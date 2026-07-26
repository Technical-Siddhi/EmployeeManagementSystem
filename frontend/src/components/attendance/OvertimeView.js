import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Check, X } from 'lucide-react';

const OvertimeView = ({ overtimes = [], onApproveOvertime }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Overtime (OT) Compensation Log</h3>
          <p className="text-xs text-slate-400">Track calculated extra hours, hourly rates & manager approvals</p>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Logged Hours</th>
                <th className="px-6 py-4">Rate / Amount</th>
                <th className="px-6 py-4">Reason / Project</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Manager Signoff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {overtimes.map((item) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-white">
                    {item.employeeName}
                  </td>

                  <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 font-mono font-bold text-amber-400">
                    +{item.hours} Hours
                  </td>

                  <td className="px-6 py-4 font-mono">
                    <span className="text-slate-400 block text-[10px]">${item.ratePerHour}/hr</span>
                    <span className="font-black text-emerald-400">${item.amount}</span>
                  </td>

                  <td className="px-6 py-4 text-slate-300 max-w-xs truncate">
                    {item.reason}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      item.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right font-mono text-[11px]">
                    {item.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onApproveOvertime(item._id, 'Approved')}
                          className="px-3 py-1 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white font-semibold transition-colors"
                        >
                          Approve OT
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400">{item.approvedBy || 'Victoria Vance'}</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OvertimeView;
