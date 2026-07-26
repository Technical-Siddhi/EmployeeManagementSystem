import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Users, ShieldCheck } from 'lucide-react';

const ShiftTableView = ({ shifts = [], onAddShift }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Shift Templates & Schedules</h3>
          <p className="text-xs text-slate-400">Manage working hours, grace windows & rotational bands</p>
        </div>

        <button
          onClick={onAddShift}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Shift Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shifts.map((shift) => (
          <motion.div
            key={shift._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {shift.type}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Grace: {shift.gracePeriodMinutes || 15}m</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{shift.name}</h4>
                <p className="text-xs text-slate-400 font-mono mt-1">{shift.startTime} - {shift.endTime}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">Break Duration</span>
                  <span className="text-slate-300 font-semibold">{shift.breakDurationMinutes || 60} Mins</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Late Threshold</span>
                  <span className="text-amber-400 font-semibold">+{shift.lateThresholdMinutes || 30} Mins</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Off Days: {shift.weeklyOffDays?.join(', ') || 'Sat, Sun'}</span>
              <button className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold transition-colors">
                Assign Employees
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShiftTableView;
