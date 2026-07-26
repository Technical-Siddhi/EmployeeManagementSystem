import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Sun, ShieldCheck } from 'lucide-react';

const HolidayView = ({ holidays = [], onAddHoliday }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Company Holiday Calendar</h3>
          <p className="text-xs text-slate-400">Official public & optional floating holidays across regions</p>
        </div>

        <button
          onClick={onAddHoliday}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Holiday</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {holidays.map((h) => (
          <motion.div
            key={h._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-bold shrink-0">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{h.name}</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{new Date(h.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                <span className="text-[10px] text-slate-500 block mt-1">{h.region || 'Global'} • {h.isOptional ? 'Optional Floating' : 'Mandatory Public'}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HolidayView;
