import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, UserCheck, UserX, AlertTriangle, Search, Filter, Download, ArrowUpRight, ArrowDownRight, MoreVertical, CheckCircle2, XCircle, Clock3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../stores/useAuthStore';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const activePage = location.pathname.split('/').pop() || 'dashboard';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [attendanceData, setAttendanceData] = useState([]);

  const stats = [
    { 
      name: 'Total Employees', 
      value: 128, 
      change: '+6.5%', 
      isPositive: true,
      gradient: 'from-blue-600/20 to-indigo-600/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400 bg-blue-500/10',
      icon: Users 
    },
    { 
      name: 'Present Today', 
      value: 94, 
      change: '+2.4%', 
      isPositive: true,
      gradient: 'from-emerald-600/20 to-teal-600/20',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400 bg-emerald-500/10',
      icon: UserCheck 
    },
    { 
      name: 'Absent Today', 
      value: 22, 
      change: '-4.1%', 
      isPositive: true,
      gradient: 'from-rose-600/20 to-pink-600/20',
      borderColor: 'border-rose-500/30',
      iconColor: 'text-rose-400 bg-rose-500/10',
      icon: UserX 
    },
    { 
      name: 'Late Arrivals', 
      value: 12, 
      change: '+1.2%', 
      isPositive: false,
      gradient: 'from-amber-600/20 to-orange-600/20',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400 bg-amber-500/10',
      icon: AlertTriangle 
    },
  ];

  const weeklyTrendData = [
    { day: 'Mon', present: 110, absent: 18, late: 8 },
    { day: 'Tue', dayLabel: 'Tue', present: 115, absent: 13, late: 5 },
    { day: 'Wed', dayLabel: 'Wed', present: 108, absent: 20, late: 12 },
    { day: 'Thu', dayLabel: 'Thu', present: 118, absent: 10, late: 6 },
    { day: 'Fri', dayLabel: 'Fri', present: 112, absent: 16, late: 9 },
    { day: 'Sat', dayLabel: 'Sat', present: 65, absent: 63, late: 2 },
  ];

  const pieChartData = [
    { name: 'Present', value: 94, color: '#10b981' },
    { name: 'Absent', value: 22, color: '#f43f5e' },
    { name: 'Late', value: 12, color: '#f59e0b' },
  ];

  const initialRecords = [
    { id: 1, name: 'Rahul Sharma', avatar: 'RS', email: 'rahul@company.com', dept: 'Engineering', inTime: '08:55 AM', outTime: '06:05 PM', status: 'Present' },
    { id: 2, name: 'Sara Johnson', avatar: 'SJ', email: 'sara@company.com', dept: 'Design', inTime: '--:--', outTime: '--:--', status: 'Absent' },
    { id: 3, name: 'Mike Chen', avatar: 'MC', email: 'mike@company.com', dept: 'Engineering', inTime: '09:35 AM', outTime: '05:30 PM', status: 'Late' },
    { id: 4, name: 'Priya Patel', avatar: 'PP', email: 'priya@company.com', dept: 'Human Resources', inTime: '08:45 AM', outTime: '05:45 PM', status: 'Present' },
    { id: 5, name: 'David Miller', avatar: 'DM', email: 'david@company.com', dept: 'Marketing', inTime: '09:02 AM', outTime: '06:00 PM', status: 'Present' },
  ];

  useEffect(() => {
    setAttendanceData(initialRecords);
  }, []);

  const filteredData = attendanceData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.dept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present':
        return <span className="badge-emerald"><CheckCircle2 className="w-3.5 h-3.5" /> Present</span>;
      case 'Absent':
        return <span className="badge-rose"><XCircle className="w-3.5 h-3.5" /> Absent</span>;
      case 'Late':
        return <span className="badge-amber"><Clock3 className="w-3.5 h-3.5" /> Late</span>;
      default:
        return <span className="badge-indigo">{status}</span>;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-md p-4 rounded-xl border border-slate-700/80 shadow-2xl text-xs space-y-1.5">
          <p className="font-semibold text-slate-200 border-b border-slate-800 pb-1 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-slate-100">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

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
              <span>Overview</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Admin Executive Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Real-time employee attendance tracking and organization workforce insights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => toast.success('Attendance report exported successfully')}
              className="btn-secondary text-sm"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Export CSV</span>
            </button>
            <button 
              onClick={() => toast.success('Data synchronized with live database')}
              className="btn-primary text-sm"
            >
              <Clock className="w-4 h-4" />
              <span>Sync Live</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className={`glass-card bg-gradient-to-br ${stat.gradient} border ${stat.borderColor} relative overflow-hidden group`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.name}</p>
                    <p className="text-3xl font-extrabold text-slate-100 tracking-tight">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.iconColor} border border-white/5 shadow-inner`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                  <span className={`inline-flex items-center gap-1 font-semibold ${stat.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stat.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {stat.change}
                  </span>
                  <span className="text-slate-500 font-medium">vs last week</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Analytics Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Area Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  Weekly Attendance Breakdown
                </h3>
                <p className="text-xs text-slate-400">Comparison of present vs absent workforce over the week</p>
              </div>
              <span className="px-3 py-1 bg-slate-800 text-xs font-medium text-slate-300 rounded-full border border-slate-700">
                This Week
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrendData}>
                  <defs>
                    <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="absentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '15px' }} />
                  <Area type="monotone" dataKey="present" name="Present" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#presentGrad)" />
                  <Area type="monotone" dataKey="absent" name="Absent" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#absentGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Status Distribution Pie Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                Today's Distribution
              </h3>
              <p className="text-xs text-slate-400">Live attendance percentage breakdown</p>
            </div>

            <div className="h-56 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-center">
              {pieChartData.map((item) => (
                <div key={item.name} className="p-2 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </div>
                  <p className="text-sm font-bold text-slate-200 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Real-time Attendance Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card space-y-6"
        >
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                Live Attendance Logs
              </h3>
              <p className="text-xs text-slate-400">Real-time check-in records for today</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or dept..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3.5 py-2 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-all"
              >
                <option value="All">All Statuses</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Employee</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">In Time</th>
                  <th className="py-3.5 px-4">Out Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                            {row.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">{row.name}</p>
                            <p className="text-xs text-slate-500">{row.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-300 font-medium">
                        {row.dept}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-300 font-mono text-xs">
                        {row.inTime}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-300 font-mono text-xs">
                        {row.outTime}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getStatusBadge(row.status)}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <button 
                          onClick={() => toast.success(`Viewing logs for ${row.name}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 text-sm">
                      No attendance records found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
