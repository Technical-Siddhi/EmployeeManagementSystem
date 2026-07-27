import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Calendar, TrendingUp, Sparkles, UserCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../stores/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ManagerDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = location.pathname.split('/').pop() || 'dashboard';

  const managerStats = [
    { name: 'My Direct Reports', value: 14, change: 'Engineering Team', icon: Users, color: 'text-blue-400', bg: 'from-blue-600/20 to-indigo-600/20', border: 'border-blue-500/30' },
    { name: 'Present Today', value: 12, change: '85.7% Attendance', icon: UserCheck, color: 'text-emerald-400', bg: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30' },
    { name: 'Team Leave Requests', value: 3, change: 'Pending Action', icon: Calendar, color: 'text-amber-400', bg: 'from-amber-600/20 to-orange-600/20', border: 'border-amber-500/30' },
    { name: 'Team Performance', value: '4.8 / 5', change: 'Top Performer Dept', icon: TrendingUp, color: 'text-purple-400', bg: 'from-purple-600/20 to-pink-600/20', border: 'border-purple-500/30' },
  ];

  const teamMembers = [
    { id: 1, name: 'Alex Rivera', role: 'Senior Developer', status: 'Present', checkIn: '08:50 AM', project: 'AttendX v2' },
    { id: 2, name: 'Samantha Wu', role: 'Frontend Lead', status: 'Present', checkIn: '09:05 AM', project: 'UI Redesign' },
    { id: 3, name: 'Karan Mehta', role: 'Backend Engineer', status: 'On Leave', checkIn: '--:--', project: 'API Gateway' },
    { id: 4, name: 'Elena Rostova', role: 'QA Engineer', status: 'Present', checkIn: '08:58 AM', project: 'Automated Suite' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar activePage={activePage} />
      
      <main className="flex-1 ml-64 min-h-screen p-8 space-y-8">
        {/* Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card border-blue-500/20 bg-gradient-to-r from-slate-900/90 via-blue-950/20 to-slate-900/90"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
              <span>Team Leadership Hub</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-100 to-slate-300 bg-clip-text text-transparent">
              Manager Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Monitor team attendance, manage project workload, and approve leave requests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/admin/attendance')}
              className="btn-secondary text-sm"
            >
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Team Attendance</span>
            </button>
            <button 
              onClick={() => navigate('/admin/leave')}
              className="btn-primary text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Approvals</span>
            </button>
          </div>
        </motion.div>

        {/* Manager Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {managerStats.map((stat, index) => {
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

        {/* Team Overview */}
        <div className="glass-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              My Direct Team Members
            </h3>
            <button onClick={() => navigate('/admin/employees')} className="text-xs text-blue-400 hover:underline font-semibold">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Check-In</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-semibold text-slate-200">{member.name}</td>
                    <td className="py-3 px-4 text-slate-400">{member.role}</td>
                    <td className="py-3 px-4 text-indigo-300 font-medium">{member.project}</td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-xs">{member.checkIn}</td>
                    <td className="py-3 px-4">
                      {member.status === 'Present' ? (
                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold">Present</span>
                      ) : (
                        <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full text-xs font-semibold">On Leave</span>
                      )}
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

export default ManagerDashboard;
