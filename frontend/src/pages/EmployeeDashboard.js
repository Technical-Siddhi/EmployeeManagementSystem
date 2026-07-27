import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, DollarSign, Bell, Sparkles, User, Settings, CheckCircle2, Play, Square, FileText } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../stores/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EmployeeDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = location.pathname.split('/').pop() || 'dashboard';

  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);

  const handleClockToggle = () => {
    if (!clockedIn) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setClockInTime(now);
      setClockedIn(true);
      toast.success(`Clocked In at ${now}`);
    } else {
      setClockedIn(false);
      toast.success('Clocked Out successfully');
    }
  };

  const personalStats = [
    { name: 'Days Worked', value: '18 / 22', change: 'This Month', icon: Clock, color: 'text-indigo-400', bg: 'from-indigo-600/20 to-blue-600/20', border: 'border-indigo-500/30' },
    { name: 'Leave Balance', value: '14 Days', change: 'Casual & Sick', icon: Calendar, color: 'text-emerald-400', bg: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30' },
    { name: 'Latest Payslip', value: 'Generated', change: 'September 2026', icon: DollarSign, color: 'text-purple-400', bg: 'from-purple-600/20 to-pink-600/20', border: 'border-purple-500/30' },
    { name: 'Notifications', value: '3 Unread', change: 'Action Required', icon: Bell, color: 'text-amber-400', bg: 'from-amber-600/20 to-orange-600/20', border: 'border-amber-500/30' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar activePage={activePage} />
      
      <main className="flex-1 ml-64 min-h-screen p-8 space-y-8">
        {/* Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card border-indigo-500/20 bg-gradient-to-r from-slate-900/90 via-indigo-950/20 to-slate-900/90"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <span>Employee Portal</span>
              <span>•</span>
              <span>Welcome Back, {user?.name || 'Employee'}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-slate-300 bg-clip-text text-transparent">
              Employee Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Track your daily attendance, apply for leaves, view salary slips, and manage your profile.
            </p>
          </div>

          {/* Quick Clock In Widget */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleClockToggle}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${
                clockedIn 
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              {clockedIn ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{clockedIn ? 'Clock Out' : 'Clock In'}</span>
            </button>
          </div>
        </motion.div>

        {/* Personal Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personalStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`glass-card bg-gradient-to-br ${stat.bg} border ${stat.border} relative overflow-hidden`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.name}</p>
                    <p className="text-2xl font-extrabold text-slate-100 tracking-tight">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color} bg-white/5 border border-white/5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-400 border-t border-white/5 pt-2">{stat.change}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Today's Status & Action Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 space-y-4 border-indigo-500/20">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              Today's Attendance Status
            </h3>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Clocked In:</span>
                <span className="font-mono text-emerald-400 font-bold">{clockInTime || '09:00 AM'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Scheduled Out:</span>
                <span className="font-mono text-slate-300">06:00 PM</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-slate-800">
                <span className="text-slate-400">Status:</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded font-bold">On Duty</span>
              </div>
            </div>
            <button onClick={() => navigate('/admin/attendance')} className="w-full btn-secondary text-xs">View Full Attendance History</button>
          </div>

          <div className="glass-card p-6 space-y-4 border-emerald-500/20">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              Apply For Leave
            </h3>
            <p className="text-xs text-slate-400">Submit time-off requests directly to your line manager and HR.</p>
            <button onClick={() => navigate('/admin/leave')} className="w-full btn-primary text-xs">Apply Leave Now</button>
          </div>

          <div className="glass-card p-6 space-y-4 border-purple-500/20">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-400" />
              My Salary Slips
            </h3>
            <p className="text-xs text-slate-400">Download monthly payslips and tax breakdown statements.</p>
            <button onClick={() => navigate('/admin/payroll')} className="w-full btn-secondary text-xs">View Payslips</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
