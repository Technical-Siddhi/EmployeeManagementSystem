import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Plus, Check, X } from 'lucide-react';

const CorrectionView = ({ corrections = [], onAddCorrection, onApproveCorrection }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Attendance Regularizations & Corrections</h3>
          <p className="text-xs text-slate-400">Review employee requests for forgotten punches or clock errors</p>
        </div>

        <button
          onClick={onAddCorrection}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Correction Request</span>
        </button>
      </div>

      <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Correction Type</th>
                <th className="px-6 py-4">Log Comparison</th>
                <th className="px-6 py-4">Reason / Justification</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {corrections.map((item) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-white">
                    {item.employeeName}
                    <span className="block text-[10px] text-slate-500 font-normal font-mono">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {item.type}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-mono text-[11px]">
                    <div className="text-slate-400 line-through">Org: {item.originalCheckIn} - {item.originalCheckOut}</div>
                    <div className="text-emerald-400 font-bold">Req: {item.requestedCheckIn} - {item.requestedCheckOut}</div>
                  </td>

                  <td className="px-6 py-4 text-slate-300 max-w-xs truncate">
                    {item.reason}
                    {item.adminComment && (
                      <span className="block text-[10px] text-slate-500 italic mt-0.5">Admin: {item.adminComment}</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      item.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : item.status === 'Rejected'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    {item.status === 'Pending' && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onApproveCorrection(item._id, 'Approved')}
                          className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                          title="Approve Request"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onApproveCorrection(item._id, 'Rejected')}
                          className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Reject Request"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
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

export default CorrectionView;
