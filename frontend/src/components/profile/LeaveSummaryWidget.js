import React from 'react';
import { Calendar, History, ArrowRight, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeaveSummaryWidget = () => {
  const navigate = useNavigate();

  return (
    <div className="glass-card space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            Leave & Absence Summary
          </h2>
          <p className="text-xs text-slate-400">Leave balance quotas, request logs, and history link</p>
        </div>

        <button
          onClick={() => navigate('/admin/leave')}
          className="btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
        >
          <History className="w-3.5 h-3.5" /> View Leave History <ArrowRight className="w-3 h-3 ml-1" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Leaves Taken</span>
          <p className="text-2xl font-extrabold text-slate-100 font-mono">6 Days</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Leaves Remaining</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">18 Days</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Pending Requests</span>
          <p className="text-2xl font-extrabold text-amber-400 font-mono">1</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Rejected Requests</span>
          <p className="text-2xl font-extrabold text-rose-400 font-mono">1</p>
        </div>
      </div>

      {/* Leave Quota Progress Bars */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-slate-400 uppercase">Leave Quota Balances</h4>
        
        <div className="space-y-2 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-300 font-medium">Annual Vacation (12 / 18 Left)</span>
              <span className="text-indigo-400 font-bold font-mono">66%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[66%]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-300 font-medium">Sick Leave (7 / 10 Left)</span>
              <span className="text-emerald-400 font-bold font-mono">70%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[70%]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-300 font-medium">Casual Leave (4 / 6 Left)</span>
              <span className="text-amber-400 font-bold font-mono">66%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[66%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveSummaryWidget;
