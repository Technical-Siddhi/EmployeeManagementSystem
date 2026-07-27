import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Calendar, FileText, UserCheck, TrendingUp, LifeBuoy, Sparkles, CheckCircle2, XCircle, Clock3 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../stores/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const HrDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = location.pathname.split('/').pop() || 'dashboard';

  const hrStats = [
    { name: 'Active Employees', value: 128, change: '+4 this month', isPositive: true, icon: Users, color: 'text-indigo-400', bg: 'from-indigo-600/20 to-blue-600/20', border: 'border-indigo-500/30' },
    { name: 'Pending Leaves', value: 8, change: 'Requires approval', isPositive: false, icon: Calendar, color: 'text-amber-400', bg: 'from-amber-600/20 to-orange-600/20', border: 'border-amber-500/30' },
    { name: 'Open Positions', value: 5, change: 'Recruitment active', isPositive: true, icon: UserCheck, color: 'text-emerald-400', bg: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30' },
    { name: 'Reviews Due', value: 14, change: 'Q3 Cycle', isPositive: true, icon: TrendingUp, color: 'text-purple-400', bg: 'from-purple-600/20 to-pink-600/20', border: 'border-purple-500/30' },
  ];

  const pendingLeaves = [
    { id: 1, name: 'Ananya Roy', dept: 'Engineering', type: 'Annual Leave', dates: 'Oct 12 - Oct 15', status: 'Pending' },
    { id: 2, name: 'Vikram Seth', dept: 'Marketing', type: 'Casual Leave', dates: 'Oct 14', status: 'Pending' },
    { id: 3, name: 'Neha Sharma', dept: 'Design', type: 'Sick Leave', dates: 'Oct 11 - Oct 12', status: 'Pending' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar activePage={activePage} />
      
      <main className="flex-1 ml-64 min-h-screen p-8 space-y-8">
        {/* Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card border-purple-500/20 bg-gradient-to-r from-slate-900/90 via-purple-950/20 to-slate-900/90"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
              <span>HR Operations Portal</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-100 to-slate-300 bg-clip-text text-transparent">
              HR Manager Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage workforce recruitment, employee onboarding, leaves, and performance cycles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/admin/leave')}
              className="btn-secondary text-sm"
            >
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Review Leaves</span>
            </button>
            <button 
              onClick={() => navigate('/admin/employees')}
              className="btn-primary text-sm"
            >
              <Users className="w-4 h-4" />
              <span>Directory</span>
            </button>
          </div>
        </motion.div>

        {/* HR Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hrStats.map((stat, index) => {
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
                    <p className="text-3xl font-extrabold text-slate-100 tracking-tight">{stat.value}</p>
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

        {/* Quick HR Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 space-y-3 border-indigo-500/20 hover:border-indigo-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Employee Directory</h3>
            <p className="text-xs text-slate-400">View profiles, documents, department assignments, and job roles.</p>
            <button onClick={() => navigate('/admin/employees')} className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Open Directory →</button>
          </div>

          <div className="glass-card p-6 space-y-3 border-amber-500/20 hover:border-amber-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Leave Approvals</h3>
            <p className="text-xs text-slate-400">Approve or reject pending leave applications across departments.</p>
            <button onClick={() => navigate('/admin/leave')} className="text-xs font-bold text-amber-400 hover:text-amber-300">View Applications →</button>
          </div>

          <div className="glass-card p-6 space-y-3 border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Performance & Appraisal</h3>
            <p className="text-xs text-slate-400">Conduct quarterly employee feedback reviews and track team KPIs.</p>
            <button onClick={() => navigate('/admin/performance')} className="text-xs font-bold text-emerald-400 hover:text-emerald-300">Manage Reviews →</button>
          </div>
        </div>

        {/* Pending Leave Requests */}
        <div className="glass-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              Pending Leave Applications Requiring Approval
            </h3>
            <button onClick={() => navigate('/admin/leave')} className="text-xs text-indigo-400 hover:underline font-semibold">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Leave Type</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {pendingLeaves.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-semibold text-slate-200">{item.name}</td>
                    <td className="py-3 px-4 text-slate-400">{item.dept}</td>
                    <td className="py-3 px-4 text-indigo-300 font-medium">{item.type}</td>
                    <td className="py-3 px-4 text-slate-400">{item.dates}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button onClick={() => toast.success(`Approved leave for ${item.name}`)} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold hover:bg-emerald-500/30">Approve</button>
                      <button onClick={() => toast.error(`Rejected leave for ${item.name}`)} className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-bold hover:bg-rose-500/30">Reject</button>
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

export default HrDashboard;
