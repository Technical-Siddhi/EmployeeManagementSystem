import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, CheckCircle2, AlertTriangle, XCircle, Sun } from 'lucide-react';

const AttendanceCalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState('March 2026');
  const [selectedDay, setSelectedDay] = useState(null);

  // Generate 31 days calendar mockup with realistic enterprise logs
  const daysInMonth = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    let status = 'present';
    let label = 'Present (09:00 AM - 06:05 PM)';
    let checkIn = '09:00 AM';
    let checkOut = '06:05 PM';
    let location = 'HQ Office (GPS Validated)';

    if (day % 7 === 1 || day % 7 === 0) {
      status = 'weekend';
      label = 'Weekly Off';
    } else if (day === 4) {
      status = 'holiday';
      label = 'Public Holiday';
    } else if (day === 12) {
      status = 'late';
      label = 'Late (09:34 AM Check-In)';
      checkIn = '09:34 AM';
    } else if (day === 18) {
      status = 'leave';
      label = 'Paid Annual Leave';
    } else if (day === 22) {
      status = 'wfh';
      label = 'Work From Home (GPS Logged)';
      location = 'Remote IP (192.168.1.45)';
    } else if (day === 27) {
      status = 'halfday';
      label = 'Half-Day (4.0 hrs)';
      checkOut = '01:00 PM';
    }

    return { day, status, label, checkIn, checkOut, location };
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'late':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'leave':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'wfh':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'halfday':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'holiday':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-800/40 text-slate-500 border-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Calendar Controls */}
      <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-3xl border border-slate-800/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Monthly Attendance Grid</h3>
            <p className="text-xs text-slate-400">Click any date to inspect check-in/out logs & GPS location</p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <button className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-white">{currentMonth}</span>
          <button className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Header */}
      <div className="grid grid-cols-7 gap-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Grid Days */}
      <div className="grid grid-cols-7 gap-3">
        {daysInMonth.map((item) => (
          <motion.button
            key={item.day}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedDay(item)}
            className={`p-3 rounded-2xl border flex flex-col justify-between h-24 text-left transition-all ${
              item.status === 'weekend'
                ? 'bg-slate-950/40 border-slate-900 text-slate-600'
                : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-bold text-white font-mono">{item.day}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border truncate ${getStatusBadge(item.status)}`}>
              {item.status.toUpperCase()}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Selected Day Details Modal */}
      <AnimatePresence>
        {selectedDay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Attendance Log: March {selectedDay.day}, 2026</h3>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border inline-block mt-1 ${getStatusBadge(selectedDay.status)}`}>
                    {selectedDay.status.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Clock In Time:</span>
                  <span className="font-mono text-emerald-400 font-bold">{selectedDay.checkIn || 'N/A'}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Clock Out Time:</span>
                  <span className="font-mono text-emerald-400 font-bold">{selectedDay.checkOut || 'N/A'}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Location Tag:</span>
                  <span className="text-slate-200 font-semibold">{selectedDay.location || 'Office HQ'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AttendanceCalendarView;
