import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Download, FileText, BarChart3, Calendar, TrendingUp, Award, Clock, FileSpreadsheet, Percent, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import toast from 'react-hot-toast';

const Reports = () => {
  const activePage = 'reports';
  const [dateRange, setDateRange] = useState('This Month');

  const monthlyTrendData = [
    { name: 'Jan', present: 95, absent: 5, late: 3 },
    { name: 'Feb', present: 92, absent: 8, late: 4 },
    { name: 'Mar', present: 96, absent: 4, late: 2 },
    { name: 'Apr', present: 94, absent: 6, late: 5 },
    { name: 'May', present: 97, absent: 3, late: 1 },
    { name: 'Jun', present: 93, absent: 7, late: 6 },
  ];

  const departmentPerformance = [
    { name: 'Engineering', employees: 45, attendance: 96, color: '#6366f1' },
    { name: 'Design', employees: 25, attendance: 94, color: '#8b5cf6' },
    { name: 'Human Resources', employees: 15, attendance: 98, color: '#10b981' },
    { name: 'Marketing', employees: 35, attendance: 90, color: '#f59e0b' },
    { name: 'Operations', employees: 20, attendance: 92, color: '#ec4899' },
  ];

  const handleDownloadCSV = () => {
    const csvContent = 'Month,Present,Absent,Late\nJan,95,5,3\nFeb,92,8,4\nMar,96,4,2\nApr,94,6,5\nMay,97,3,1\nJun,93,7,6';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Attendance_Report_${dateRange.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloaded Attendance CSV Report');
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
              <span className="font-bold text-slate-100">{entry.value}%</span>
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
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card bg-gradient-to-r from-slate-900/90 via-indigo-950/20 to-slate-900/90 border-indigo-500/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <span>Business Intelligence</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Reports & Executive Analytics
            </h1>
            <p className="text-sm text-slate-400 mt-1">Export attendance logs and analyze organizational compliance metrics</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-800/60 border border-slate-700/80 rounded-xl p-1 text-xs">
              {['This Month', 'Quarter 1', 'Year-to-Date'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    dateRange === range
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <button onClick={handleDownloadCSV} className="btn-primary text-sm shadow-lg shadow-indigo-500/25">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Analytics Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-card bg-slate-900/60 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Average Attendance</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Percent className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-100">94.8%</p>
            <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +2.1% higher than benchmark
            </p>
          </div>

          <div className="glass-card bg-slate-900/60 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Punctuality Score</span>
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-100">96.2%</p>
            <p className="text-xs text-indigo-400 font-semibold">Top tier across all depts</p>
          </div>

          <div className="glass-card bg-slate-900/60 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Hours Logged</span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-100">18,420 hrs</p>
            <p className="text-xs text-slate-400 font-medium">99.4% shift completion rate</p>
          </div>

          <div className="glass-card bg-slate-900/60 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Reports Built</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-100">24 Ready</p>
            <p className="text-xs text-amber-400 font-medium">Audited & Verified</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  Historical Attendance Trends
                </h3>
                <p className="text-xs text-slate-400">Monthly percentage overview</p>
              </div>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[80, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="present" name="Present %" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="absent" name="Absent %" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  Department Performance Rate
                </h3>
                <p className="text-xs text-slate-400">Attendance compliance score per team</p>
              </div>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[80, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="attendance" name="Attendance %" radius={[6, 6, 0, 0]}>
                    {departmentPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Department Detailed breakdown list */}
        <div className="glass-card space-y-6">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Department Breakdown & Metrics
            </h3>
            <p className="text-xs text-slate-400">Detailed compliance breakdown by department</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {departmentPerformance.map((dept) => (
              <div key={dept.name} className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-200">{dept.name}</h4>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-slate-300 bg-slate-800 border border-slate-700">
                    {dept.employees} Members
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Compliance Rate</span>
                    <span className="font-bold text-slate-100">{dept.attendance}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${dept.attendance}%`, backgroundColor: dept.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
