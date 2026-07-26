import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Search, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Play, Square, Timer, MapPin, UserCheck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Attendance = () => {
  const activePage = 'attendance';
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Interactive Punch State
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: 'Rahul Sharma', avatar: 'RS', dept: 'Engineering', status: 'Present', inTime: '08:58 AM', outTime: '06:02 PM', location: 'Office' },
    { id: 2, name: 'Sara Johnson', avatar: 'SJ', dept: 'Design', status: 'Absent', inTime: '--:--', outTime: '--:--', location: '-' },
    { id: 3, name: 'Mike Chen', avatar: 'MC', dept: 'Engineering', status: 'Late', inTime: '09:42 AM', outTime: '05:30 PM', location: 'Remote' },
    { id: 4, name: 'Priya Patel', avatar: 'PP', dept: 'Human Resources', status: 'Present', inTime: '08:45 AM', outTime: '05:45 PM', location: 'Office' },
    { id: 5, name: 'Alex Morgan', avatar: 'AM', dept: 'Marketing', status: 'Present', inTime: '09:00 AM', outTime: '--:--', location: 'Office' },
  ]);

  const togglePunch = () => {
    if (!isPunchedIn) {
      const nowFormatted = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setIsPunchedIn(true);
      setPunchTime(nowFormatted);
      toast.success(`Successfully Punched IN at ${nowFormatted}`);
    } else {
      const nowFormatted = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setIsPunchedIn(false);
      toast.success(`Successfully Punched OUT at ${nowFormatted}`);
    }
  };

  const markAttendance = (id, newStatus) => {
    setAttendanceData(attendanceData.map(emp => 
      emp.id === id ? { ...emp, status: newStatus } : emp
    ));
    toast.success(`Marked as ${newStatus}`);
  };

  const filteredData = attendanceData.filter((emp) => 
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar activePage={activePage} />
      
      <main className="flex-1 ml-64 min-h-screen p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 glass-card bg-gradient-to-r from-slate-900/90 via-indigo-950/20 to-slate-900/90 border-indigo-500/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <span>Time & Attendance</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Attendance Kiosk & Logs
            </h1>
            <p className="text-sm text-slate-400 mt-1">Real-time check-in station and daily workforce attendance log</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Punch Clock Station Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Digital Clock Card */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-2 glass-card bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900/80 border-indigo-500/30 flex flex-col md:flex-row items-center justify-between p-8 gap-6 relative overflow-hidden"
          >
            <div className="space-y-3 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> Live Clock
              </div>
              <h2 className="text-5xl font-black font-mono tracking-tight text-white drop-shadow-md">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </h2>
              <p className="text-slate-400 text-sm font-medium">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 z-10 w-full md:w-auto">
              <button
                onClick={togglePunch}
                className={`w-full md:w-56 py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl ${
                  isPunchedIn
                    ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-600/30 hover:shadow-rose-600/50'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30 hover:shadow-emerald-600/50'
                } active:scale-95`}
              >
                {isPunchedIn ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                <span>{isPunchedIn ? 'Punch OUT' : 'Punch IN'}</span>
              </button>

              <div className="text-xs text-center text-slate-400 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isPunchedIn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                Status: <strong className={isPunchedIn ? 'text-emerald-400' : 'text-slate-400'}>
                  {isPunchedIn ? `Active since ${punchTime}` : 'Not Checked In'}
                </strong>
              </div>
            </div>
          </motion.div>

          {/* Today's Shift Metrics */}
          <div className="glass-card flex flex-col justify-between space-y-4">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Timer className="w-5 h-5 text-indigo-400" />
              My Daily Summary
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Shift Duration</span>
                <span className="text-sm font-bold text-slate-100 font-mono">08:00 Hours</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Check-In Time</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">{punchTime || '08:55 AM'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Office Location</span>
                <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> HQ Building (NYC)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Logs Table */}
        <div className="glass-card space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-400" />
                Employee Attendance Log ({date})
              </h3>
              <p className="text-xs text-slate-400">View and update daily check-in records</p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search employee or dept..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Employee</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Check-In</th>
                  <th className="py-3.5 px-4">Check-Out</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Quick Override</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {filteredData.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                          {emp.avatar}
                        </div>
                        <span className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">{emp.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-300">
                      {emp.dept}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-xs text-slate-300">
                      {emp.inTime}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-xs text-slate-300">
                      {emp.outTime}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-400">
                      {emp.location}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={
                        emp.status === 'Present' ? 'badge-emerald' :
                        emp.status === 'Late' ? 'badge-amber' :
                        'badge-rose'
                      }>
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => markAttendance(emp.id, 'Present')}
                          className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all text-xs font-semibold"
                          title="Mark Present"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => markAttendance(emp.id, 'Late')}
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-all text-xs font-semibold"
                          title="Mark Late"
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => markAttendance(emp.id, 'Absent')}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all text-xs font-semibold"
                          title="Mark Absent"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Attendance;
